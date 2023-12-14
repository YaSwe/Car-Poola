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

type Account struct {
	FirstName           string `json:"First Name"`
	LastName            string `json:"Last Name"`
	MobileNumber        string `json:"Mobile Number"`
	EmailAddress        string `json:"Email Address"`
	UserType            string `json:"User Type"`
	DriverLicenseNumber string `json:"Driver License Number"`
	CarPlateNumber      string `json:"Car Plate Number"`
	Password            string `json:"Password"`
	CreatedAt           string `json:"Created At"`
}

func HandleAccountRequest(w http.ResponseWriter, r *http.Request) {
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

			if _, ok := isAccountExist(accountID); !ok {
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
			if _, ok := isAccountExist(accountID); ok {
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
			if orig, ok := isAccountExist(accountID); ok {
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
	} else if val, ok := isAccountExist(accountID); ok {
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

// Search the account with the associated email and password for login
func SearchAccounts(w http.ResponseWriter, r *http.Request) {
	querystringmap := r.URL.Query()
	emailStr := querystringmap.Get("email")
	passwordStr := querystringmap.Get("password")

	if value := emailStr; len(value) > 0 {
		id, userType, found := checkLoginCredentials(emailStr, passwordStr)

		// If not found
		if !found {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "No accounts found")
			// If found
		} else {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"id":       id,
				"userType": userType,
			})
		}
	} else {
		coursesWrapper := struct {
			Courses map[string]Account `json:"Accounts"`
		}{getAccounts()}
		json.NewEncoder(w).Encode(coursesWrapper)
		return
	}
}

// Check if the specified account with the account ID exists in the database
func isAccountExist(id string) (Account, bool) {
	var a Account
	var createdAt sql.NullString

	result := db.QueryRow("SELECT * FROM accounts WHERE ID=?", id)
	err := result.Scan(&id, &a.FirstName, &a.LastName, &a.MobileNumber, &a.EmailAddress, &a.UserType, &a.DriverLicenseNumber, &a.CarPlateNumber, &a.Password, &createdAt)
	if err == sql.ErrNoRows {
		return a, false
	}

	// Handle null values
	if createdAt.Valid {
		a.CreatedAt = createdAt.String
	}

	return a, true
}

// Get all accounts
func getAccounts() map[string]Account {
	results, err := db.Query("SELECT * FROM accounts")
	if err != nil {
		panic(err.Error())
	}

	var accounts map[string]Account = map[string]Account{}

	for results.Next() {
		var a Account
		var id string
		var createdAt sql.NullString

		err := results.Scan(&id, &a.FirstName, &a.LastName, &a.MobileNumber, &a.EmailAddress, &a.UserType, &a.DriverLicenseNumber, &a.CarPlateNumber, &a.Password, &createdAt)
		if err != nil {
			panic(err.Error())
		}

		// Handle null values
		if createdAt.Valid {
			a.CreatedAt = createdAt.String
		}

		accounts[id] = a
	}

	return accounts
}

// Insert new account row into table
func insertAccount(id string, a Account) {

	_, err := db.Exec(
		`INSERT INTO accounts (ID, FirstName, LastName, MobileNumber, Email, UserType, DriverLicenseNumber, CarPlateNumber, Password, CreatedAt)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, id, a.FirstName, a.LastName, a.MobileNumber, a.EmailAddress, a.UserType, a.DriverLicenseNumber, a.CarPlateNumber, a.Password, a.CreatedAt)
	if err != nil {
		panic(err.Error())
	}
}

// Update account
func updateAccount(id string, a Account) {
	_, err := db.Exec(
		"UPDATE accounts SET FirstName=?, LastName=?, MobileNumber=?, Email=?, UserType=?, DriverLicenseNumber=?, CarPlateNumber=?, Password=? WHERE ID=?",
		a.FirstName, a.LastName, a.MobileNumber, a.EmailAddress, a.UserType, a.DriverLicenseNumber, a.CarPlateNumber, a.Password, id)
	if err != nil {
		panic(err.Error())
	}
}

// Delete account that is more than a year old
func delAccount(id string) (int64, error) {
	// Delete rides with rider ID foreign key
	_, err = db.Exec("DELETE FROM rides WHERE RiderID = ?", id)
	if err != nil {
		return 0, err
	}

	// Delete account with account ID
	oneYearAgo := time.Now().AddDate(-1, 0, 0)
	result, err := db.Exec("DELETE from accounts WHERE ID=? AND CreatedAt <= ?", id, oneYearAgo)
	if err != nil {
		return 0, err
	}
	fmt.Print(result.RowsAffected())
	return result.RowsAffected()
}

// Check the account with the matching email and password and retrieve its ID and user type
func checkLoginCredentials(email string, password string) (string, string, bool) {
	var id, userType string

	results, err := db.Query("SELECT ID, UserType FROM accounts WHERE Email=? AND Password=?", email, password)
	if err != nil {
		panic(err.Error())
	}

	if results.Next() {
		err = results.Scan(&id, &userType)
		if err != nil {
			panic(err.Error())
		}

		return id, userType, true
	}

	return "", "", false
}

// Get the last account index and add + 1
func getLastAccountIndex() string {
	var lastIndex string
	results, err := db.Query("SELECT COALESCE(MAX(ID), 0) + 1 AS ACC_ID FROM accounts")
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
