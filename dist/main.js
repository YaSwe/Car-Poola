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
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('create', 'success');
                return;
            } 
        }
        request.send(JSON.stringify(accountData));
        _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayMessage('create', 'error');
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
        // Display error
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
            const currentDate = new Date().toISOString; // Get current date in ISO format
            
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
                "Created At": currentDate
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
            _ride__WEBPACK_IMPORTED_MODULE_1__["default"].getRides((rides) => {
                displayTrips(rides);
            })
        } 
        else if (userType == 'car owner') {
            content.innerHTML = `
            car owner
            `;
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
                displayTrips(rides);
            })
        } 
        // Click on view profile
        else if (destination == 'profile') {
            _account__WEBPACK_IMPORTED_MODULE_0__["default"].getAccount((accountData) => {
                displayProfile(accountData);
            }); 
        }
    }

    const displayTrips = (data) => {
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
                        <button class="btn enrolBtn">Enrol</button>
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
        if (type == 'create' && outcome == 'success') {
            content.innerHTML = `
                <div class="outcome-message signUpMessage">
                    <p>Successfully created account</p>
                    <p class="underline returnLogin">Return to sign in</p>
                </div>
            `;
        }
        else if (type == 'create' && outcome == 'error') {
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
    }

    const displayDeleteModal = () => {
        document.querySelector('.deleteModal').classList.add('active');
        document.querySelector('.overlay').classList.add('active');
    }

    const closeDeleteModal = () => {
        document.querySelector('.deleteModal').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
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
        displayTrips,
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
                    _dom__WEBPACK_IMPORTED_MODULE_0__["default"].displayTrips(rideData);
                });
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

    return {
        getRides,
        searchRide,
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ride);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sWUFBWSxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0Q0FBRztBQUNYO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQ0FBa0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQUc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0Esb0JBQW9CLDRDQUFHO0FBQ3ZCLG9CQUFvQiw0Q0FBRztBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNENBQUc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEhTO0FBQ047QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOZ0M7QUFDUjtBQUN4QjtBQUNBLGdEQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0Q0FBRztBQUNQO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9hY2NvdW50LmpzIiwid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL3JpZGUuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuY29uc3QgYWNjb3VudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvYWNjb3VudHMnO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUFjY291bnQgPSAoYWNjb3VudERhdGEpID0+IHtcclxuICAgICAgICBsZXQgY3JlYXRlVVJMID0gdXJsICsgXCIvXCIgKyBcImlkXCI7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgY3JlYXRlVVJMKTtcclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGFjY291bnQgY3JlYXRpb24gc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdjcmVhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ2NyZWF0ZScsICdlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoZWNrTG9naW4gPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/ZW1haWw9JHtlbWFpbH0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBzZWFyY2hVUkwpO1xyXG4gICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIGFyZSBmb3VuZFxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY291bnRJRCcsIGFjY291bnREYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyVHlwZScsIGFjY291bnREYXRhLnVzZXJUeXBlKTtcclxuICAgICAgICAgICAgICAgIGRvbS51c2VyTG9nZ2VkSW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIG5vdCBmb3VuZFxyXG4gICAgICAgIGRvbS5kaXNwbGF5TG9naW5FcnJvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRBY2NvdW50ID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGAvJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJyl9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soYWNjb3VudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVBY2NvdW50ID0gKGFjY291bnREYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudElEID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgIGxldCB1cGRhdGVVUkwgPSB1cmwgKyBcIi9cIiArIGFjY291bnRJRDtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BVVCcsIHVwZGF0ZVVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIG5ldyB1c2VyIHR5cGUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJUeXBlJywgYWNjb3VudERhdGFbJ1VzZXIgVHlwZSddKTtcclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgYWNjb3VudCB1cGRhdGUgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCd1cGRhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICAvLyBEaXNwbGF5IGVycm9yXHJcbiAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCd1cGRhdGUnLCAnZXJyb3InKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWxldGVBY2NvdW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRJRCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2NvdW50SUQnKTtcclxuICAgICAgICBsZXQgZGVsZXRlVVJMID0gdXJsICsgXCIvXCIgKyBhY2NvdW50SUQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0RFTEVURScsIGRlbGV0ZVVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYWNjb3VudCBJRCBhbmQgdXNlciB0eXBlIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2NvdW50SUQnKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyVHlwZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgYWNjb3VudCBkZWxldGlvbiBzdWNjZXNzXHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ2RlbGV0ZScsICdzdWNjZXNzJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyA1IHNlY29uZCBkZWxheSBhbmQgcmV0dXJuIHRvIGxvZ2luIGZvcm1cclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheUxvZ2luRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS51c2VyTG9nZ2VkT3V0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgLy8gRGlzcGxheSBlcnJvclxyXG4gICAgICAgIGRvbS5kaXNwbGF5TWVzc2FnZSgnZGVsZXRlJywgJ2Vycm9yJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVBY2NvdW50LFxyXG4gICAgICAgIGNoZWNrTG9naW4sXHJcbiAgICAgICAgZ2V0QWNjb3VudCxcclxuICAgICAgICB1cGRhdGVBY2NvdW50LFxyXG4gICAgICAgIGRlbGV0ZUFjY291bnQsXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY2NvdW50O1xyXG4iLCJpbXBvcnQgYWNjb3VudCBmcm9tICcuL2FjY291bnQnO1xyXG5pbXBvcnQgcmlkZSBmcm9tICcuL3JpZGUnO1xyXG5cclxuY29uc3QgZG9tID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKTtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xyXG4gICAgY29uc3Qgc2lnbk91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbk91dExpbmsnKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5cclxuICAgIGNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbkZvcm0nKTtcclxuICAgIGNvbnN0IGxvZ2luRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5FcnJvcicpO1xyXG5cclxuICAgIC8vIFRvZ2dsZSBzaWRlYmFyXHJcbiAgICBjb25zdCB0b2dnbGVTaWRlYmFyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0cmlldmUgbG9naW4gaW5wdXRzIGFuZCBjaGVjayBpbnB1dHNcclxuICAgIGNvbnN0IGdldEZvcm1JbnB1dHMgPSAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnbG9naW4nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZElucHV0VmFsdWU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5wdXRzIGFyZSBub3QgZW1wdHlcclxuICAgICAgICAgICAgcmV0dXJuIFtlbWFpbElucHV0VmFsdWUsIHBhc3N3b3JkSW5wdXRWYWx1ZV07ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gJ3NpZ25VcCcpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhc3ROYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU5vSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVObycpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbElucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nOyAvLyBHZXQgY3VycmVudCBkYXRlIGluIElTTyBmb3JtYXRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBKU09OXHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwiRmlyc3QgTmFtZVwiOiBmaXJzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJMYXN0IE5hbWVcIjogbGFzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJNb2JpbGUgTnVtYmVyXCI6IG1vYmlsZU5vSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiRW1haWwgQWRkcmVzc1wiOiBlbWFpbElucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlVzZXIgVHlwZVwiOiAncGFzc2VuZ2VyJyxcclxuICAgICAgICAgICAgICAgIFwiRHJpdmVyIExpY2Vuc2UgTnVtYmVyXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIkNhciBQbGF0ZSBOdW1iZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiUGFzc3dvcmRcIjogcGFzc3dvcmRJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJDcmVhdGVkIEF0XCI6IGN1cnJlbnREYXRlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFjY291bnREYXRhOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpcnN0TmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0TmFtZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlTm9JbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZU5vJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZElucHV0VmFsdWU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyVHlwZUlucHV0dmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwic2VsZWN0VXNlclR5cGVcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZHJpdmVyTGljZW5zZUlucHV0VmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgY2FyUGxhdGVJbnB1dFZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGNhciBvd25lciByYWRpbyBpcyBzZWxlY3RlZCwgcmV0cmlldmUgdGhlIGNhciBvd25lciBmb3JtIGlucHV0c1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RyaXZlckxpY2Vuc2VOdW1iZXInKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhclBsYXRlSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJQbGF0ZU51bWJlcicpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBwYXNzZW5nZXIsIHJlbW92ZSBkcml2ZXIgbGljZW5zZSBudW1iZXIgJiBjYXIgcGxhdGUgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmICh1c2VyVHlwZUlucHV0dmFsdWUgPT0gJ3Bhc3NlbmdlcicpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGNhclBsYXRlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBKU09OXHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwiRmlyc3QgTmFtZVwiOiBmaXJzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJMYXN0IE5hbWVcIjogbGFzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJNb2JpbGUgTnVtYmVyXCI6IG1vYmlsZU5vSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiRW1haWwgQWRkcmVzc1wiOiBlbWFpbElucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlVzZXIgVHlwZVwiOiB1c2VyVHlwZUlucHV0dmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkRyaXZlciBMaWNlbnNlIE51bWJlclwiOiBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiQ2FyIFBsYXRlIE51bWJlclwiOiBjYXJQbGF0ZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlBhc3N3b3JkXCI6IHBhc3N3b3JkSW5wdXRWYWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2NvdW50RGF0YTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNwbGF5IGVycm9yIHdoZW4gbG9naW4gY3JlZGVudGlhbHMgYXJlIGluY29ycmVjdFxyXG4gICAgY29uc3QgZGlzcGxheUxvZ2luRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgbG9naW5Gb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgbG9naW5FcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGxheSByZWdpc3RyYXRpb24gZm9ybVxyXG4gICAgY29uc3QgZGlzcGxheVNpZ25VcEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiYWNjb3VudEZvcm1cIiBpZD1cInNpZ25VcEZvcm1cIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+Q3JlYXRlIGFuIGFjY291bnQ8L2gyPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBGaXJzdE5hbWUgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIExhc3ROYW1lIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBNb2JpbGUgTnVtYmVyIElucHV0LS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtb2JpbGVOb1wiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibW9iaWxlTm9cIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBFbWFpbCBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gUGFzc3dvcmQgSW5wdXQtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2lnblVwQnRuXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dpbkxpbmtcIj5IYXZlIGFuIGFjY291bnQ/PHNwYW4gY2xhc3M9XCJ1bmRlcmxpbmUgZGlzcGxheUxvZ2luXCI+TG9nIGluIGhlcmU8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlMb2dpbkZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiYWNjb3VudEZvcm1cIiBpZD1cImxvZ2luRm9ybVwiIGFjdGlvbj1cIiNcIj5cclxuICAgICAgICAgICAgICAgIDxoMj5TaWduIEluPC9oMj5cclxuICAgICAgICAgICAgICAgIDwhLS0gRW1haWwgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIFBhc3N3b3JkIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBsb2dpbkJ0blwiPlNpZ24gSW48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGxvZ2luRXJyb3IgaGlkZVwiPkludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnblVwTGlua1wiPkRvbid0IGhhdmUgYW4gYWNjb3VudD88c3BhbiBjbGFzcz1cInVuZGVybGluZSBkaXNwbGF5U2lnblVwXCI+U2lnbiB1cCBoZXJlPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyTG9nZ2VkSW4gPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gR2V0IHVzZXIgdHlwZSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICBjb25zdCB1c2VyVHlwZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVHlwZScpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWVsZW1lbnRzJykuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtYmV0d2Vlbic7XHJcbiAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICBzaWduT3V0TGluay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyVHlwZSA9PSAncGFzc2VuZ2VyJykge1xyXG4gICAgICAgICAgICByaWRlLmdldFJpZGVzKChyaWRlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRyaXBzKHJpZGVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJUeXBlID09ICdjYXIgb3duZXInKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICBjYXIgb3duZXJcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlckxvZ2dlZE91dCA9ICgpID0+IHtcclxuICAgICAgICAvLyBDaGFuZ2UgdGhlIERPTSB3aGVuIHVzZXIgbG9ncyBvdXRcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWVsZW1lbnRzJykuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcclxuICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgIHNpZ25PdXRMaW5rLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RMaW5rID0gKHRhcmdldCwgZGVzdGluYXRpb24pID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlua1wiKTtcclxuICAgICAgICBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1saW5rXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy8gQ2xpY2sgb24gbWVudSBvciBwcm9qZWN0IGxpbmtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxpbmtcIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbGlua1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2xpY2sgb24gbWVudSBpY29uXHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtaWNvblwiKSkge1xyXG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWxpbmtcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbGljayBvbiBob21lXHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uID09ICdyaWRlcycpIHtcclxuICAgICAgICAgICAgcmlkZS5nZXRSaWRlcygocmlkZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUcmlwcyhyaWRlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBcclxuICAgICAgICAvLyBDbGljayBvbiB2aWV3IHByb2ZpbGVcclxuICAgICAgICBlbHNlIGlmIChkZXN0aW5hdGlvbiA9PSAncHJvZmlsZScpIHtcclxuICAgICAgICAgICAgYWNjb3VudC5nZXRBY2NvdW50KChhY2NvdW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVByb2ZpbGUoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUcmlwcyA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8aW9uLWljb24gbmFtZT1cInNlYXJjaC1vdXRsaW5lXCIgaWQ9XCJzdWJtaXRTZWFyY2hcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBpZD1cInNlYXJjaC1iYXJcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWRlc0xpc3RcIj48L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEuUmlkZXMpO1xyXG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWRlc0xpc3QnKS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZGUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+UmlkZSBzdGFydGVkIGF0OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiU3RhcnQgUmlkZSBUaW1lXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlBpY2stdXAgbG9jYXRpb246IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJQaWNrIFVwIExvY2F0aW9uXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkRlc3RpbmF0aW9uOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiRGVzdGluYXRpb24gQWRkcmVzc1wiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DYXBhY2l0eTogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlBhc3NlbmdlciBDYXBhY2l0eVwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5QYXNzZW5nZXJzOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiTnVtUGFzc2VuZ2Vyc1wiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5Db21wbGV0ZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJDb21wbGV0ZWQgQXRcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q2FuY2VsbGVkIGF0OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiQ2FuY2VsbGVkIEF0XCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlN0YXR1czogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlN0YXR1c1wiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGVucm9sQnRuXCI+RW5yb2w8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRTZWFyY2hiYXJJbnB1dCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBzZWFyY2hCYXJJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1iYXInKS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gc2VhcmNoQmFySW5wdXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5UHJvZmlsZSA9IChhY2NvdW50KSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiYWNjb3VudEZvcm1cIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+SGVsbG8gJHthY2NvdW50WydGaXJzdCBOYW1lJ10gKyBcIiBcIiArIGFjY291bnRbJ0xhc3QgTmFtZSddfTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnRmlyc3QgTmFtZSddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsYXN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydMYXN0IE5hbWUnXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm1vYmlsZU5vXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ01vYmlsZSBOdW1iZXInXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1vYmlsZU5vXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnRW1haWwgQWRkcmVzcyddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnUGFzc3dvcmQnXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVzZXJUeXBlU2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwicGFzc2VuZ2VyXCIgbmFtZT1cInNlbGVjdFVzZXJUeXBlXCIgdmFsdWU9XCJwYXNzZW5nZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzZW5nZXJcIj5QYXNzZW5nZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImNhci1vd25lclwiIG5hbWU9XCJzZWxlY3RVc2VyVHlwZVwiIHZhbHVlPVwiY2FyIG93bmVyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2FyLW93bmVyXCI+Q2FyIE93bmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJPd25lclNlbGVjdGlvbiBoaWRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRyaXZlckxpY2Vuc2VOdW1iZXJcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnRHJpdmVyIExpY2Vuc2UgTnVtYmVyJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRyaXZlckxpY2Vuc2VOdW1iZXJcIj5Ecml2ZXIgTGljZW5zZSBOdW1iZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNhclBsYXRlTnVtYmVyXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0NhciBQbGF0ZSBOdW1iZXInXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2FyUGxhdGVOdW1iZXJcIj5DYXIgUGxhdGUgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHVwZGF0ZUJ0blwiPlVwZGF0ZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHA+QWNjb3VudCBjcmVhdGVkIGF0OiA8c3BhbiBjbGFzcz1cImFjY0NyZWF0ZWREYXRlXCI+JHthY2NvdW50WydDcmVhdGVkIEF0J119PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZGVsQWNjTm90ZVwiPk5vdGU6IFlvdSBjYW4gb25seSBkZWxldGUgYWNjb3VudCBpZiBpdCBpcyBhIHllYXIgb2xkPC9wPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBkZWxCdG5cIj5EZWxldGUgQWNjb3VudDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlTW9kYWxcIj5cclxuICAgICAgICAgICAgICAgIDxwPkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGU/PC9wPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbEFjdGlvbkJ0bnNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNvbmZpcm1EZWxCdG5cIj5Db25maXJtPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjYW5jZWxEZWxCdG5cIj5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb25zdCBwYXNzZW5nZXJSYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzZW5nZXInKTtcclxuICAgICAgICBjb25zdCBjYXJPd25lclJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nhci1vd25lcicpO1xyXG5cclxuICAgICAgICBpZiAoYWNjb3VudFsnVXNlciBUeXBlJ10gPT0gJ3Bhc3NlbmdlcicpIHtcclxuICAgICAgICAgICAgcGFzc2VuZ2VyUmFkaW8uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWNjb3VudFsnVXNlciBUeXBlJ10gPT0gJ2NhciBvd25lcicpIHtcclxuICAgICAgICAgICAgY2FyT3duZXJSYWRpby5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG4gICAgICAgICAgICB0b2dnbGVDYXJPd25lckRPTSgnY2FyLW93bmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRvZ2dsZUNhck93bmVyRE9NID0gKHVzZXJUeXBlKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHVzZXJUeXBlID09ICdjYXItb3duZXInKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJPd25lclNlbGVjdGlvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJPd25lclNlbGVjdGlvbicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5TWVzc2FnZSA9ICh0eXBlLCBvdXRjb21lKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ2NyZWF0ZScgJiYgb3V0Y29tZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0Y29tZS1tZXNzYWdlIHNpZ25VcE1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5TdWNjZXNzZnVsbHkgY3JlYXRlZCBhY2NvdW50PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidW5kZXJsaW5lIHJldHVybkxvZ2luXCI+UmV0dXJuIHRvIHNpZ24gaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnY3JlYXRlJyAmJiBvdXRjb21lID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3V0Y29tZS1tZXNzYWdlIHNpZ25VcE1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5SZWdpc3RyYXRpb24gZXJyb3IuIFRyeSBhZ2FpbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInVuZGVybGluZSByZXR1cm5TaWduVXBcIj5SZXR1cm48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3VwZGF0ZScgJiYgb3V0Y29tZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2VcIj5Zb3VyIGRldGFpbHMgaGF2ZSBiZWVuIHVwZGF0ZWQ8L3A+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAndXBkYXRlJyAmJiBvdXRjb21lID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2VcIj5FcnJvciB1cGRhdGluZyBhY2NvdW50IGRldGFpbHM8L3A+YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlID09ICdkZWxldGUnICYmIG91dGNvbWUgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwib3V0Y29tZS1tZXNzYWdlXCI+WW91ciBhY2NvdW50IGhhcyBiZWVuIGRlbGV0ZWQ8L3A+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnZGVsZXRlJyAmJiBvdXRjb21lID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJvdXRjb21lLW1lc3NhZ2VcIj5BY2NvdW50IGlzIGxlc3MgdGhhbiBhIHllYXIgb2xkPC9wPidcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheURlbGV0ZU1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVNb2RhbCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlTW9kYWwnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlU2lkZWJhcixcclxuICAgICAgICBnZXRGb3JtSW5wdXRzLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkVycm9yLFxyXG4gICAgICAgIGRpc3BsYXlTaWduVXBGb3JtLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkZvcm0sXHJcbiAgICAgICAgdXNlckxvZ2dlZEluLFxyXG4gICAgICAgIHVzZXJMb2dnZWRPdXQsXHJcbiAgICAgICAgc2VsZWN0TGluayxcclxuICAgICAgICB0b2dnbGVDYXJPd25lckRPTSxcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZSxcclxuICAgICAgICBkaXNwbGF5RGVsZXRlTW9kYWwsXHJcbiAgICAgICAgY2xvc2VEZWxldGVNb2RhbCxcclxuICAgICAgICBnZXRTZWFyY2hiYXJJbnB1dCxcclxuICAgICAgICBkaXNwbGF5VHJpcHMsXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgYWNjb3VudCBmcm9tICcuL2FjY291bnQnO1xyXG5pbXBvcnQgcmlkZSBmcm9tICcuL3JpZGUnO1xyXG5cclxuY29uc3QgaGFuZGxlciA9ICgoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHNpZGViYXJcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYW1idXJnZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZVNpZGViYXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9naW4gYnV0dG9uXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvZ2luQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBbZW1haWwsIHBhc3N3b3JkXSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdsb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudC5jaGVja0xvZ2luKGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5U2lnblVwJykgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuU2lnblVwJykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5U2lnblVwRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGxvZ2luIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5TG9naW4nKSB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuTG9naW4nKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlMb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lnbiBvdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnbk91dExpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUeXBlJyk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheUxvZ2luRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgZG9tLnVzZXJMb2dnZWRPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lkZWJhciBsaW5rc1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25MaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstZGVzdGluYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIGRvbS5zZWxlY3RMaW5rKGUudGFyZ2V0LCBkZXN0aW5hdGlvbkxpbmspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZWxlY3QgcGFzc2VuZ2VyIG9yIGNhciBvd25lciByYWRpbyBpbiBwcm9maWxlXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnY2FyLW93bmVyJyB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAncGFzc2VuZ2VyJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZUNhck93bmVyRE9NKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAgIC8vIENyZWF0YSBhY2NvdW50XHJcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnblVwQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdzaWduVXAnKTtcclxuICAgICAgICAgICAgICAgIGFjY291bnQuY3JlYXRlQWNjb3VudChhY2NvdW50RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhY2NvdW50XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VwZGF0ZUJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBkb20uZ2V0Rm9ybUlucHV0cygndXBkYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50LnVwZGF0ZUFjY291bnQoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGRlbGV0ZSBhY2NvdW50IG1vZGFsXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpcm0gZGVsZXRlIGFjY291bnQgaW4gbW9kYWxcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybURlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgYWNjb3VudCB3aXRoIHJldHJpZXZlZCBsb2NhbCBzdG9yYWdlIGFjY291bnQgSURcclxuICAgICAgICAgICAgICAgIGFjY291bnQuZGVsZXRlQWNjb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbG9zZSBkZWxldGUgYWNjb3VudCBtb2RhbFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWxEZWxCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgZG9tLmNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VibWl0IHNlYXJjaCBiYXIgaW5wdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnc3VibWl0U2VhcmNoJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaGJhcklucHV0ID0gZG9tLmdldFNlYXJjaGJhcklucHV0KCk7XHJcbiAgICAgICAgICAgICAgICByaWRlLnNlYXJjaFJpZGUoc2VhcmNoYmFySW5wdXQsIChyaWRlRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5VHJpcHMocmlkZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGhhbmRsZUNsaWNrcyB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiLCJjb25zdCByaWRlID0gKCgpID0+IHtcclxuICAgIGxldCB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS92MS9yaWRlcyc7XHJcblxyXG4gICAgY29uc3QgZ2V0UmlkZXMgPSAoY2FsbGJhY2spID0+IHtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWFyY2hSaWRlID0gKHNlYXJjaElucHV0LCBjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGxldCBzZWFyY2hVUkwgPSB1cmwgKyBgP3NlYXJjaD0ke3NlYXJjaElucHV0fWA7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHNlYXJjaFVSTCk7XHJcbiAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgcmlkZURhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhyaWRlRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0UmlkZXMsXHJcbiAgICAgICAgc2VhcmNoUmlkZSxcclxuICAgIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJpZGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgaGFuZGxlciBmcm9tICcuL2hhbmRsZXInO1xyXG5pbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmhhbmRsZXIuaGFuZGxlQ2xpY2tzKCk7XHJcblxyXG4vLyBJZiBub3QgbG9nZ2VkIGluLCBzaG93IGxvZ2luIGZvcm1cclxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2NvdW50SUQnKSkge1xyXG4gICAgZG9tLnVzZXJMb2dnZWRJbigpO1xyXG59IFxyXG5cclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==