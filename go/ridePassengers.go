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

type RidePassengers struct {
	RideID      string `json:"Ride ID"`
	PassengerID string `json:"Passenger ID"`
}

func HandleRidePassengersRequest(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	rideID := params["rideID"]
	//passengerID := params["passengerID"]

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	// Create ride
	if r.Method == "POST" {
		var data RidePassengers

		if err := json.Unmarshal(body, &data); err == nil {

			// Get the last ID
			id := getLastRidePassengerIndex()

			if _, ok := isRidePassengerExist(id); !ok {
				insertRidePassenger(id, data)
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
		var data RidePassengers
		if err := json.Unmarshal(body, &data); err == nil {
			if _, ok := isRidePassengerExist(rideID); !ok {
				updateRidePassenger(rideID, data)
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
			if orig, ok := isRidePassengerExist(rideID); ok {
				for k, v := range data {
					switch k {
					case "Start Ride Time":
						orig.RideID = v.(string)
					case "Pick Up Location":
						orig.PassengerID = v.(string)
					}
				}
				updateRidePassenger(rideID, orig)
				w.WriteHeader(http.StatusAccepted)
			} else {
				w.WriteHeader(http.StatusNotFound)
				fmt.Fprintf(w, "Ride ID does not exist")
			}
		} else {
			fmt.Println(err)
		}

		// If ride exists
	} else if val, ok := isRidePassengerExist(rideID); ok {
		// Delete account
		if r.Method == "DELETE" {
			delRidePassenger(rideID)

			// Get account
		} else {
			json.NewEncoder(w).Encode(val)
		}
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Invalid Ride ID")
	}
}

func SearchPassengerRides(w http.ResponseWriter, r *http.Request) {
	querystringmap := r.URL.Query()
	rideQuery := querystringmap.Get("rideID")
	passengerQuery := querystringmap.Get("passengerID")

	if value := rideQuery; len(value) > 0 {
		results, found := searchByPassenger(rideQuery, passengerQuery)

		if !found {
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w, "No ride found")
		} else {
			w.WriteHeader(http.StatusConflict)
			json.NewEncoder(w).Encode(struct {
				Rides map[string]RidePassengers `json:"Rides"`
			}{results})
		}
	} else {
		ridesWrapper := struct {
			RidePassengers map[string]Ride `json:"Rides"`
		}{getRides()}
		json.NewEncoder(w).Encode(ridesWrapper)
		return
	}
}

func searchByPassenger(rideID string, passengerID string) (map[string]RidePassengers, bool) {
	results, err := db.Query("SELECT * FROM ride_passengers WHERE RideID=? AND PassengerID=?", rideID, passengerID)
	if err != nil {
		panic(err.Error())
	}

	var rides map[string]RidePassengers = map[string]RidePassengers{}

	for results.Next() {
		var r RidePassengers
		var id string

		err = results.Scan(&id, &r.RideID, &r.PassengerID)
		if err != nil {
			panic(err.Error())
		}

		rides[id] = r
	}

	if len(rides) == 0 {
		return rides, false
	}

	return rides, true
}

func isRidePassengerExist(id string) (RidePassengers, bool) {
	var r RidePassengers

	result := db.QueryRow("SELECT * FROM ride_passengers WHERE ID=?", id)
	err := result.Scan(&id, &r.RideID, &r.PassengerID)
	if err == sql.ErrNoRows {
		return r, false
	}

	return r, true
}

func insertRidePassenger(id string, r RidePassengers) {
	_, err := db.Exec(
		`INSERT INTO ride_passengers (ID, RideID, PassengerID) VALUES (?, ?, ?)`, id, r.RideID, r.PassengerID)
	if err != nil {
		panic(err.Error())
	}
}

func updateRidePassenger(id string, r RidePassengers) {
	_, err := db.Exec(
		"UPDATE rides SET Status=? WHERE ID=?", id)
	if err != nil {
		panic(err.Error())
	}
}

func delRidePassenger(id string) (int64, error) {
	result, err := db.Exec("DELETE from ride_passengers WHERE ID=?", id)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

func getLastRidePassengerIndex() string {
	var lastIndex string
	results, err := db.Query("SELECT COALESCE(MAX(ID), 0) + 1 AS RidePassenger_ID FROM ride_passengers")
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
