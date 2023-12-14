package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

var (
	db  *sql.DB
	err error
)

func main() {
	db, err = sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/carpoola") // Localhost 8000

	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()
	// Accounts
	router.HandleFunc("/api/v1/accounts/{accountID}", HandleAccountRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/accounts", SearchAccounts)

	// Rides
	router.HandleFunc("/api/v1/rides/{rideID}", HandleRideRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/rides", SearchRides)

	// Ride_Passengers
	router.HandleFunc("/api/v1/ridePassengers/{rideID}", HandleRidePassengersRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/ridePassengers", SearchPassengerRides)

	fmt.Println("Listening at port 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
