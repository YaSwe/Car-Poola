package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"io"
	"net/http"
	"time"
)

type Ride struct {
	RiderID            string `json:"Rider ID"`
	StartRideTime      string `json:"Start Ride Time"`
	PickUpLocation     string `json:"Pick Up Location"`
	DestinationAddress string `json:"Destination Address"`
	PassengerCapacity  int    `json:"Passenger Capacity"`
	NumPassengers      int    `json:"NumPassengers"`
	Status             string `json:"Status"`
	CompletedAt        string `json:"Completed At"`
	CancelledAt        string `json:"Cancelled At"`
}

func HandleRideRequest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	rideID := params["rideID"]

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	// Create ride
	if r.Method == "POST" {
		var data Ride

		if err := json.Unmarshal(body, &data); err == nil {

			// Get the last account ID
			rideID := getLastRideIndex()

			if _, ok := isRideExist(rideID); !ok {
				insertRide(rideID, data)
				w.WriteHeader(http.StatusCreated)
			} else {
				w.WriteHeader(http.StatusConflict)
				fmt.Fprintf(w, "Ride ID exist")
			}
		} else {
			fmt.Println(err)
		}

		// Edit ride
	} else if r.Method == "PUT" {
		var data Ride
		if err := json.Unmarshal(body, &data); err == nil {
			if _, ok := isRideExist(rideID); ok {
				updateRide(rideID, data)
				w.WriteHeader(http.StatusOK)
			} else {
				w.WriteHeader(http.StatusNotFound)
				fmt.Fprintf(w, "Ride ID does not exist")
			}
		} else {
			fmt.Println(err)
		}

	} else if r.Method == "PATCH" {
		var data map[string]interface{}

		if err := json.Unmarshal(body, &data); err == nil {
			if orig, ok := isRideExist(rideID); ok {
				for k, v := range data {
					switch k {
					case "Start Ride Time":
						orig.StartRideTime = v.(string)
					case "Pick Up Location":
						orig.PickUpLocation = v.(string)
					case "Destination Address":
						orig.DestinationAddress = v.(string)
					case "Passenger Capacity":
						orig.PassengerCapacity = v.(int)
					case "NumPassengers":
						orig.NumPassengers = v.(int)
					case "Status":
						orig.Status = v.(string)
					case "Completed At":
						orig.CompletedAt = v.(string)
					case "Cancelled At":
						orig.CancelledAt = v.(string)
					}
				}
				updateRide(rideID, orig)
				w.WriteHeader(http.StatusAccepted)
			} else {
				w.WriteHeader(http.StatusNotFound)
				fmt.Fprintf(w, "Ride ID does not exist")
			}
		} else {
			fmt.Println(err)
		}

		// If ride exists
	} else if val, ok := isRideExist(rideID); ok {
		// Delete account
		if r.Method == "DELETE" {
			delRide(rideID)

			// Get account
		} else {
			json.NewEncoder(w).Encode(val)
		}
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Invalid Ride ID")
	}
}

func SearchRides(w http.ResponseWriter, r *http.Request) {
	querystringmap := r.URL.Query()
	searchQuery := querystringmap.Get("search")
	riderIDQuery := querystringmap.Get("riderID")
	checkStartTimeQuery := querystringmap.Get("checkStartTime")

	if value := searchQuery; len(value) > 0 {
		results, found := searchByDestinationAndPickUp(searchQuery)

		if !found {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "No ride found")
		} else {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(struct {
				Rides map[string]Ride `json:"Rides"`
			}{results})
		}
	} else if value = riderIDQuery; len(value) > 0 {
		results, found := searchByRiderID(riderIDQuery)

		if !found {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "No ride found")
		} else {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(struct {
				Rides map[string]Ride `json:"Rides"`
			}{results})
		}
	} else if value = checkStartTimeQuery; len(value) > 0 {
		isThirtyMinsAgo, err := checkRideStartTime(checkStartTimeQuery)
		if err != nil {
			// Handle the error
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Error occurred while checking ride start time")
			return
		}

		if isThirtyMinsAgo {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w, "Ride started more than 30 minutes ago")
			return
		}
	} else {
		ridesWrapper := struct {
			Rides map[string]Ride `json:"Rides"`
		}{getRides()}
		json.NewEncoder(w).Encode(ridesWrapper)
		return
	}
}

func isRideExist(id string) (Ride, bool) {
	var r Ride

	result := db.QueryRow("SELECT * FROM rides WHERE ID=?", id)
	err := result.Scan(&id, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity,
		&r.NumPassengers, &r.Status, &r.CompletedAt, &r.CancelledAt, &r.RiderID)
	if err == sql.ErrNoRows {
		return r, false
	}

	return r, true
}

func getRides() map[string]Ride {
	results, err := db.Query("SELECT * FROM rides")
	if err != nil {
		panic(err.Error())
	}

	var rides map[string]Ride = map[string]Ride{}

	for results.Next() {
		var r Ride
		var id string
		var completedAt, cancelledAt sql.NullString

		err := results.Scan(&id, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity, &r.NumPassengers, &r.Status, &completedAt, &cancelledAt, &r.RiderID)
		if err != nil {
			panic(err.Error())
		}

		// Handle null values
		if completedAt.Valid {
			r.CompletedAt = completedAt.String
		}
		if cancelledAt.Valid {
			r.CancelledAt = cancelledAt.String
		}

		rides[id] = r
	}

	return rides
}

func insertRide(id string, r Ride) {
	_, err := db.Exec(
		`INSERT INTO rides (ID, StartRideTime, PickUpLocation, DestinationAddress, PassengerCapacity, NumPassengers, Status, CompletedAt, CancelledAt, RiderID)
			VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL, ?)`, id, r.StartRideTime, r.PickUpLocation, r.DestinationAddress, r.PassengerCapacity,
		r.NumPassengers, r.Status, r.RiderID)
	if err != nil {
		panic(err.Error())
	}
}

// Enrol ride if max capacity is greater than current number of passengers
func updateRide(id string, r Ride) {
	if r.NumPassengers <= r.PassengerCapacity {
		_, err := db.Exec(
			`UPDATE rides SET NumPassengers=? WHERE ID=?`, r.NumPassengers, id)
		if err != nil {
			panic(err.Error())
		}
	} else {
		_, err := db.Exec(
			`UPDATE rides SET Status=? WHERE ID=?`, r.Status, id)
		if err != nil {
			panic(err.Error())
		}
	}
}

func delRide(id string) (int64, error) {
	result, err := db.Exec("DELETE from rides WHERE ID=?", id)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

func searchByDestinationAndPickUp(query string) (map[string]Ride, bool) {
	results, err := db.Query("SELECT * FROM rides WHERE LOWER(DestinationAddress) LIKE LOWER(?) OR LOWER(PickUpLocation) LIKE LOWER(?)", "%"+query+"%", "%"+query+"%")
	if err != nil {
		panic(err.Error())
	}

	var rides map[string]Ride = map[string]Ride{}

	for results.Next() {
		var r Ride
		var id string
		var completedAt, cancelledAt sql.NullString

		err = results.Scan(&id, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity,
			&r.NumPassengers, &r.Status, &completedAt, &cancelledAt, &r.RiderID)
		if err != nil {
			panic(err.Error())
		}

		// Handle null values
		if completedAt.Valid {
			r.CompletedAt = completedAt.String
		}
		if cancelledAt.Valid {
			r.CancelledAt = cancelledAt.String
		}

		rides[id] = r
	}

	if len(rides) == 0 {
		return rides, false
	}

	return rides, true
}

func searchByRiderID(query string) (map[string]Ride, bool) {
	results, err := db.Query("SELECT * FROM rides WHERE RiderID=?", query)
	if err != nil {
		panic(err.Error())
	}

	var rides map[string]Ride = map[string]Ride{}

	for results.Next() {
		var r Ride
		var id string
		var completedAt, cancelledAt sql.NullString

		err = results.Scan(&id, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity,
			&r.NumPassengers, &r.Status, &completedAt, &cancelledAt, &r.RiderID)
		if err != nil {
			panic(err.Error())
		}

		// Handle null values
		if completedAt.Valid {
			r.CompletedAt = completedAt.String
		}
		if cancelledAt.Valid {
			r.CancelledAt = cancelledAt.String
		}

		rides[id] = r
	}

	if len(rides) == 0 {
		return rides, false
	}

	return rides, true
}

func checkRideStartTime(rideID string) (bool, error) {
	var isThirtyMinsAgo int
	thirtyMinutesAgo := time.Now().Add(-30 * time.Minute).Format("2006-01-02 15:04:05")

	err := db.QueryRow("SELECT IF(StartRideTime < ?, 1, 0) AS IsThirtyMinsAgo FROM rides WHERE ID = ?", thirtyMinutesAgo, rideID).Scan(&isThirtyMinsAgo)
	if err != nil {
		return false, err
	}

	return isThirtyMinsAgo == 1, nil
}

func getLastRideIndex() string {
	var lastIndex string
	results, err := db.Query("SELECT COALESCE(MAX(ID), 0) + 1 AS RIDE_ID FROM rides")
	if err != nil {
		if err == sql.ErrNoRows {
			return "1" // Return default value when there are no rows
		}
		panic(err.Error())
	}

	if results.Next() {
		err = results.Scan(&lastIndex)
		if err != nil {
			panic(err.Error())
		}
	}
	return lastIndex
}
