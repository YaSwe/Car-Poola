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


const Account = (accountID, firstName, lastName, mobileNo, email, driverLicenseNumber, carPlateNumber, password) => {
    undefined.accountID = accountID;
    undefined.firstName = firstName;
    undefined.lastName = lastName;
    undefined.mobileNo = mobileNo;
    undefined.email = email;
    undefined.driverLicenseNumber = driverLicenseNumber;
    undefined.carPlateNumber = carPlateNumber;
    undefined.password = password;
}

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

        console.log(JSON.stringify(accountData));
         
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

    return {
        createAccount,
        checkLogin,
        getAccount,
        updateAccount,
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
            
            // Create JSON
            let accountData = {
                "First Name": firstNameInputValue,
                "Last Name": lastNameInputValue,
                "Mobile Number": mobileNoInputValue,
                "Email Address": emailInputValue,
                "User Type": 'passenger',
                "Driver License Number": "",
                "Car Plate Number": "",
                "Password": passwordInputValue
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
                <div class="signUpMessage">
                    <p>Successfully created account</p>
                    <p class="underline returnLogin">Return to sign in</p>
                </div>
            `;
        }
        else if (type == 'create' && outcome == 'error') {
            content.innerHTML = `
                <div class="signUpMessage">
                    <p>Registration error. Try again</p>
                    <p class="underline returnSignUp">Return</p>
                </div>
            `;
        }
        
        if (type == 'update' && outcome == 'success') {
            content.innerHTML = `Your details have been updated`;
        }
        else if (type == 'update' && outcome == 'error') {
            content.innerHTML = `Error updating account details.`;
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
                //account.deleteAccount();
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
        let searchURL = url + `?destination=${searchInput}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            let rideData = JSON.parse(this.response);
            callback(rideData);
            console.log(rideData);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0I7QUFDeEI7QUFDQTtBQUNBLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sWUFBWSxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0Q0FBRztBQUNYO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQ0FBa0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRDQUFHO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR1M7QUFDTjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQUk7QUFDaEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOZ0M7QUFDUjtBQUN4QjtBQUNBLGdEQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0Q0FBRztBQUNQO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9hY2NvdW50LmpzIiwid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2hhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL3JpZGUuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuY29uc3QgQWNjb3VudCA9IChhY2NvdW50SUQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIG1vYmlsZU5vLCBlbWFpbCwgZHJpdmVyTGljZW5zZU51bWJlciwgY2FyUGxhdGVOdW1iZXIsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICB0aGlzLmFjY291bnRJRCA9IGFjY291bnRJRDtcclxuICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xyXG4gICAgdGhpcy5tb2JpbGVObyA9IG1vYmlsZU5vO1xyXG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgdGhpcy5kcml2ZXJMaWNlbnNlTnVtYmVyID0gZHJpdmVyTGljZW5zZU51bWJlcjtcclxuICAgIHRoaXMuY2FyUGxhdGVOdW1iZXIgPSBjYXJQbGF0ZU51bWJlcjtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxufVxyXG5cclxuY29uc3QgYWNjb3VudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvYWNjb3VudHMnO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUFjY291bnQgPSAoYWNjb3VudERhdGEpID0+IHtcclxuICAgICAgICBsZXQgY3JlYXRlVVJMID0gdXJsICsgXCIvXCIgKyBcImlkXCI7XHJcblxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQT1NUJywgY3JlYXRlVVJMKTtcclxuICAgICAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGFjY291bnQgY3JlYXRpb24gc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdjcmVhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICBkb20uZGlzcGxheU1lc3NhZ2UoJ2NyZWF0ZScsICdlcnJvcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNoZWNrTG9naW4gPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/ZW1haWw9JHtlbWFpbH0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBzZWFyY2hVUkwpO1xyXG4gICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIGFyZSBmb3VuZFxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY291bnRJRCcsIGFjY291bnREYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyVHlwZScsIGFjY291bnREYXRhLnVzZXJUeXBlKTtcclxuICAgICAgICAgICAgICAgIGRvbS51c2VyTG9nZ2VkSW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgLy8gSWYgZW1haWwgYW5kIHBhc3N3b3JkIG5vdCBmb3VuZFxyXG4gICAgICAgIGRvbS5kaXNwbGF5TG9naW5FcnJvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnZXRBY2NvdW50ID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGAvJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjb3VudElEJyl9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soYWNjb3VudERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVBY2NvdW50ID0gKGFjY291bnREYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWNjb3VudElEID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgIGxldCB1cGRhdGVVUkwgPSB1cmwgKyBcIi9cIiArIGFjY291bnRJRDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ1BVVCcsIHVwZGF0ZVVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIC8vIFN0b3JlIG5ldyB1c2VyIHR5cGUgdG8gbG9jYWwgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJUeXBlJywgYWNjb3VudERhdGFbJ1VzZXIgVHlwZSddKTtcclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgYWNjb3VudCB1cGRhdGUgc3VjY2Vzc1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCd1cGRhdGUnLCAnc3VjY2VzcycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXF1ZXN0LnNlbmQoSlNPTi5zdHJpbmdpZnkoYWNjb3VudERhdGEpKTtcclxuICAgICAgICAvLyBEaXNwbGF5IGVycm9yXHJcbiAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCd1cGRhdGUnLCAnZXJyb3InKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUFjY291bnQsXHJcbiAgICAgICAgY2hlY2tMb2dpbixcclxuICAgICAgICBnZXRBY2NvdW50LFxyXG4gICAgICAgIHVwZGF0ZUFjY291bnQsXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY2NvdW50O1xyXG4iLCJpbXBvcnQgYWNjb3VudCBmcm9tICcuL2FjY291bnQnO1xyXG5pbXBvcnQgcmlkZSBmcm9tICcuL3JpZGUnO1xyXG5cclxuY29uc3QgZG9tID0gKCgpID0+IHtcclxuICAgIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKTtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xyXG4gICAgY29uc3Qgc2lnbk91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbk91dExpbmsnKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5cclxuICAgIGNvbnN0IGxvZ2luRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbkZvcm0nKTtcclxuICAgIGNvbnN0IGxvZ2luRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW5FcnJvcicpO1xyXG5cclxuICAgIC8vIFRvZ2dsZSBzaWRlYmFyXHJcbiAgICBjb25zdCB0b2dnbGVTaWRlYmFyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0cmlldmUgbG9naW4gaW5wdXRzIGFuZCBjaGVjayBpbnB1dHNcclxuICAgIGNvbnN0IGdldEZvcm1JbnB1dHMgPSAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PSAnbG9naW4nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZElucHV0VmFsdWU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgLy8gSW5wdXRzIGFyZSBub3QgZW1wdHlcclxuICAgICAgICAgICAgcmV0dXJuIFtlbWFpbElucHV0VmFsdWUsIHBhc3N3b3JkSW5wdXRWYWx1ZV07ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gJ3NpZ25VcCcpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhc3ROYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU5vSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVObycpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbElucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBKU09OXHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwiRmlyc3QgTmFtZVwiOiBmaXJzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJMYXN0IE5hbWVcIjogbGFzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJNb2JpbGUgTnVtYmVyXCI6IG1vYmlsZU5vSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiRW1haWwgQWRkcmVzc1wiOiBlbWFpbElucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlVzZXIgVHlwZVwiOiAncGFzc2VuZ2VyJyxcclxuICAgICAgICAgICAgICAgIFwiRHJpdmVyIExpY2Vuc2UgTnVtYmVyXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIkNhciBQbGF0ZSBOdW1iZXJcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwiUGFzc3dvcmRcIjogcGFzc3dvcmRJbnB1dFZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFjY291bnREYXRhOyAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PSAndXBkYXRlJykge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpcnN0TmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0TmFtZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbW9iaWxlTm9JbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vYmlsZU5vJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZElucHV0VmFsdWU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzd29yZCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyVHlwZUlucHV0dmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwic2VsZWN0VXNlclR5cGVcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZHJpdmVyTGljZW5zZUlucHV0VmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgY2FyUGxhdGVJbnB1dFZhbHVlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGNhciBvd25lciByYWRpbyBpcyBzZWxlY3RlZCwgcmV0cmlldmUgdGhlIGNhciBvd25lciBmb3JtIGlucHV0c1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RyaXZlckxpY2Vuc2VOdW1iZXInKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNhclBsYXRlSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJQbGF0ZU51bWJlcicpLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBwYXNzZW5nZXIsIHJlbW92ZSBkcml2ZXIgbGljZW5zZSBudW1iZXIgJiBjYXIgcGxhdGUgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmICh1c2VyVHlwZUlucHV0dmFsdWUgPT0gJ3Bhc3NlbmdlcicpIHtcclxuICAgICAgICAgICAgICAgIGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGNhclBsYXRlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBKU09OXHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwiRmlyc3QgTmFtZVwiOiBmaXJzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJMYXN0IE5hbWVcIjogbGFzdE5hbWVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJNb2JpbGUgTnVtYmVyXCI6IG1vYmlsZU5vSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiRW1haWwgQWRkcmVzc1wiOiBlbWFpbElucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlVzZXIgVHlwZVwiOiB1c2VyVHlwZUlucHV0dmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkRyaXZlciBMaWNlbnNlIE51bWJlclwiOiBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiQ2FyIFBsYXRlIE51bWJlclwiOiBjYXJQbGF0ZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIlBhc3N3b3JkXCI6IHBhc3N3b3JkSW5wdXRWYWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2NvdW50RGF0YTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBEaXNwbGF5IGVycm9yIHdoZW4gbG9naW4gY3JlZGVudGlhbHMgYXJlIGluY29ycmVjdFxyXG4gICAgY29uc3QgZGlzcGxheUxvZ2luRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgbG9naW5Gb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgbG9naW5FcnJvci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGxheSByZWdpc3RyYXRpb24gZm9ybVxyXG4gICAgY29uc3QgZGlzcGxheVNpZ25VcEZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiYWNjb3VudEZvcm1cIiBpZD1cInNpZ25VcEZvcm1cIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+Q3JlYXRlIGFuIGFjY291bnQ8L2gyPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBGaXJzdE5hbWUgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJmaXJzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIExhc3ROYW1lIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImxhc3ROYW1lXCI+TGFzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBNb2JpbGUgTnVtYmVyIElucHV0LS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtb2JpbGVOb1wiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibW9iaWxlTm9cIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBFbWFpbCBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gUGFzc3dvcmQgSW5wdXQtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gc2lnblVwQnRuXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dpbkxpbmtcIj5IYXZlIGFuIGFjY291bnQ/PHNwYW4gY2xhc3M9XCJ1bmRlcmxpbmUgZGlzcGxheUxvZ2luXCI+TG9nIGluIGhlcmU8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlMb2dpbkZvcm0gPSAoKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiYWNjb3VudEZvcm1cIiBpZD1cImxvZ2luRm9ybVwiIGFjdGlvbj1cIiNcIj5cclxuICAgICAgICAgICAgICAgIDxoMj5TaWduIEluPC9oMj5cclxuICAgICAgICAgICAgICAgIDwhLS0gRW1haWwgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIFBhc3N3b3JkIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBsb2dpbkJ0blwiPlNpZ24gSW48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGxvZ2luRXJyb3IgaGlkZVwiPkludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnblVwTGlua1wiPkRvbid0IGhhdmUgYW4gYWNjb3VudD88c3BhbiBjbGFzcz1cInVuZGVybGluZSBkaXNwbGF5U2lnblVwXCI+U2lnbiB1cCBoZXJlPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1c2VyTG9nZ2VkSW4gPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gR2V0IHVzZXIgdHlwZSBmcm9tIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICBjb25zdCB1c2VyVHlwZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyVHlwZScpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWVsZW1lbnRzJykuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtYmV0d2Vlbic7XHJcbiAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICBzaWduT3V0TGluay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcblxyXG4gICAgICAgIGlmICh1c2VyVHlwZSA9PSAncGFzc2VuZ2VyJykge1xyXG4gICAgICAgICAgICByaWRlLmdldFJpZGVzKChyaWRlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVRyaXBzKHJpZGVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKHVzZXJUeXBlID09ICdjYXIgb3duZXInKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICBjYXIgb3duZXJcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlckxvZ2dlZE91dCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLWVsZW1lbnRzJykuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcclxuICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgIHNpZ25PdXRMaW5rLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RMaW5rID0gKHRhcmdldCwgZGVzdGluYXRpb24pID0+IHtcclxuICAgICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlua1wiKTtcclxuICAgICAgICBsaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbiAgICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1saW5rXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgLy8gQ2xpY2sgb24gbWVudSBvciBwcm9qZWN0IGxpbmtcclxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxpbmtcIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmUtbGlua1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2xpY2sgb24gbWVudSBpY29uXHJcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm1lbnUtaWNvblwiKSkge1xyXG4gICAgICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWxpbmtcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbGljayBvbiBob21lXHJcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uID09ICdyaWRlcycpIHtcclxuICAgICAgICAgICAgcmlkZS5nZXRSaWRlcygocmlkZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUcmlwcyhyaWRlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBcclxuICAgICAgICAvLyBDbGljayBvbiB2aWV3IHByb2ZpbGVcclxuICAgICAgICBlbHNlIGlmIChkZXN0aW5hdGlvbiA9PSAncHJvZmlsZScpIHtcclxuICAgICAgICAgICAgYWNjb3VudC5nZXRBY2NvdW50KChhY2NvdW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVByb2ZpbGUoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlUcmlwcyA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlYXJjaC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIG5hbWU9XCJzZWFyY2gtb3V0bGluZVwiIGlkPVwic3VibWl0U2VhcmNoXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzZWFyY2hcIiBpZD1cInNlYXJjaC1iYXJcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicmlkZXNMaXN0XCI+PC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhLlJpZGVzKTtcclxuICAgICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlkZXNMaXN0JykuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyaWRlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlJpZGUgc3RhcnRlZCBhdDogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlN0YXJ0IFJpZGUgVGltZVwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5QaWNrLXVwIGxvY2F0aW9uOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiUGljayBVcCBMb2NhdGlvblwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXN0aW5hdGlvbjogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIkRlc3RpbmF0aW9uIEFkZHJlc3NcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q2FwYWNpdHk6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJQYXNzZW5nZXIgQ2FwYWNpdHlcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+UGFzc2VuZ2VyczogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIk51bVBhc3NlbmdlcnNcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q29tcGxldGVkIGF0OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiQ29tcGxldGVkIEF0XCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNhbmNlbGxlZCBhdDogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIkNhbmNlbGxlZCBBdFwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5TdGF0dXM6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJTdGF0dXNcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBlbnJvbEJ0blwiPkVucm9sPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9KTsgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2V0U2VhcmNoYmFySW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoQmFySW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYmFyJykudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHNlYXJjaEJhcklucHV0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheVByb2ZpbGUgPSAoYWNjb3VudCkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFjY291bnRGb3JtXCIgYWN0aW9uPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgPGgyPkhlbGxvICR7YWNjb3VudFsnRmlyc3QgTmFtZSddICsgXCIgXCIgKyBhY2NvdW50WydMYXN0IE5hbWUnXX08L2gyPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0ZpcnN0IE5hbWUnXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZpcnN0TmFtZVwiPkZpcnN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGFzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnTGFzdCBOYW1lJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtb2JpbGVOb1wiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydNb2JpbGUgTnVtYmVyJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtb2JpbGVOb1wiPk1vYmlsZSBOdW1iZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0VtYWlsIEFkZHJlc3MnXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ1Bhc3N3b3JkJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1c2VyVHlwZVNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInBhc3NlbmdlclwiIG5hbWU9XCJzZWxlY3RVc2VyVHlwZVwiIHZhbHVlPVwicGFzc2VuZ2VyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc2VuZ2VyXCI+UGFzc2VuZ2VyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJjYXItb3duZXJcIiBuYW1lPVwic2VsZWN0VXNlclR5cGVcIiB2YWx1ZT1cImNhciBvd25lclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNhci1vd25lclwiPkNhciBPd25lcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyT3duZXJTZWxlY3Rpb24gaGlkZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkcml2ZXJMaWNlbnNlTnVtYmVyXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0RyaXZlciBMaWNlbnNlIE51bWJlciddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkcml2ZXJMaWNlbnNlTnVtYmVyXCI+RHJpdmVyIExpY2Vuc2UgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjYXJQbGF0ZU51bWJlclwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydDYXIgUGxhdGUgTnVtYmVyJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNhclBsYXRlTnVtYmVyXCI+Q2FyIFBsYXRlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biB1cGRhdGVCdG5cIj5VcGRhdGU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZGVsQnRuXCI+RGVsZXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlbGV0ZU1vZGFsXCI+XHJcbiAgICAgICAgICAgICAgICA8cD5BcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlPzwvcD5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxBY3Rpb25CdG5zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBjb25maXJtRGVsQnRuXCI+Q29uZmlybTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY2FuY2VsRGVsQnRuXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvdmVybGF5XCI+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29uc3QgcGFzc2VuZ2VyUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2VuZ2VyJyk7XHJcbiAgICAgICAgY29uc3QgY2FyT3duZXJSYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXItb3duZXInKTtcclxuXHJcbiAgICAgICAgaWYgKGFjY291bnRbJ1VzZXIgVHlwZSddID09ICdwYXNzZW5nZXInKSB7XHJcbiAgICAgICAgICAgIHBhc3NlbmdlclJhZGlvLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjY291bnRbJ1VzZXIgVHlwZSddID09ICdjYXIgb3duZXInKSB7XHJcbiAgICAgICAgICAgIGNhck93bmVyUmFkaW8uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKTtcclxuICAgICAgICAgICAgdG9nZ2xlQ2FyT3duZXJET00oJ2Nhci1vd25lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0b2dnbGVDYXJPd25lckRPTSA9ICh1c2VyVHlwZSkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJPd25lclNlbGVjdGlvbicpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh1c2VyVHlwZSA9PSAnY2FyLW93bmVyJykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyT3duZXJTZWxlY3Rpb24nKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyT3duZXJTZWxlY3Rpb24nKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheU1lc3NhZ2UgPSAodHlwZSwgb3V0Y29tZSkgPT4ge1xyXG4gICAgICAgIGlmICh0eXBlID09ICdjcmVhdGUnICYmIG91dGNvbWUgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25VcE1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5TdWNjZXNzZnVsbHkgY3JlYXRlZCBhY2NvdW50PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidW5kZXJsaW5lIHJldHVybkxvZ2luXCI+UmV0dXJuIHRvIHNpZ24gaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAnY3JlYXRlJyAmJiBvdXRjb21lID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lnblVwTWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlJlZ2lzdHJhdGlvbiBlcnJvci4gVHJ5IGFnYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidW5kZXJsaW5lIHJldHVyblNpZ25VcFwiPlJldHVybjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodHlwZSA9PSAndXBkYXRlJyAmJiBvdXRjb21lID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBZb3VyIGRldGFpbHMgaGF2ZSBiZWVuIHVwZGF0ZWRgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09ICd1cGRhdGUnICYmIG91dGNvbWUgPT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBFcnJvciB1cGRhdGluZyBhY2NvdW50IGRldGFpbHMuYDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGlzcGxheURlbGV0ZU1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGVNb2RhbCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VEZWxldGVNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlTW9kYWwnKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9nZ2xlU2lkZWJhcixcclxuICAgICAgICBnZXRGb3JtSW5wdXRzLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkVycm9yLFxyXG4gICAgICAgIGRpc3BsYXlTaWduVXBGb3JtLFxyXG4gICAgICAgIGRpc3BsYXlMb2dpbkZvcm0sXHJcbiAgICAgICAgdXNlckxvZ2dlZEluLFxyXG4gICAgICAgIHVzZXJMb2dnZWRPdXQsXHJcbiAgICAgICAgc2VsZWN0TGluayxcclxuICAgICAgICB0b2dnbGVDYXJPd25lckRPTSxcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZSxcclxuICAgICAgICBkaXNwbGF5RGVsZXRlTW9kYWwsXHJcbiAgICAgICAgY2xvc2VEZWxldGVNb2RhbCxcclxuICAgICAgICBnZXRTZWFyY2hiYXJJbnB1dCxcclxuICAgICAgICBkaXNwbGF5VHJpcHMsXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgYWNjb3VudCBmcm9tICcuL2FjY291bnQnO1xyXG5pbXBvcnQgcmlkZSBmcm9tICcuL3JpZGUnO1xyXG5cclxuY29uc3QgaGFuZGxlciA9ICgoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tzID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHNpZGViYXJcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYW1idXJnZXInKSB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXItbGluZScpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZVNpZGViYXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTG9naW4gYnV0dG9uXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvZ2luQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBbZW1haWwsIHBhc3N3b3JkXSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdsb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudC5jaGVja0xvZ2luKGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5U2lnblVwJykgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuU2lnblVwJykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5U2lnblVwRm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGxvZ2luIGZvcm1cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNwbGF5TG9naW4nKSB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncmV0dXJuTG9naW4nKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlMb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lnbiBvdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnbk91dExpbmsnKSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY291bnRJRCcpO1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJUeXBlJyk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheUxvZ2luRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgZG9tLnVzZXJMb2dnZWRPdXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2lkZWJhciBsaW5rc1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25MaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstZGVzdGluYXRpb24nKTtcclxuICAgICAgICAgICAgICAgIGRvbS5zZWxlY3RMaW5rKGUudGFyZ2V0LCBkZXN0aW5hdGlvbkxpbmspO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZWxlY3QgcGFzc2VuZ2VyIG9yIGNhciBvd25lciByYWRpbyBpbiBwcm9maWxlXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnY2FyLW93bmVyJyB8fCBcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAncGFzc2VuZ2VyJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZG9tLnRvZ2dsZUNhck93bmVyRE9NKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSk7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAgIC8vIENyZWF0YSBhY2NvdW50XHJcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2lnblVwQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IGRvbS5nZXRGb3JtSW5wdXRzKCdzaWduVXAnKTtcclxuICAgICAgICAgICAgICAgIGFjY291bnQuY3JlYXRlQWNjb3VudChhY2NvdW50RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhY2NvdW50XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3VwZGF0ZUJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBkb20uZ2V0Rm9ybUlucHV0cygndXBkYXRlJyk7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50LnVwZGF0ZUFjY291bnQoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IGRlbGV0ZSBhY2NvdW50IG1vZGFsXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpcm0gZGVsZXRlIGFjY291bnQgaW4gbW9kYWxcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY29uZmlybURlbEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2FjY291bnQuZGVsZXRlQWNjb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDbG9zZSBkZWxldGUgYWNjb3VudCBtb2RhbFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWxEZWxCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgZG9tLmNsb3NlRGVsZXRlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU3VibWl0IHNlYXJjaCBiYXIgaW5wdXRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSA9PSAnc3VibWl0U2VhcmNoJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaGJhcklucHV0ID0gZG9tLmdldFNlYXJjaGJhcklucHV0KCk7XHJcbiAgICAgICAgICAgICAgICByaWRlLnNlYXJjaFJpZGUoc2VhcmNoYmFySW5wdXQsIChyaWRlRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5VHJpcHMocmlkZURhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBoYW5kbGVDbGlja3MgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7IiwiY29uc3QgcmlkZSA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvcmlkZXMnO1xyXG5cclxuICAgIGNvbnN0IGdldFJpZGVzID0gKGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VhcmNoUmlkZSA9IChzZWFyY2hJbnB1dCwgY2FsbGJhY2spID0+IHtcclxuICAgICAgICBsZXQgc2VhcmNoVVJMID0gdXJsICsgYD9kZXN0aW5hdGlvbj0ke3NlYXJjaElucHV0fWA7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHNlYXJjaFVSTCk7XHJcbiAgICBcclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgcmlkZURhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhyaWRlRGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJpZGVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRSaWRlcyxcclxuICAgICAgICBzZWFyY2hSaWRlLFxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmlkZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBoYW5kbGVyIGZyb20gJy4vaGFuZGxlcic7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuaGFuZGxlci5oYW5kbGVDbGlja3MoKTtcclxuXHJcbi8vIElmIG5vdCBsb2dnZWQgaW4sIHNob3cgbG9naW4gZm9ybVxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpKSB7XHJcbiAgICBkb20udXNlckxvZ2dlZEluKCk7XHJcbn0gXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9