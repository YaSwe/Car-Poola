package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"io"
	"log"
	"net/http"
)

type Account struct {
	FirstName           string `json:"First Name"`
	LastName            string `json:"Last Name"`
	MobileNumber        string `json:"Mobile Number"`
	EmailAddress        string `json:"Email Address"`
	UserType            string `json:"User Type"`
	DriverLicenseNumber string `json:"Driver License Number"`
	CarPlateNumber      string `json:"Car Plate Number"`
	Password            string `json:"Password"`
}

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
	router.HandleFunc("/api/v1/accounts/{accountID}", account).Methods("GET", "DELETE", "POST", "PATCH", "PUT", "OPTIONS")
	router.HandleFunc("/api/v1/accounts", searchAccounts)
	fmt.Println("Listening at port 5000")
	log.Fatal(http.ListenAndServe(":5000", router))
}

func account(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	accountID := params["accountID"]

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	// Create account
	if r.Method == "POST" {
		var data Account
		if err := json.Unmarshal(body, &data); err == nil {

			// Get the last account ID
			accountID := getLastAccountIndex()

			if _, ok := isExist(accountID); !ok {
				insertAccount(accountID, data)
				w.WriteHeader(http.StatusCreated)
			} else {
				w.WriteHeader(http.StatusConflict)
				fmt.Fprintf(w, "Account ID exist")
			}
		} else {
			fmt.Println(err)
		}

		// Edit account
	} else if r.Method == "PUT" {
		var data Account
		if err := json.Unmarshal(body, &data); err == nil {
			if _, ok := isExist(accountID); ok {
				updateAccount(accountID, data)
				w.WriteHeader(http.StatusOK)
			} else {
				w.WriteHeader(http.StatusNotFound)
				fmt.Fprintf(w, "Account ID does not exist")
			}

		} else {
			fmt.Println(err)
		}

	} else if r.Method == "PATCH" {
		var data map[string]interface{}

		if err := json.Unmarshal(body, &data); err == nil {
			if orig, ok := isExist(accountID); ok {
				for k, v := range data {
					switch k {
					case "First Name":
						orig.FirstName = v.(string)
					case "Last Name":
						orig.LastName = v.(string)
					case "Mobile Number":
						orig.MobileNumber = v.(string)
					case "Email Address":
						orig.EmailAddress = v.(string)
					case "User Type":
						orig.UserType = v.(string)
					case "Driver License Number":
						orig.DriverLicenseNumber = v.(string)
					case "Car Plate Number":
						orig.CarPlateNumber = v.(string)
					}
				}
				updateAccount(accountID, orig)
				w.WriteHeader(http.StatusAccepted)
			} else {
				w.WriteHeader(http.StatusNotFound)
				fmt.Fprintf(w, "Account ID does not exist")
			}
		} else {
			fmt.Println(err)
		}

		// If account exists
	} else if val, ok := isExist(accountID); ok {
		// Delete account
		if r.Method == "DELETE" {
			delAccount(accountID)

			// Get account
		} else {
			json.NewEncoder(w).Encode(val)
		}
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Invalid Account ID")
	}
}

func searchAccounts(w http.ResponseWriter, r *http.Request) {
	querystringmap := r.URL.Query()
	emailStr := querystringmap.Get("email")
	passwordStr := querystringmap.Get("password")

	if value := emailStr; len(value) > 0 {
		id, found := checkLoginCredentials(emailStr, passwordStr)

		if !found {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "No accounts found")
		} else {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(id)
		}
	} else {
		coursesWrapper := struct {
			Courses map[string]Account `json:"Accounts"`
		}{getCourses()}
		json.NewEncoder(w).Encode(coursesWrapper)
		return
	}
}

func isExist(id string) (Account, bool) {
	var a Account

	result := db.QueryRow("SELECT * FROM accounts WHERE ID=?", id)
	err := result.Scan(&id, &a.FirstName, &a.LastName, &a.MobileNumber, &a.EmailAddress, &a.UserType, &a.DriverLicenseNumber, &a.CarPlateNumber, &a.Password)
	if err == sql.ErrNoRows {
		return a, false
	}

	return a, true
}

func getCourses() map[string]Account {
	results, err := db.Query("SELECT * FROM accounts")
	if err != nil {
		panic(err.Error())
	}

	var accounts map[string]Account = map[string]Account{}

	for results.Next() {
		var a Account
		var id string
		err := results.Scan(&id, &a.FirstName, &a.LastName, &a.MobileNumber, &a.EmailAddress, &a.UserType, &a.DriverLicenseNumber, &a.CarPlateNumber, &a.Password)
		if err != nil {
			panic(err.Error())
		}

		accounts[id] = a
	}

	return accounts
}

func insertAccount(id string, a Account) {
	_, err := db.Exec(
		`INSERT INTO accounts (ID, FirstName, LastName, MobileNumber, Email, UserType, DriverLicenseNumber, CarPlateNumber, Password)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, id, a.FirstName, a.LastName, a.MobileNumber, a.EmailAddress, a.UserType, a.DriverLicenseNumber, a.CarPlateNumber, a.Password)
	if err != nil {
		panic(err.Error())
	}
}

func updateAccount(id string, a Account) {
	_, err := db.Exec(
		"UPDATE accounts SET FirstName=?, LastName=?, MobileNumber=?, Email=?, UserType=?, DriverLicenseNumber=?, CarPlateNumber=?, Password=? WHERE ID=?",
		a.FirstName, a.LastName, a.MobileNumber, a.EmailAddress, a.UserType, a.DriverLicenseNumber, a.CarPlateNumber, a.Password, id)
	if err != nil {
		panic(err.Error())
	}
}

func delAccount(id string) (int64, error) {
	result, err := db.Exec("DELETE from accounts WHERE ID=?", id)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}

func checkLoginCredentials(email string, password string) (string, bool) {
	var id string

	results, err := db.Query("SELECT ID FROM accounts WHERE Email=? AND Password=?", email, password)
	if err != nil {
		panic(err.Error())
	}

	if results.Next() {
		err = results.Scan(&id)
		if err != nil {
			panic(err.Error())
		}

		return id, true
	}

	return "", false
}

func getLastAccountIndex() string {
	var lastIndex string
	results, err := db.Query("SELECT MAX(ID) + 1 AS ACC_ID FROM accounts")
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
