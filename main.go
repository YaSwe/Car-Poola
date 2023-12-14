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
	db, err = sql.Open("mysql", "user:password@tcp(127.0.0.1:3306)/carpoola")

	if err != nil {
		panic(err.Error())
	}

	router := mux.NewRouter()
	router.HandleFunc("/api/v1/accounts/{accountID}", HandleAccountRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/accounts", SearchAccounts)

	router.HandleFunc("/api/v1/rides/{rideID}", HandleRideRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/rides", SearchRides)

	router.HandleFunc("/api/v1/ridePassengers/{rideID}/{passengerID}", HandleRidePassengersRequest).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/ridePassengers", SearchPassengerRides)

	fmt.Println("Listening at port 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
