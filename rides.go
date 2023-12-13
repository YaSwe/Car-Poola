package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"io"
	"net/http"
)

type Ride struct {
	RiderID            string `json:"RiderID"`
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
		riderID := params["riderID"]
		var data Ride

		if err := json.Unmarshal(body, &data); err == nil {

			// Get the last account ID
			rideID := getLastRideIndex()

			if _, ok := isRideExist(rideID); !ok {
				insertRide(rideID, riderID, data)
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

	if value := searchQuery; len(value) > 0 {
		results, found := searchByDestinationAndPickUp(searchQuery)

		if !found {
			fmt.Fprintf(w, "No ride found")
		} else {
			json.NewEncoder(w).Encode(struct {
				Rides map[string]Ride `json:"Rides"`
			}{results})
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
	err := result.Scan(&id, &r.RiderID, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity,
		&r.NumPassengers, &r.Status, &r.CompletedAt, &r.CancelledAt)
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

		err := results.Scan(&id, &r.RiderID, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity, &r.NumPassengers, &r.Status, &completedAt, &cancelledAt)
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

func insertRide(id string, riderId string, r Ride) {
	_, err := db.Exec(
		`INSERT INTO rides (ID, RiderID, StartRideTime, PickUpLocation, DestinationAddress, PassengerCapacity, NumPassengers, Status, CompletedAt, CancelledAt)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, id, riderId, r.StartRideTime, r.PickUpLocation, r.DestinationAddress, r.PassengerCapacity,
		r.NumPassengers, r.Status, r.CompletedAt, r.CancelledAt)
	if err != nil {
		panic(err.Error())
	}
}

func updateRide(id string, r Ride) {
	_, err := db.Exec(
		"UPDATE rides SET StartRideTime=?, PickUpLocation=?, DestinationAddress=?, PassengerCapacity=?, NumPassengers=?, Status=?, CompletedAt=?, CancelledAt=? WHERE ID=?",
		r.StartRideTime, r.PickUpLocation, r.DestinationAddress, r.PassengerCapacity,
		r.NumPassengers, r.Status, r.CompletedAt, r.CancelledAt, id)
	if err != nil {
		panic(err.Error())
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

		err = results.Scan(&id, &r.RiderID, &r.StartRideTime, &r.PickUpLocation, &r.DestinationAddress, &r.PassengerCapacity,
			&r.NumPassengers, &r.Status, &completedAt, &cancelledAt)
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

func getLastRideIndex() string {
	var lastIndex string
	results, err := db.Query("SELECT MAX(ID) + 1 AS RIDE_ID FROM rides")
	if err != nil {
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
