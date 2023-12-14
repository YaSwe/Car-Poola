/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/account.js":
/*!************************!*\
  !*** ./src/account.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const account = (() => {
    let url = 'http://localhost:8000/api/v1/accounts';

    const createAccount = (accountData) => {
        let createURL = url + "/" + "id";

        let request = new XMLHttpRequest();
        request.open('POST', createURL);
        
        request.onload = function() {
            if (request.status == 201) {
                // Display account creation success
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('signup', 'success');
                return;
            } 
        }
        request.send(JSON.stringify(accountData));
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('signup', 'error');
    }

    const checkLogin = (email, password) => {
        let searchURL = url + `?email=${email}&password=${password}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            // If email and password are found
            if (request.status == 200) {
                let accountData = JSON.parse(this.response);
                localStorage.setItem('accountID', accountData.id);
                localStorage.setItem('userType', accountData.userType);
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].userLoggedIn();
                return;
            } 
        }
        request.send();
        // If email and password not found
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayLoginError();
    };

    const getAccount = (callback) => {
        let searchURL = url + `/${localStorage.getItem('accountID')}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);

        request.onload = function() {
            let accountData = JSON.parse(this.response);
            callback(accountData);
        }
        request.send();
    }

    const updateAccount = (accountData) => {
        const accountID = localStorage.getItem('accountID');
        let updateURL = url + "/" + accountID;
         
        let request = new XMLHttpRequest();
        request.open('PUT', updateURL);

        request.onload = function() {
            if (request.status == 200) {
                // Store new user type to local storage
                localStorage.setItem('userType', accountData['User Type']);
                // Display account update success
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('update', 'success');
                return;
            } 
        }
        request.send(JSON.stringify(accountData));
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('update', 'error');
    }

    const deleteAccount = () => {
        const accountID = localStorage.getItem('accountID');
        let deleteURL = url + "/" + accountID;
        
        let request = new XMLHttpRequest();
        request.open('DELETE', deleteURL);

        request.onload = function() {
            if (request.status == 200) {
                // Remove the account ID and user type in local storage
                localStorage.removeItem('accountID');
                localStorage.removeItem('userType');

                // Display account deletion success
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('delete', 'success');
                setTimeout(() => {
                    // 5 second delay and return to login form
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayLoginForm();
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].userLoggedOut();
                }, 5000);
                return;
            } 
        }
        request.send();
        // Display error
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('delete', 'error');
    }

    return {
        createAccount,
        checkLogin,
        getAccount,
        updateAccount,
        deleteAccount,
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (account);


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account */ "./src/account.js");
/* harmony import */ var _ride__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ride */ "./src/ride.js");



const dom = (() => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const signOutLink = document.querySelector('.signOutLink');
    const content = document.querySelector('.content');

    const loginForm = document.querySelector('#loginForm');
    const loginError = document.querySelector('.loginError');

    // Toggle sidebar
    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            content.classList.remove('active');
            hamburger.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            content.classList.add('active');
            hamburger.classList.add('active');
        }
    }

    // Retrieve login inputs and check inputs
    const getFormInputs = (action) => {
        if (action == 'login') {
            const emailInputValue = document.querySelector('#email').value;
            const passwordInputValue= document.querySelector('#password').value;

            // Inputs are not empty
            return [emailInputValue, passwordInputValue];    
        }
        else if (action == 'signUp') {
            const firstNameInputValue = document.querySelector('#firstName').value;
            const lastNameInputValue = document.querySelector('#lastName').value;
            const mobileNoInputValue = document.querySelector('#mobileNo').value;
            const emailInputValue = document.querySelector('#email').value;
            const passwordInputValue= document.querySelector('#password').value;

            const currentDate = new Date().toISOString(); // Get current date in ISO format
            const date = new Date(currentDate);
            const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS
            
            // Create JSON
            let accountData = {
                "First Name": firstNameInputValue,
                "Last Name": lastNameInputValue,
                "Mobile Number": mobileNoInputValue,
                "Email Address": emailInputValue,
                "User Type": 'passenger',
                "Driver License Number": "",
                "Car Plate Number": "",
                "Password": passwordInputValue,
                "Created At": formattedDate
            }
            return accountData;  
        }
        else if (action == 'update') {
            const firstNameInputValue = document.querySelector('#firstName').value;
            const lastNameInputValue = document.querySelector('#lastName').value;
            const mobileNoInputValue = document.querySelector('#mobileNo').value;
            const emailInputValue = document.querySelector('#email').value;
            const passwordInputValue= document.querySelector('#password').value;
            const userTypeInputvalue = document.querySelector('input[name="selectUserType"]:checked').value;
            let driverLicenseInputValue = "";
            let carPlateInputValue = "";

            // If car owner radio is selected, retrieve the car owner form inputs
            if (document.querySelector('.carOwnerSelection')) {
                driverLicenseInputValue = document.querySelector('#driverLicenseNumber').value;
                carPlateInputValue = document.querySelector('#carPlateNumber').value;
            }

            // If passenger, remove driver license number & car plate number
            if (userTypeInputvalue == 'passenger') {
                driverLicenseInputValue = "";
                carPlateInputValue = "";
            }

            // Create JSON
            let accountData = {
                "First Name": firstNameInputValue,
                "Last Name": lastNameInputValue,
                "Mobile Number": mobileNoInputValue,
                "Email Address": emailInputValue,
                "User Type": userTypeInputvalue,
                "Driver License Number": driverLicenseInputValue,
                "Car Plate Number": carPlateInputValue,
                "Password": passwordInputValue
            }
            return accountData;  
        }
        else if (action == 'publish-ride') {
            const pickUpLocationInputValue = document.querySelector('#pickUpLocation').value;
            const destinationAddressInputValue = document.querySelector('#destinationAddress').value;
            const passengerCapacityInputValue = document.querySelector('#passengerCapacity').value;

            const currentDate = new Date().toISOString(); // Get current date in ISO format
            const date = new Date(currentDate);
            const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS
            let rideData = {
                "Start Ride Time": formattedDate,
                "Pick Up Location": pickUpLocationInputValue,
                "Destination Address": destinationAddressInputValue,
                "Passenger Capacity": parseInt(passengerCapacityInputValue),
                "NumPassengers": 0,
                "Status": "published",
                "Rider ID": localStorage.getItem('accountID')
            }
            return rideData;
        }
    }

    // Display error when login credentials are incorrect
    const displayLoginError = () => {
        loginForm.reset();
        loginError.classList.remove('hide');
    }

    // Display registration form
    const displaySignUpForm = () => {
        content.innerHTML = `
            <form class="accountForm" id="signUpForm" action="#">
                <h2>Create an account</h2>
                <!-- FirstName Input -->
                <div class="input-selection">
                    <input type="text" id="firstName" placeholder=" " required>
                    <div class="label">
                        <label for="firstName">First Name</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <!-- LastName Input -->
                <div class="input-selection">
                    <input type="text" id="lastName" placeholder=" " required>
                    <div class="label">
                        <label for="lastName">Last Name</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <!-- Mobile Number Input-->
                <div class="input-selection">
                    <input type="text" id="mobileNo" placeholder=" " required>
                    <div class="label">
                        <label for="mobileNo">Mobile Number</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <!-- Email Input -->
                <div class="input-selection">
                    <input type="email" id="email" placeholder=" " required>
                    <div class="label">
                        <label for="email">Email</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <!-- Password Input-->
                <div class="input-selection">
                    <input type="password" id="password" placeholder=" " required>
                    <div class="label">
                        <label for="password">Password</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <button class="btn signUpBtn">Create Account</button>
                <div class="loginLink">Have an account?<span class="underline displayLogin">Log in here</span></div>
            </form>
        `;
    }

    const displayLoginForm = () => {
        content.innerHTML = `
            <form class="accountForm" id="loginForm" action="#">
                <h2>Sign In</h2>
                <!-- Email Input -->
                <div class="input-selection">
                    <input type="email" id="email" placeholder=" " required>
                    <div class="label">
                        <label for="email">Email</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <!-- Password Input -->
                <div class="input-selection">
                    <input type="password" id="password" placeholder=" " required>
                    <div class="label">
                        <label for="password">Password</label>
                    </div>
                    <div class="error-text inputError hide">This field is required.</div>
                </div>

                <button class="btn loginBtn">Sign In</button>
                <div class="error-text loginError hide">Invalid login credentials. Please try again.</div>
                <div class="signUpLink">Don't have an account?<span class="underline displaySignUp">Sign up here</span></div>
            </form>
        `;
    }

    const userLoggedIn = () => {
        // Get user type from local storage
        const userType = localStorage.getItem('userType');

        document.querySelector('.header-elements').style.justifyContent = 'space-between';
        hamburger.classList.remove('hide');
        signOutLink.classList.remove('hide');

        if (userType == 'passenger') {
            document.querySelector('.sidebar').innerHTML = `
                <ul>
                    <li class="link menu-link select active-link" data-link-destination="rides">
                        <ion-icon class="menu-icon select" name="car-sport-outline" data-link-destination="rides"></ion-icon>
                        Rides
                    </li>
                    <li class="link menu-link select" data-link-destination="trips">
                        <ion-icon class="menu-icon select" name="location-outline" data-link-destination="trips"></ion-icon>
                        My Trips
                    </li>
                    <li class="link menu-link select" data-link-destination="profile"> 
                        <ion-icon class="menu-icon select" name="person-outline" data-link-destination="profile"></ion-icon>
                        Profile
                    </li>
                </ul>
            `;
            _ride__WEBPACK_IMPORTED_MODULE_1__["default"].getRides((rides) => {
                displayAllPassengerRides(rides);
            })
        } 
        else if (userType == 'car owner') {
            document.querySelector('.sidebar').innerHTML = `
                <ul>
                    <li class="link menu-link select active-link" data-link-destination="car-owner-rides">
                        <ion-icon class="menu-icon select" name="car-sport-outline" data-link-destination="car-owner-rides"></ion-icon>
                        Rides
                    </li>
                    <li class="link menu-link select" data-link-destination="profile"> 
                        <ion-icon class="menu-icon select" name="person-outline" data-link-destination="profile"></ion-icon>
                        Profile
                    </li>
                </ul>
            `;
            _ride__WEBPACK_IMPORTED_MODULE_1__["default"].getCarOwnerRides((rides) => {
                displayAllCarOwnerRides(rides);
            })
        }
    }

    const userLoggedOut = () => {
        // Change the DOM when user logs out
        document.querySelector('.header-elements').style.justifyContent = 'center';
        hamburger.classList.add('hide');
        signOutLink.classList.add('hide');
    }

    const selectLink = (target, destination) => {
        const links = document.querySelectorAll(".link");
        links.forEach((link) => {
            link.classList.remove("active-link");
        });

         // Click on menu or project link
        if (target.classList.contains("link")) {
            target.classList.add("active-link");
        }
        // Click on menu icon
        else if (target.classList.contains("menu-icon")) {
            target.parentElement.classList.add("active-link");
        }

        // Click on home
        if (destination == 'rides') {
            _ride__WEBPACK_IMPORTED_MODULE_1__["default"].getRides((rides) => {
                displayAllPassengerRides(rides);
            })
        } 
        // Click on view profile
        else if (destination == 'profile') {
            _account__WEBPACK_IMPORTED_MODULE_0__["default"].getAccount((accountData) => {
                displayProfile(accountData);
            }); 
        }
        else if (destination =='car-owner-rides') {
            _ride__WEBPACK_IMPORTED_MODULE_1__["default"].getCarOwnerRides((rides) => {
                displayAllCarOwnerRides(rides);
            })
        }
    }

    const displayAllPassengerRides = (data) => {
        content.innerHTML = `
            <div class="search-container">
                <ion-icon name="search-outline" id="submitSearch"></ion-icon>
                <input type="search" id="search-bar">
            </div>
            <div class="ridesList"></div>
        `;

        let keys = Object.keys(data.Rides);
        keys.forEach((key) => {
            document.querySelector('.ridesList').innerHTML += `
                <div class="ride-container">
                    <div class="left">
                        <p>Ride started at: <span class="ride-info">${data.Rides[key]["Start Ride Time"]}</span></p>
                        <p>Pick-up location: <span class="ride-info">${data.Rides[key]["Pick Up Location"]}</span></p>
                        <p>Destination: <span class="ride-info">${data.Rides[key]["Destination Address"]}</span></p>
                        <p>Capacity: <span class="ride-info">${data.Rides[key]["Passenger Capacity"]}</span></p>
                        <p>Passengers: <span class="ride-info">${data.Rides[key]["NumPassengers"]}</span></p>
                    </div>
                    <div class="right">
                        <p>Completed at: <span class="ride-info">${data.Rides[key]["Completed At"]}</span></p>
                        <p>Cancelled at: <span class="ride-info">${data.Rides[key]["Cancelled At"]}</span></p>
                        <p>Status: <span class="ride-info">${data.Rides[key]["Status"]}</span></p>
                        <button class="btn enrolBtn" data-link-rideID="${key}" data-link-rideData='${JSON.stringify(data.Rides[key])}'>Enrol</button>
                        <p class="exceedMessage hide" data-link-id='${key}'>Ride is full</p>
                        <p class="inRideMessage hide" data-link-id='${key}'>Already in ride</p>
                    </div>
                </div>
            `;
        }); 
    }

    const displayAllCarOwnerRides = (data) => {
        content.innerHTML = `
            <button class="btn displayPublishRideBtn">Publish Ride</button>
            <div class="ridesList"></div>
        `;


        // If no rides are found with the Rider ID
        if (data == "empty") {
            content.innerHTML += "";
            return;
        }

        let keys = Object.keys(data.Rides);
        keys.forEach((key) => {
            document.querySelector('.ridesList').innerHTML += `
                <div class="ride-container">
                    <div class="left">
                        <p>Ride started at: <span class="ride-info">${data.Rides[key]["Start Ride Time"]}</span></p>
                        <p>Pick-up location: <span class="ride-info">${data.Rides[key]["Pick Up Location"]}</span></p>
                        <p>Destination: <span class="ride-info">${data.Rides[key]["Destination Address"]}</span></p>
                        <p>Capacity: <span class="ride-info">${data.Rides[key]["Passenger Capacity"]}</span></p>
                        <p>Passengers: <span class="ride-info">${data.Rides[key]["NumPassengers"]}</span></p>
                    </div>
                    <div class="right">
                        <p>Completed at: <span class="ride-info">${data.Rides[key]["Completed At"]}</span></p>
                        <p>Cancelled at: <span class="ride-info">${data.Rides[key]["Cancelled At"]}</span></p>
                        <p>Status: <span class="ride-info">${data.Rides[key]["Status"]}</span></p>
                        <button class="btn startRideBtn" data-link-rideID="${key}" data-link-rideData='${JSON.stringify(data.Rides[key])}'>Start Ride</button>
                        <button class="btn cancelRideBtn" data-link-rideID="${key}" data-link-rideData='${JSON.stringify(data.Rides[key])}'>Cancel Ride</button>
                        <p class="exceedMessage hide" data-link-id='${key}'>Ride is full</p>
                    </div>
                </div>
            `;
        }); 

    }

    const getSearchbarInput = () => {
        const searchBarInputValue = document.querySelector('#search-bar').value;
        return searchBarInputValue;
    }

    const displayProfile = (account) => {
        content.innerHTML = `
            <form class="accountForm" action="#">
                <h2>Hello ${account['First Name'] + " " + account['Last Name']}</h2>
                <div class="input-selection">
                    <input type="text" id="firstName" placeholder=" " value="${account['First Name']}" required>
                    <div class="label">
                        <label for="firstName">First Name</label>
                    </div>
                </div>

                <div class="input-selection">
                    <input type="text" id="lastName" placeholder=" " value="${account['Last Name']}" required>
                    <div class="label">
                        <label for="lastName">Last Name</label>
                    </div>
                </div>

                <div class="input-selection">
                    <input type="text" id="mobileNo" placeholder=" " value="${account['Mobile Number']}" required>
                    <div class="label">
                        <label for="mobileNo">Mobile Number</label>
                    </div>
                </div>

                <div class="input-selection">
                    <input type="email" id="email" placeholder=" " value="${account['Email Address']}" required>
                    <div class="label">
                        <label for="email">Email</label>
                    </div>
                </div>

                <div class="input-selection">
                    <input type="password" id="password" placeholder=" " value="${account['Password']}" required>
                    <div class="label">
                        <label for="password">Password</label>
                    </div>
                </div>

                <div class="userTypeSelection">
                    <input type="radio" id="passenger" name="selectUserType" value="passenger" />
                    <label for="passenger">Passenger</label>
                    
                    <input type="radio" id="car-owner" name="selectUserType" value="car owner" />
                    <label for="car-owner">Car Owner</label>
                </div>

                <div class="carOwnerSelection hide">
                    <div class="input-selection">
                        <input type="text" id="driverLicenseNumber" placeholder=" " value="${account['Driver License Number']}" required>
                        <div class="label">
                            <label for="driverLicenseNumber">Driver License Number</label>
                        </div>
                    </div>

                    <div class="input-selection">
                        <input type="text" id="carPlateNumber" placeholder=" " value="${account['Car Plate Number']}" required>
                        <div class="label">
                            <label for="carPlateNumber">Car Plate Number</label>
                        </div>
                    </div>
                </div>

                <button class="btn updateBtn">Update</button>
                <p>Account created at: <span class="accCreatedDate">${account['Created At']}</span></p>
                <p class="delAccNote">Note: You can only delete account if it is a year old</p>
                <button class="btn delBtn">Delete Account</button>
            </form>

            <div class="deleteModal">
                <p>Are you sure you want to delete?</p>
                <div class="delActionBtns">
                    <button class="btn confirmDelBtn">Confirm</button>
                    <button class="btn cancelDelBtn">Cancel</button>
                </div>
            </div>
            <div class="overlay">
        `;

        const passengerRadio = document.querySelector('#passenger');
        const carOwnerRadio = document.querySelector('#car-owner');

        if (account['User Type'] == 'passenger') {
            passengerRadio.setAttribute('checked', 'checked');
        }
        else if (account['User Type'] == 'car owner') {
            carOwnerRadio.setAttribute('checked', 'checked');
            toggleCarOwnerDOM('car-owner');
        }
    }

    const toggleCarOwnerDOM = (userType) => {
        document.querySelector('.carOwnerSelection');
        
        if (userType == 'car-owner') {
            document.querySelector('.carOwnerSelection').classList.remove('hide');
        }
        else 
        {
            document.querySelector('.carOwnerSelection').classList.add('hide');  
        }
    }

    const displayMessage = (type, outcome) => {
        if (type == 'signup' && outcome == 'success') {
            content.innerHTML = `
                <div class="outcome-message signUpMessage">
                    <p>Successfully created account</p>
                    <p class="underline returnLogin">Return to sign in</p>
                </div>
            `;
        }
        else if (type == 'signup' && outcome == 'error') {
            content.innerHTML = `
                <div class="outcome-message signUpMessage">
                    <p>Registration error. Try again</p>
                    <p class="underline returnSignUp">Return</p>
                </div>
            `;
        }
        
        if (type == 'update' && outcome == 'success') {
            content.innerHTML = `<p class="outcome-message">Your details have been updated</p>`;
        }
        else if (type == 'update' && outcome == 'error') {
            content.innerHTML = `<p class="outcome-message">Error updating account details</p>`;
        }

        if (type == 'delete' && outcome == 'success') {
            content.innerHTML = '<p class="outcome-message">Your account has been deleted</p>';
        }
        else if (type == 'delete' && outcome == 'error') {
            content.innerHTML = '<p class="outcome-message">Account is less than a year old</p>'
        }

        if (type == 'publish' && outcome == 'success') {
            content.innerHTML = `<p class="outcome-message">Ride has been published.</p>`;
        }
        else if (type == 'publish' && outcome == 'error') {
            content.innerHTML = `<p class="outcome-message">An error occured. Ride was not published.</p>`;
        }
    }

    const displayDeleteModal = () => {
        document.querySelector('.deleteModal').classList.add('active');
        document.querySelector('.overlay').classList.add('active');
    }

    const closeDeleteModal = () => {
        document.querySelector('.deleteModal').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
    }

    const exceedPassengerCapacity = (rideID) => {
        const message = document.querySelector(`.exceedMessage[data-link-id="${rideID}"]`);
        message.classList.remove('hide');
    }

    const displayPassengerInRide = (rideID) => {
        const message = document.querySelector(`.inRideMessage[data-link-id="${rideID}"]`);
        message.classList.remove('hide');
    }

    const displayPublishRideForm = () => {
        content.innerHTML = `
            <form class="rideForm" action="#">
                <div class="input-selection">
                    <input type="text" id="pickUpLocation" placeholder=" " required>
                    <div class="label">
                        <label for="pickUpLocation">Pick Up Location</label>
                    </div>
                </div>

                <div class="input-selection">
                    <input type="text" id="destinationAddress" placeholder=" " required>
                    <div class="label">
                        <label for="destinationAddress">Destination Address</label>
                    </div>
                </div>

                <div class="input-selection">
                    <label for="passengerCapacity">Passenger Capacity</label>
                    <select id="passengerCapacity">
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                    </select>
                </div>

                <button class="btn publishRideBtn">Publish</button>
            </form>
        `;
    }

    return {
        toggleSidebar,
        getFormInputs,
        displayLoginError,
        displaySignUpForm,
        displayLoginForm,
        userLoggedIn,
        userLoggedOut,
        selectLink,
        toggleCarOwnerDOM,
        displayMessage,
        displayDeleteModal,
        closeDeleteModal,
        getSearchbarInput,
        displayAllPassengerRides,
        exceedPassengerCapacity,
        displayPassengerInRide,
        displayAllCarOwnerRides,
        displayPublishRideForm,
    }

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ "./src/account.js");
/* harmony import */ var _ride__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ride */ "./src/ride.js");
/* harmony import */ var _ridePassengers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ridePassengers */ "./src/ridePassengers.js");





const handler = (() => {

    const handleClicks = () => {
        document.addEventListener('click', (e) => {
            // Toggle sidebar
            if (
                e.target.classList.contains('hamburger') ||
                e.target.classList.contains('burger-line')
            ) {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleSidebar();
            }

            // Login button
            if (e.target.classList.contains('loginBtn')) {
                let [email, password] = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getFormInputs('login');
                _account__WEBPACK_IMPORTED_MODULE_1__["default"].checkLogin(email, password);
            }

            // Display registration form
            if (
                e.target.classList.contains('displaySignUp') ||
                e.target.classList.contains('returnSignUp'))
            {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displaySignUpForm();
            }

            // Display login form
            if (
                e.target.classList.contains('displayLogin') || 
                e.target.classList.contains('returnLogin'))
            {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayLoginForm();
            }

            // Sign out
            if (e.target.classList.contains('signOutLink')) {
                localStorage.removeItem('accountID');
                localStorage.removeItem('userType');
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayLoginForm();
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].userLoggedOut();
            }

            // Sidebar links
            if (e.target.classList.contains('select')) {
                const destinationLink = e.target.getAttribute('data-link-destination');
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].selectLink(e.target, destinationLink);
            }

            // Select passenger or car owner radio in profile
            if (
                e.target.getAttribute('id') == 'car-owner' || 
                e.target.getAttribute('id') == 'passenger')
            {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleCarOwnerDOM(e.target.getAttribute('id'));
            } 

              // Creata account
              if (e.target.classList.contains('signUpBtn')) {
                let accountData = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getFormInputs('signUp');
                _account__WEBPACK_IMPORTED_MODULE_1__["default"].createAccount(accountData);
            }

            // Update account
            if (e.target.classList.contains('updateBtn')) {
                let accountData = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getFormInputs('update');
                _account__WEBPACK_IMPORTED_MODULE_1__["default"].updateAccount(accountData);
            }

            // Display delete account modal
            if (e.target.classList.contains('delBtn')) {
                e.preventDefault();
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayDeleteModal();
            }

            // Confirm delete account in modal
            if (e.target.classList.contains('confirmDelBtn')) {
                // Delete account with retrieved local storage account ID
                _account__WEBPACK_IMPORTED_MODULE_1__["default"].deleteAccount();
            }

            // Close delete account modal
            if (e.target.classList.contains('cancelDelBtn')) {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].closeDeleteModal();
            }

            // Submit search bar input
            if (e.target.getAttribute('id') == 'submitSearch') {
                let searchbarInput = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getSearchbarInput();
                _ride__WEBPACK_IMPORTED_MODULE_2__["default"].searchRide(searchbarInput, (rideData) => {
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayAllPassengerRides(rideData);
                });
            }

            // Passenger enrol ride
            if (e.target.classList.contains('enrolBtn')) {
                const rideID = e.target.getAttribute('data-link-rideid');
                const ridePassengerData = e.target.getAttribute('data-link-ridedata');
                let data = JSON.parse(ridePassengerData);
                let newNumPassengers = data["NumPassengers"] + 1;

                let updateData = {
                    "Passenger Capacity": data["Passenger Capacity"],
                    "NumPassengers": newNumPassengers,
                    "Status": 'started'
                }

                if (data["Status"] == 'published') {
                    const accountID = localStorage.getItem('accountID');
                    _ridePassengers__WEBPACK_IMPORTED_MODULE_3__["default"].passengerInRide(rideID, accountID, function(result) {
                        if (result == true) {
                            // Passenger found in the ride
                            _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayPassengerInRide(rideID);
                        } else {
                            // Passenger not found in the ride
                            _ride__WEBPACK_IMPORTED_MODULE_2__["default"].updateRide(rideID, updateData);
                            _ridePassengers__WEBPACK_IMPORTED_MODULE_3__["default"].enrolRide(rideID);
                        }
                    });
                } else if (data["Status"] == 'started') {
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].exceedPassengerCapacity(rideID);
                }
            }

            // Display form for publishing ride
            if (e.target.classList.contains('displayPublishRideBtn')) {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayPublishRideForm();
            }

            // Publish ride
            if (e.target.classList.contains('publishRideBtn')) {
                let rideData = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getFormInputs('publish-ride');
                _ride__WEBPACK_IMPORTED_MODULE_2__["default"].createRide(rideData);
            }

            if (e.target.classList.contains('cancelRideBtn')) {
                let rideID = e.target.getAttribute('data-link-id');
                _ridePassengers__WEBPACK_IMPORTED_MODULE_3__["default"].delRidePassenger(rideID);

            }
        })
    }

    return { handleClicks };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

/***/ }),

/***/ "./src/ride.js":
/*!*********************!*\
  !*** ./src/ride.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const ride = (() => {
    let url = 'http://localhost:8000/api/v1/rides';

    const getRides = (callback) => {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        
        request.onload = function() {
            let data = JSON.parse(this.response);
            callback(data);
        }
        request.send();
    }

    const searchRide = (searchInput, callback) => {
        let searchURL = url + `?search=${searchInput}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            let rideData = JSON.parse(this.response);
            callback(rideData);
        }
        request.send();
    }

    // Change ride status 
    const updateRide = (rideID, rideData) => {
        let updateURL = url + "/" + rideID;
    
        let request = new XMLHttpRequest();
        request.open('PUT', updateURL);

        request.onload = function() {
            if (request.status == 200) {
                // Display all trips again
                ride.getRides((rides) => {
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayAllPassengerRides(rides);
                })
                return;
            } 
        }
        request.send(JSON.stringify(rideData));
    }

    const getCarOwnerRides = (callback) => {
        const riderID = localStorage.getItem('accountID');
        let searchURL = url + `?riderID=${riderID}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            if (request.status == 200) {
                let rideData = JSON.parse(this.response);
                callback(rideData);
            }
            return;
        }
        request.send();
        callback("empty")
    }

    const createRide = (rideData) => {
        let createURL = url + "/" + "id";

        let request = new XMLHttpRequest();
        request.open('POST', createURL);
        
        request.onload = function() {
            if (request.status == 201) {
                // Display ride creation success
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('publish', 'success');
                return;
            } 
        }
        request.send(JSON.stringify(rideData));
        // If ride creation fails
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('publish', 'error');
    }

    return {
        getRides,
        searchRide,
        updateRide,
        getCarOwnerRides,
        createRide
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ride);

/***/ }),

/***/ "./src/ridePassengers.js":
/*!*******************************!*\
  !*** ./src/ridePassengers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const ridePassengers = (() => {
    let url = 'http://localhost:8000/api/v1/ridePassengers';

    // Add a new passenger to the ride with the ride ID
    const enrolRide = (rideID) => {
        const accountID = localStorage.getItem('accountID')
        let ridePassengerData = {
            "Ride ID": rideID,
            "Passenger ID": accountID
        }

        let createURL = url + "/" + rideID + "/" + accountID;

        let request = new XMLHttpRequest();
        request.open('POST', createURL);
        
        request.onload = function() {
            if (request.status == 201) {
                
                //dom.displayMessage('create', 'success');
                return;
            } 
        }
        request.send(JSON.stringify(ridePassengerData));
        //dom.displayMessage('create', 'error');
    }

    const passengerInRide = (rideID, passengerID, callback) => {
        let searchURL = url + `?rideID=${rideID}&passengerID=${passengerID}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            // If not found
            if (request.status == 200) {
                callback(false);
            // If found
            } else {
                callback(true);
            }
        }
        request.send();
    }

    const delRidePassenger = (rideID) => {
        let deleteURL = url + "/" + rideID;

        let request = new XMLHttpRequest();
        request.open('DELETE', deleteURL);

        request.onload = function() {
            if (request.status == 200) {
                console.log("success")
                return;
            } 
        }
        request.send();
        // Display error
        console.log("failed")
    }

    return {
        enrolRide,
        passengerInRide,
        delRidePassenger,
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ridePassengers);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



_handler__WEBPACK_IMPORTED_MODULE_0__["default"].handleClicks();

// If not logged in, show login form
if (localStorage.getItem('accountID')) {
    _dom__WEBPACK_IMPORTED_MODULE_1__["default"].userLoggedIn();
} 



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sWUFBWSxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0Q0FBRztBQUNYO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQ0FBa0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBLG9CQUFvQiw0Q0FBRztBQUN2QixvQkFBb0IsNENBQUc7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQy9HUztBQUNOO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usc0JBQXNCO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0UsT0FBTztBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxPQUFPO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3a0JNO0FBQ1E7QUFDTjtBQUNvQjtBQUM5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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxPQUFPLGVBQWUsWUFBWTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsY0FBYzs7Ozs7O1VDdEU3QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05nQztBQUNSO0FBQ3hCO0FBQ0EsZ0RBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFHO0FBQ1A7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvcmlkZS5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvcmlkZVBhc3NlbmdlcnMuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuY29uc3QgYWNjb3VudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvYWNjb3VudHMnO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUFjY291bnQgPSAoYWNjb3VudERhdGEpID0+IHtcclxuICAgICAgICBsZXQgY3JlYXRlVVJMID0gdXJsICsgXCIvXCIgKyBcImlkXCI7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgY3JlYXRlVVJMKTtcclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGFjY291bnQgY3JlYXRpb24gc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdzaWdudXAnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ3NpZ251cCcsICdlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoZWNrTG9naW4gPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/ZW1haWw9JHtlbWFpbH0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBzZWFyY2hVUkwpO1xyXG4gICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIGFyZSBmb3VuZFxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY291bnRJRCcsIGFjY291bnREYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyVHlwZScsIGFjY291bnREYXRhLnVzZXJUeXBlKTtcclxuICAgICAgICAgICAgICAgIGRvbS51c2VyTG9nZ2VkSW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIG5vdCBmb3VuZFxyXG4gICAgICAgIGRvbS5kaXNwbGF5TG9naW5FcnJvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRBY2NvdW50ID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGAvJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJyl9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soYWNjb3VudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVBY2NvdW50ID0gKGFjY291bnREYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudElEID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgIGxldCB1cGRhdGVVUkwgPSB1cmwgKyBcIi9cIiArIGFjY291bnRJRDtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BVVCcsIHVwZGF0ZVVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIG5ldyB1c2VyIHR5cGUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJUeXBlJywgYWNjb3VudERhdGFbJ1VzZXIgVHlwZSddKTtcclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgYWNjb3VudCB1cGRhdGUgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCd1cGRhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ3VwZGF0ZScsICdlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUFjY291bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudElEID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgIGxldCBkZWxldGVVUkwgPSB1cmwgKyBcIi9cIiArIGFjY291bnRJRDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignREVMRVRFJywgZGVsZXRlVVJMKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhY2NvdW50IElEIGFuZCB1c2VyIHR5cGUgaW4gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUeXBlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGlzcGxheSBhY2NvdW50IGRlbGV0aW9uIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5TWVzc2FnZSgnZGVsZXRlJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDUgc2Vjb25kIGRlbGF5IGFuZCByZXR1cm4gdG8gbG9naW4gZm9ybVxyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5TG9naW5Gb3JtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnVzZXJMb2dnZWRPdXQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICAvLyBEaXNwbGF5IGVycm9yXHJcbiAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdkZWxldGUnLCAnZXJyb3InKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUFjY291bnQsXHJcbiAgICAgICAgY2hlY2tMb2dpbixcclxuICAgICAgICBnZXRBY2NvdW50LFxyXG4gICAgICAgIHVwZGF0ZUFjY291bnQsXHJcbiAgICAgICAgZGVsZXRlQWNjb3VudCxcclxuICAgIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjY291bnQ7XHJcbiIsImltcG9ydCBhY2NvdW50IGZyb20gJy4vYWNjb3VudCc7XHJcbmltcG9ydCByaWRlIGZyb20gJy4vcmlkZSc7XHJcblxyXG5jb25zdCBkb20gPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFtYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpO1xyXG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XHJcbiAgICBjb25zdCBzaWduT3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWduT3V0TGluaycpO1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk7XHJcblxyXG4gICAgY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ2luRm9ybScpO1xyXG4gICAgY29uc3QgbG9naW5FcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbkVycm9yJyk7XHJcblxyXG4gICAgLy8gVG9nZ2xlIHNpZGViYXJcclxuICAgIGNvbnN0IHRvZ2dsZVNpZGViYXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXRyaWV2ZSBsb2dpbiBpbnB1dHMgYW5kIGNoZWNrIGlucHV0c1xyXG4gICAgY29uc3QgZ2V0Rm9ybUlucHV0cyA9IChhY3Rpb24pID0+IHtcclxuICAgICAgICBpZiAoYWN0aW9uID09ICdsb2dpbicpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWxJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkSW5wdXRWYWx1ZT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkJykudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnB1dHMgYXJlIG5vdCBlbXB0eVxyXG4gICAgICAgICAgICByZXR1cm4gW2VtYWlsSW5wdXRWYWx1ZSwgcGFzc3dvcmRJbnB1dFZhbHVlXTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PSAnc2lnblVwJykge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpcnN0TmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0TmFtZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlTm9JbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZU5vJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZElucHV0VmFsdWU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7IC8vIEdldCBjdXJyZW50IGRhdGUgaW4gSVNPIGZvcm1hdFxyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoY3VycmVudERhdGUpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDE5KS5yZXBsYWNlKCdUJywgJyAnKTsgLy8gWVlZWS1NTS1ERCBISDpNTTpTU1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIEpTT05cclxuICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJGaXJzdCBOYW1lXCI6IGZpcnN0TmFtZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkxhc3QgTmFtZVwiOiBsYXN0TmFtZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIk1vYmlsZSBOdW1iZXJcIjogbW9iaWxlTm9JbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJFbWFpbCBBZGRyZXNzXCI6IGVtYWlsSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiVXNlciBUeXBlXCI6ICdwYXNzZW5nZXInLFxyXG4gICAgICAgICAgICAgICAgXCJEcml2ZXIgTGljZW5zZSBOdW1iZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiQ2FyIFBsYXRlIE51bWJlclwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJQYXNzd29yZFwiOiBwYXNzd29yZElucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkNyZWF0ZWQgQXRcIjogZm9ybWF0dGVkRGF0ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2NvdW50RGF0YTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhc3ROYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU5vSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVObycpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbElucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdXNlclR5cGVJbnB1dHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInNlbGVjdFVzZXJUeXBlXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IGNhclBsYXRlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBjYXIgb3duZXIgcmFkaW8gaXMgc2VsZWN0ZWQsIHJldHJpZXZlIHRoZSBjYXIgb3duZXIgZm9ybSBpbnB1dHNcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJPd25lclNlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcml2ZXJMaWNlbnNlTnVtYmVyJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYXJQbGF0ZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyUGxhdGVOdW1iZXInKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgcGFzc2VuZ2VyLCByZW1vdmUgZHJpdmVyIGxpY2Vuc2UgbnVtYmVyICYgY2FyIHBsYXRlIG51bWJlclxyXG4gICAgICAgICAgICBpZiAodXNlclR5cGVJbnB1dHZhbHVlID09ICdwYXNzZW5nZXInKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjYXJQbGF0ZUlucHV0VmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgSlNPTlxyXG4gICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcIkZpcnN0IE5hbWVcIjogZmlyc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTGFzdCBOYW1lXCI6IGxhc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTW9iaWxlIE51bWJlclwiOiBtb2JpbGVOb0lucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkVtYWlsIEFkZHJlc3NcIjogZW1haWxJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJVc2VyIFR5cGVcIjogdXNlclR5cGVJbnB1dHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJEcml2ZXIgTGljZW5zZSBOdW1iZXJcIjogZHJpdmVyTGljZW5zZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkNhciBQbGF0ZSBOdW1iZXJcIjogY2FyUGxhdGVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJQYXNzd29yZFwiOiBwYXNzd29yZElucHV0VmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjb3VudERhdGE7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09ICdwdWJsaXNoLXJpZGUnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBpY2tVcExvY2F0aW9uSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaWNrVXBMb2NhdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkFkZHJlc3NJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc3RpbmF0aW9uQWRkcmVzcycpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzZW5nZXJDYXBhY2l0eUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2VuZ2VyQ2FwYWNpdHknKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpOyAvLyBHZXQgY3VycmVudCBkYXRlIGluIElTTyBmb3JtYXRcclxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxOSkucmVwbGFjZSgnVCcsICcgJyk7IC8vIFlZWVktTU0tREQgSEg6TU06U1NcclxuICAgICAgICAgICAgbGV0IHJpZGVEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJTdGFydCBSaWRlIFRpbWVcIjogZm9ybWF0dGVkRGF0ZSxcclxuICAgICAgICAgICAgICAgIFwiUGljayBVcCBMb2NhdGlvblwiOiBwaWNrVXBMb2NhdGlvbklucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkRlc3RpbmF0aW9uIEFkZHJlc3NcIjogZGVzdGluYXRpb25BZGRyZXNzSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiUGFzc2VuZ2VyIENhcGFjaXR5XCI6IHBhcnNlSW50KHBhc3NlbmdlckNhcGFjaXR5SW5wdXRWYWx1ZSksXHJcbiAgICAgICAgICAgICAgICBcIk51bVBhc3NlbmdlcnNcIjogMCxcclxuICAgICAgICAgICAgICAgIFwiU3RhdHVzXCI6IFwicHVibGlzaGVkXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJpZGVyIElEXCI6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2NvdW50SUQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByaWRlRGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGxheSBlcnJvciB3aGVuIGxvZ2luIGNyZWRlbnRpYWxzIGFyZSBpbmNvcnJlY3RcclxuICAgIGNvbnN0IGRpc3BsYXlMb2dpbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGxvZ2luRm9ybS5yZXNldCgpO1xyXG4gICAgICAgIGxvZ2luRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc3BsYXkgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgIGNvbnN0IGRpc3BsYXlTaWduVXBGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFjY291bnRGb3JtXCIgaWQ9XCJzaWduVXBGb3JtXCIgYWN0aW9uPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgPGgyPkNyZWF0ZSBhbiBhY2NvdW50PC9oMj5cclxuICAgICAgICAgICAgICAgIDwhLS0gRmlyc3ROYW1lIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBMYXN0TmFtZSBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gTW9iaWxlIE51bWJlciBJbnB1dC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibW9iaWxlTm9cIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1vYmlsZU5vXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gRW1haWwgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIFBhc3N3b3JkIElucHV0LS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNpZ25VcEJ0blwiPkNyZWF0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9naW5MaW5rXCI+SGF2ZSBhbiBhY2NvdW50PzxzcGFuIGNsYXNzPVwidW5kZXJsaW5lIGRpc3BsYXlMb2dpblwiPkxvZyBpbiBoZXJlPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5TG9naW5Gb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFjY291bnRGb3JtXCIgaWQ9XCJsb2dpbkZvcm1cIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+U2lnbiBJbjwvaDI+XHJcbiAgICAgICAgICAgICAgICA8IS0tIEVtYWlsIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBQYXNzd29yZCBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gbG9naW5CdG5cIj5TaWduIEluPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBsb2dpbkVycm9yIGhpZGVcIj5JbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25VcExpbmtcIj5Eb24ndCBoYXZlIGFuIGFjY291bnQ/PHNwYW4gY2xhc3M9XCJ1bmRlcmxpbmUgZGlzcGxheVNpZ25VcFwiPlNpZ24gdXAgaGVyZTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlckxvZ2dlZEluID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIEdldCB1c2VyIHR5cGUgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgY29uc3QgdXNlclR5cGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclR5cGUnKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1lbGVtZW50cycpLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWJldHdlZW4nO1xyXG4gICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgc2lnbk91dExpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cclxuICAgICAgICBpZiAodXNlclR5cGUgPT0gJ3Bhc3NlbmdlcicpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibGluayBtZW51LWxpbmsgc2VsZWN0IGFjdGl2ZS1saW5rXCIgZGF0YS1saW5rLWRlc3RpbmF0aW9uPVwicmlkZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwibWVudS1pY29uIHNlbGVjdFwiIG5hbWU9XCJjYXItc3BvcnQtb3V0bGluZVwiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cInJpZGVzXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmlkZXNcclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImxpbmsgbWVudS1saW5rIHNlbGVjdFwiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cInRyaXBzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cIm1lbnUtaWNvbiBzZWxlY3RcIiBuYW1lPVwibG9jYXRpb24tb3V0bGluZVwiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cInRyaXBzXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTXkgVHJpcHNcclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImxpbmsgbWVudS1saW5rIHNlbGVjdFwiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cInByb2ZpbGVcIj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cIm1lbnUtaWNvbiBzZWxlY3RcIiBuYW1lPVwicGVyc29uLW91dGxpbmVcIiBkYXRhLWxpbmstZGVzdGluYXRpb249XCJwcm9maWxlXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICByaWRlLmdldFJpZGVzKChyaWRlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUFsbFBhc3NlbmdlclJpZGVzKHJpZGVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJUeXBlID09ICdjYXIgb3duZXInKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJykuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImxpbmsgbWVudS1saW5rIHNlbGVjdCBhY3RpdmUtbGlua1wiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cImNhci1vd25lci1yaWRlc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJtZW51LWljb24gc2VsZWN0XCIgbmFtZT1cImNhci1zcG9ydC1vdXRsaW5lXCIgZGF0YS1saW5rLWRlc3RpbmF0aW9uPVwiY2FyLW93bmVyLXJpZGVzXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUmlkZXNcclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImxpbmsgbWVudS1saW5rIHNlbGVjdFwiIGRhdGEtbGluay1kZXN0aW5hdGlvbj1cInByb2ZpbGVcIj4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cIm1lbnUtaWNvbiBzZWxlY3RcIiBuYW1lPVwicGVyc29uLW91dGxpbmVcIiBkYXRhLWxpbmstZGVzdGluYXRpb249XCJwcm9maWxlXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICByaWRlLmdldENhck93bmVyUmlkZXMoKHJpZGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5QWxsQ2FyT3duZXJSaWRlcyhyaWRlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJMb2dnZWRPdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBET00gd2hlbiB1c2VyIGxvZ3Mgb3V0XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1lbGVtZW50cycpLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XHJcbiAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICBzaWduT3V0TGluay5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0TGluayA9ICh0YXJnZXQsIGRlc3RpbmF0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpbmtcIik7XHJcbiAgICAgICAgbGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbGlua1wiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vIENsaWNrIG9uIG1lbnUgb3IgcHJvamVjdCBsaW5rXHJcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsaW5rXCIpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWxpbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENsaWNrIG9uIG1lbnUgaWNvblxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtZW51LWljb25cIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1saW5rXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xpY2sgb24gaG9tZVxyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiA9PSAncmlkZXMnKSB7XHJcbiAgICAgICAgICAgIHJpZGUuZ2V0UmlkZXMoKHJpZGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5QWxsUGFzc2VuZ2VyUmlkZXMocmlkZXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgLy8gQ2xpY2sgb24gdmlldyBwcm9maWxlXHJcbiAgICAgICAgZWxzZSBpZiAoZGVzdGluYXRpb24gPT0gJ3Byb2ZpbGUnKSB7XHJcbiAgICAgICAgICAgIGFjY291bnQuZ2V0QWNjb3VudCgoYWNjb3VudERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9maWxlKGFjY291bnREYXRhKTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZXN0aW5hdGlvbiA9PSdjYXItb3duZXItcmlkZXMnKSB7XHJcbiAgICAgICAgICAgIHJpZGUuZ2V0Q2FyT3duZXJSaWRlcygocmlkZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlBbGxDYXJPd25lclJpZGVzKHJpZGVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheUFsbFBhc3NlbmdlclJpZGVzID0gKGRhdGEpID0+IHtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwic2VhcmNoLW91dGxpbmVcIiBpZD1cInN1Ym1pdFNlYXJjaFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInNlYXJjaFwiIGlkPVwic2VhcmNoLWJhclwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZGVzTGlzdFwiPjwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YS5SaWRlcyk7XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZGVzTGlzdCcpLmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlkZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5SaWRlIHN0YXJ0ZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJTdGFydCBSaWRlIFRpbWVcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+UGljay11cCBsb2NhdGlvbjogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlBpY2sgVXAgTG9jYXRpb25cIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGVzdGluYXRpb246IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJEZXN0aW5hdGlvbiBBZGRyZXNzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNhcGFjaXR5OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiUGFzc2VuZ2VyIENhcGFjaXR5XCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlBhc3NlbmdlcnM6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJOdW1QYXNzZW5nZXJzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNvbXBsZXRlZCBhdDogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIkNvbXBsZXRlZCBBdFwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DYW5jZWxsZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJDYW5jZWxsZWQgQXRcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+U3RhdHVzOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiU3RhdHVzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZW5yb2xCdG5cIiBkYXRhLWxpbmstcmlkZUlEPVwiJHtrZXl9XCIgZGF0YS1saW5rLXJpZGVEYXRhPScke0pTT04uc3RyaW5naWZ5KGRhdGEuUmlkZXNba2V5XSl9Jz5FbnJvbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImV4Y2VlZE1lc3NhZ2UgaGlkZVwiIGRhdGEtbGluay1pZD0nJHtrZXl9Jz5SaWRlIGlzIGZ1bGw8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5SaWRlTWVzc2FnZSBoaWRlXCIgZGF0YS1saW5rLWlkPScke2tleX0nPkFscmVhZHkgaW4gcmlkZTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5QWxsQ2FyT3duZXJSaWRlcyA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZGlzcGxheVB1Ymxpc2hSaWRlQnRuXCI+UHVibGlzaCBSaWRlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWRlc0xpc3RcIj48L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuXHJcbiAgICAgICAgLy8gSWYgbm8gcmlkZXMgYXJlIGZvdW5kIHdpdGggdGhlIFJpZGVyIElEXHJcbiAgICAgICAgaWYgKGRhdGEgPT0gXCJlbXB0eVwiKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MICs9IFwiXCI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YS5SaWRlcyk7XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZGVzTGlzdCcpLmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlkZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5SaWRlIHN0YXJ0ZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJTdGFydCBSaWRlIFRpbWVcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+UGljay11cCBsb2NhdGlvbjogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlBpY2sgVXAgTG9jYXRpb25cIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGVzdGluYXRpb246IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJEZXN0aW5hdGlvbiBBZGRyZXNzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNhcGFjaXR5OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiUGFzc2VuZ2VyIENhcGFjaXR5XCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlBhc3NlbmdlcnM6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJOdW1QYXNzZW5nZXJzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNvbXBsZXRlZCBhdDogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIkNvbXBsZXRlZCBBdFwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DYW5jZWxsZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJDYW5jZWxsZWQgQXRcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+U3RhdHVzOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiU3RhdHVzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc3RhcnRSaWRlQnRuXCIgZGF0YS1saW5rLXJpZGVJRD1cIiR7a2V5fVwiIGRhdGEtbGluay1yaWRlRGF0YT0nJHtKU09OLnN0cmluZ2lmeShkYXRhLlJpZGVzW2tleV0pfSc+U3RhcnQgUmlkZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhbmNlbFJpZGVCdG5cIiBkYXRhLWxpbmstcmlkZUlEPVwiJHtrZXl9XCIgZGF0YS1saW5rLXJpZGVEYXRhPScke0pTT04uc3RyaW5naWZ5KGRhdGEuUmlkZXNba2V5XSl9Jz5DYW5jZWwgUmlkZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImV4Y2VlZE1lc3NhZ2UgaGlkZVwiIGRhdGEtbGluay1pZD0nJHtrZXl9Jz5SaWRlIGlzIGZ1bGw8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9KTsgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFNlYXJjaGJhcklucHV0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaEJhcklucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcicpLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBzZWFyY2hCYXJJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlQcm9maWxlID0gKGFjY291bnQpID0+IHtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJhY2NvdW50Rm9ybVwiIGFjdGlvbj1cIiNcIj5cclxuICAgICAgICAgICAgICAgIDxoMj5IZWxsbyAke2FjY291bnRbJ0ZpcnN0IE5hbWUnXSArIFwiIFwiICsgYWNjb3VudFsnTGFzdCBOYW1lJ119PC9oMj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImZpcnN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydGaXJzdCBOYW1lJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0xhc3QgTmFtZSddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGFzdE5hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibW9iaWxlTm9cIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnTW9iaWxlIE51bWJlciddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibW9iaWxlTm9cIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydFbWFpbCBBZGRyZXNzJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydQYXNzd29yZCddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlclR5cGVTZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJwYXNzZW5nZXJcIiBuYW1lPVwic2VsZWN0VXNlclR5cGVcIiB2YWx1ZT1cInBhc3NlbmdlclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3NlbmdlclwiPlBhc3NlbmdlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiY2FyLW93bmVyXCIgbmFtZT1cInNlbGVjdFVzZXJUeXBlXCIgdmFsdWU9XCJjYXIgb3duZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXItb3duZXJcIj5DYXIgT3duZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhck93bmVyU2VsZWN0aW9uIGhpZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZHJpdmVyTGljZW5zZU51bWJlclwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydEcml2ZXIgTGljZW5zZSBOdW1iZXInXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJpdmVyTGljZW5zZU51bWJlclwiPkRyaXZlciBMaWNlbnNlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY2FyUGxhdGVOdW1iZXJcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnQ2FyIFBsYXRlIE51bWJlciddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXJQbGF0ZU51bWJlclwiPkNhciBQbGF0ZSBOdW1iZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlQnRuXCI+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8cD5BY2NvdW50IGNyZWF0ZWQgYXQ6IDxzcGFuIGNsYXNzPVwiYWNjQ3JlYXRlZERhdGVcIj4ke2FjY291bnRbJ0NyZWF0ZWQgQXQnXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkZWxBY2NOb3RlXCI+Tm90ZTogWW91IGNhbiBvbmx5IGRlbGV0ZSBhY2NvdW50IGlmIGl0IGlzIGEgeWVhciBvbGQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRlbEJ0blwiPkRlbGV0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxldGVNb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZT88L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsQWN0aW9uQnRuc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY29uZmlybURlbEJ0blwiPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhbmNlbERlbEJ0blwiPkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhc3NlbmdlclJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3NlbmdlcicpO1xyXG4gICAgICAgIGNvbnN0IGNhck93bmVyUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyLW93bmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChhY2NvdW50WydVc2VyIFR5cGUnXSA9PSAncGFzc2VuZ2VyJykge1xyXG4gICAgICAgICAgICBwYXNzZW5nZXJSYWRpby5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY2NvdW50WydVc2VyIFR5cGUnXSA9PSAnY2FyIG93bmVyJykge1xyXG4gICAgICAgICAgICBjYXJPd25lclJhZGlvLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNhck93bmVyRE9NKCdjYXItb3duZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdG9nZ2xlQ2FyT3duZXJET00gPSAodXNlclR5cGUpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyT3duZXJTZWxlY3Rpb24nKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodXNlclR5cGUgPT0gJ2Nhci1vd25lcicpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlNZXNzYWdlID0gKHR5cGUsIG91dGNvbWUpID0+IHtcclxuICAgICAgICBpZiAodHlwZSA9PSAnc2lnbnVwJyAmJiBvdXRjb21lID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2Ugc2lnblVwTWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlN1Y2Nlc3NmdWxseSBjcmVhdGVkIGFjY291bnQ8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ1bmRlcmxpbmUgcmV0dXJuTG9naW5cIj5SZXR1cm4gdG8gc2lnbiBpbjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdzaWdudXAnICYmIG91dGNvbWUgPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2Ugc2lnblVwTWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlJlZ2lzdHJhdGlvbiBlcnJvci4gVHJ5IGFnYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidW5kZXJsaW5lIHJldHVyblNpZ25VcFwiPlJldHVybjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodHlwZSA9PSAndXBkYXRlJyAmJiBvdXRjb21lID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cIm91dGNvbWUtbWVzc2FnZVwiPllvdXIgZGV0YWlscyBoYXZlIGJlZW4gdXBkYXRlZDwvcD5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICd1cGRhdGUnICYmIG91dGNvbWUgPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cIm91dGNvbWUtbWVzc2FnZVwiPkVycm9yIHVwZGF0aW5nIGFjY291bnQgZGV0YWlsczwvcD5gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ2RlbGV0ZScgJiYgb3V0Y29tZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2VcIj5Zb3VyIGFjY291bnQgaGFzIGJlZW4gZGVsZXRlZDwvcD4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICdkZWxldGUnICYmIG91dGNvbWUgPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cIm91dGNvbWUtbWVzc2FnZVwiPkFjY291bnQgaXMgbGVzcyB0aGFuIGEgeWVhciBvbGQ8L3A+J1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3B1Ymxpc2gnICYmIG91dGNvbWUgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwib3V0Y29tZS1tZXNzYWdlXCI+UmlkZSBoYXMgYmVlbiBwdWJsaXNoZWQuPC9wPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ3B1Ymxpc2gnICYmIG91dGNvbWUgPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cIm91dGNvbWUtbWVzc2FnZVwiPkFuIGVycm9yIG9jY3VyZWQuIFJpZGUgd2FzIG5vdCBwdWJsaXNoZWQuPC9wPmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlEZWxldGVNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlTW9kYWwnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlRGVsZXRlTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZU1vZGFsJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBleGNlZWRQYXNzZW5nZXJDYXBhY2l0eSA9IChyaWRlSUQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmV4Y2VlZE1lc3NhZ2VbZGF0YS1saW5rLWlkPVwiJHtyaWRlSUR9XCJdYCk7XHJcbiAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVBhc3NlbmdlckluUmlkZSA9IChyaWRlSUQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmluUmlkZU1lc3NhZ2VbZGF0YS1saW5rLWlkPVwiJHtyaWRlSUR9XCJdYCk7XHJcbiAgICAgICAgbWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVB1Ymxpc2hSaWRlRm9ybSA9ICgpID0+IHtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJyaWRlRm9ybVwiIGFjdGlvbj1cIiNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBpY2tVcExvY2F0aW9uXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwaWNrVXBMb2NhdGlvblwiPlBpY2sgVXAgTG9jYXRpb248L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzdGluYXRpb25BZGRyZXNzXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXN0aW5hdGlvbkFkZHJlc3NcIj5EZXN0aW5hdGlvbiBBZGRyZXNzPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc2VuZ2VyQ2FwYWNpdHlcIj5QYXNzZW5nZXIgQ2FwYWNpdHk8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJwYXNzZW5nZXJDYXBhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNFwiPjQ8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjVcIj41PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI2XCI+Njwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiN1wiPjc8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gcHVibGlzaFJpZGVCdG5cIj5QdWJsaXNoPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlU2lkZWJhcixcclxuICAgICAgICBnZXRGb3JtSW5wdXRzLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkVycm9yLFxyXG4gICAgICAgIGRpc3BsYXlTaWduVXBGb3JtLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkZvcm0sXHJcbiAgICAgICAgdXNlckxvZ2dlZEluLFxyXG4gICAgICAgIHVzZXJMb2dnZWRPdXQsXHJcbiAgICAgICAgc2VsZWN0TGluayxcclxuICAgICAgICB0b2dnbGVDYXJPd25lckRPTSxcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZSxcclxuICAgICAgICBkaXNwbGF5RGVsZXRlTW9kYWwsXHJcbiAgICAgICAgY2xvc2VEZWxldGVNb2RhbCxcclxuICAgICAgICBnZXRTZWFyY2hiYXJJbnB1dCxcclxuICAgICAgICBkaXNwbGF5QWxsUGFzc2VuZ2VyUmlkZXMsXHJcbiAgICAgICAgZXhjZWVkUGFzc2VuZ2VyQ2FwYWNpdHksXHJcbiAgICAgICAgZGlzcGxheVBhc3NlbmdlckluUmlkZSxcclxuICAgICAgICBkaXNwbGF5QWxsQ2FyT3duZXJSaWRlcyxcclxuICAgICAgICBkaXNwbGF5UHVibGlzaFJpZGVGb3JtLFxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IGFjY291bnQgZnJvbSAnLi9hY2NvdW50JztcclxuaW1wb3J0IHJpZGUgZnJvbSAnLi9yaWRlJztcclxuaW1wb3J0IHJpZGVQYXNzZW5nZXJzIGZyb20gJy4vcmlkZVBhc3NlbmdlcnMnO1xyXG5cclxuY29uc3QgaGFuZGxlciA9ICgoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHNpZGViYXJcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYW1idXJnZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZVNpZGViYXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9naW4gYnV0dG9uXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvZ2luQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBbZW1haWwsIHBhc3N3b3JkXSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdsb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudC5jaGVja0xvZ2luKGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5U2lnblVwJykgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuU2lnblVwJykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5U2lnblVwRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGxvZ2luIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5TG9naW4nKSB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuTG9naW4nKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlMb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lnbiBvdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnbk91dExpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUeXBlJyk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheUxvZ2luRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgZG9tLnVzZXJMb2dnZWRPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lkZWJhciBsaW5rc1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25MaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstZGVzdGluYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIGRvbS5zZWxlY3RMaW5rKGUudGFyZ2V0LCBkZXN0aW5hdGlvbkxpbmspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZWxlY3QgcGFzc2VuZ2VyIG9yIGNhciBvd25lciByYWRpbyBpbiBwcm9maWxlXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnY2FyLW93bmVyJyB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAncGFzc2VuZ2VyJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZUNhck93bmVyRE9NKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAgIC8vIENyZWF0YSBhY2NvdW50XHJcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnblVwQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdzaWduVXAnKTtcclxuICAgICAgICAgICAgICAgIGFjY291bnQuY3JlYXRlQWNjb3VudChhY2NvdW50RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhY2NvdW50XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VwZGF0ZUJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBkb20uZ2V0Rm9ybUlucHV0cygndXBkYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50LnVwZGF0ZUFjY291bnQoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGRlbGV0ZSBhY2NvdW50IG1vZGFsXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpcm0gZGVsZXRlIGFjY291bnQgaW4gbW9kYWxcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybURlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgYWNjb3VudCB3aXRoIHJldHJpZXZlZCBsb2NhbCBzdG9yYWdlIGFjY291bnQgSURcclxuICAgICAgICAgICAgICAgIGFjY291bnQuZGVsZXRlQWNjb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbG9zZSBkZWxldGUgYWNjb3VudCBtb2RhbFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWxEZWxCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgZG9tLmNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VibWl0IHNlYXJjaCBiYXIgaW5wdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnc3VibWl0U2VhcmNoJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaGJhcklucHV0ID0gZG9tLmdldFNlYXJjaGJhcklucHV0KCk7XHJcbiAgICAgICAgICAgICAgICByaWRlLnNlYXJjaFJpZGUoc2VhcmNoYmFySW5wdXQsIChyaWRlRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5QWxsUGFzc2VuZ2VyUmlkZXMocmlkZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFBhc3NlbmdlciBlbnJvbCByaWRlXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Vucm9sQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJpZGVJRCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLXJpZGVpZCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmlkZVBhc3NlbmdlckRhdGEgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1yaWRlZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJpZGVQYXNzZW5nZXJEYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdOdW1QYXNzZW5nZXJzID0gZGF0YVtcIk51bVBhc3NlbmdlcnNcIl0gKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiUGFzc2VuZ2VyIENhcGFjaXR5XCI6IGRhdGFbXCJQYXNzZW5nZXIgQ2FwYWNpdHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJOdW1QYXNzZW5nZXJzXCI6IG5ld051bVBhc3NlbmdlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTdGF0dXNcIjogJ3N0YXJ0ZWQnXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbXCJTdGF0dXNcIl0gPT0gJ3B1Ymxpc2hlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY2NvdW50SUQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlkZVBhc3NlbmdlcnMucGFzc2VuZ2VySW5SaWRlKHJpZGVJRCwgYWNjb3VudElELCBmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXNzZW5nZXIgZm91bmQgaW4gdGhlIHJpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5UGFzc2VuZ2VySW5SaWRlKHJpZGVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXNzZW5nZXIgbm90IGZvdW5kIGluIHRoZSByaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWRlLnVwZGF0ZVJpZGUocmlkZUlELCB1cGRhdGVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZGVQYXNzZW5nZXJzLmVucm9sUmlkZShyaWRlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFbXCJTdGF0dXNcIl0gPT0gJ3N0YXJ0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmV4Y2VlZFBhc3NlbmdlckNhcGFjaXR5KHJpZGVJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgZm9ybSBmb3IgcHVibGlzaGluZyByaWRlXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc3BsYXlQdWJsaXNoUmlkZUJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheVB1Ymxpc2hSaWRlRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQdWJsaXNoIHJpZGVcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHVibGlzaFJpZGVCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJpZGVEYXRhID0gZG9tLmdldEZvcm1JbnB1dHMoJ3B1Ymxpc2gtcmlkZScpO1xyXG4gICAgICAgICAgICAgICAgcmlkZS5jcmVhdGVSaWRlKHJpZGVEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsUmlkZUJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlkZUlEID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaWQnKTtcclxuICAgICAgICAgICAgICAgIHJpZGVQYXNzZW5nZXJzLmRlbFJpZGVQYXNzZW5nZXIocmlkZUlEKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGhhbmRsZUNsaWNrcyB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmNvbnN0IHJpZGUgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL3JpZGVzJztcclxuXHJcbiAgICBjb25zdCBnZXRSaWRlcyA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlYXJjaFJpZGUgPSAoc2VhcmNoSW5wdXQsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/c2VhcmNoPSR7c2VhcmNoSW5wdXR9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCByaWRlRGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHJpZGVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhbmdlIHJpZGUgc3RhdHVzIFxyXG4gICAgY29uc3QgdXBkYXRlUmlkZSA9IChyaWRlSUQsIHJpZGVEYXRhKSA9PiB7XHJcbiAgICAgICAgbGV0IHVwZGF0ZVVSTCA9IHVybCArIFwiL1wiICsgcmlkZUlEO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BVVCcsIHVwZGF0ZVVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgYWxsIHRyaXBzIGFnYWluXHJcbiAgICAgICAgICAgICAgICByaWRlLmdldFJpZGVzKChyaWRlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5QWxsUGFzc2VuZ2VyUmlkZXMocmlkZXMpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KHJpZGVEYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0Q2FyT3duZXJSaWRlcyA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJpZGVySUQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJyk7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/cmlkZXJJRD0ke3JpZGVySUR9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByaWRlRGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyaWRlRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgICBjYWxsYmFjayhcImVtcHR5XCIpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlUmlkZSA9IChyaWRlRGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBjcmVhdGVVUkwgPSB1cmwgKyBcIi9cIiArIFwiaWRcIjtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BPU1QnLCBjcmVhdGVVUkwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDEpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgcmlkZSBjcmVhdGlvbiBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ3B1Ymxpc2gnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkocmlkZURhdGEpKTtcclxuICAgICAgICAvLyBJZiByaWRlIGNyZWF0aW9uIGZhaWxzXHJcbiAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdwdWJsaXNoJywgJ2Vycm9yJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRSaWRlcyxcclxuICAgICAgICBzZWFyY2hSaWRlLFxyXG4gICAgICAgIHVwZGF0ZVJpZGUsXHJcbiAgICAgICAgZ2V0Q2FyT3duZXJSaWRlcyxcclxuICAgICAgICBjcmVhdGVSaWRlXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByaWRlOyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuY29uc3QgcmlkZVBhc3NlbmdlcnMgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL3JpZGVQYXNzZW5nZXJzJztcclxuXHJcbiAgICAvLyBBZGQgYSBuZXcgcGFzc2VuZ2VyIHRvIHRoZSByaWRlIHdpdGggdGhlIHJpZGUgSURcclxuICAgIGNvbnN0IGVucm9sUmlkZSA9IChyaWRlSUQpID0+IHtcclxuICAgICAgICBjb25zdCBhY2NvdW50SUQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJylcclxuICAgICAgICBsZXQgcmlkZVBhc3NlbmdlckRhdGEgPSB7XHJcbiAgICAgICAgICAgIFwiUmlkZSBJRFwiOiByaWRlSUQsXHJcbiAgICAgICAgICAgIFwiUGFzc2VuZ2VyIElEXCI6IGFjY291bnRJRFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNyZWF0ZVVSTCA9IHVybCArIFwiL1wiICsgcmlkZUlEICsgXCIvXCIgKyBhY2NvdW50SUQ7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgY3JlYXRlVVJMKTtcclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAxKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vZG9tLmRpc3BsYXlNZXNzYWdlKCdjcmVhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkocmlkZVBhc3NlbmdlckRhdGEpKTtcclxuICAgICAgICAvL2RvbS5kaXNwbGF5TWVzc2FnZSgnY3JlYXRlJywgJ2Vycm9yJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFzc2VuZ2VySW5SaWRlID0gKHJpZGVJRCwgcGFzc2VuZ2VySUQsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/cmlkZUlEPSR7cmlkZUlEfSZwYXNzZW5nZXJJRD0ke3Bhc3NlbmdlcklEfWA7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHNlYXJjaFVSTCk7XHJcbiAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBJZiBub3QgZm91bmRcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBJZiBmb3VuZFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsUmlkZVBhc3NlbmdlciA9IChyaWRlSUQpID0+IHtcclxuICAgICAgICBsZXQgZGVsZXRlVVJMID0gdXJsICsgXCIvXCIgKyByaWRlSUQ7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdERUxFVEUnLCBkZWxldGVVUkwpO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgLy8gRGlzcGxheSBlcnJvclxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbGVkXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBlbnJvbFJpZGUsXHJcbiAgICAgICAgcGFzc2VuZ2VySW5SaWRlLFxyXG4gICAgICAgIGRlbFJpZGVQYXNzZW5nZXIsXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByaWRlUGFzc2VuZ2VyczsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBoYW5kbGVyIGZyb20gJy4vaGFuZGxlcic7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuaGFuZGxlci5oYW5kbGVDbGlja3MoKTtcclxuXHJcbi8vIElmIG5vdCBsb2dnZWQgaW4sIHNob3cgbG9naW4gZm9ybVxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpKSB7XHJcbiAgICBkb20udXNlckxvZ2dlZEluKCk7XHJcbn0gXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9