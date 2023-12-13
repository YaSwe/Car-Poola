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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0I7QUFDeEI7QUFDQTtBQUNBLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSLElBQUksU0FBSTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sWUFBWSxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0Q0FBRztBQUNYO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrQ0FBa0M7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRDQUFHO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDRDQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoR1M7QUFDTjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksNkNBQUk7QUFDaEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmdDO0FBQ1I7QUFDeEI7QUFDQSxnREFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUksNENBQUc7QUFDUDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvYWNjb3VudC5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9oYW5kbGVyLmpzIiwid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9yaWRlLmpzIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXItcG9vbGEvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nhci1wb29sYS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nhci1wb29sYS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuXHJcbmNvbnN0IEFjY291bnQgPSAoYWNjb3VudElELCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBtb2JpbGVObywgZW1haWwsIGRyaXZlckxpY2Vuc2VOdW1iZXIsIGNhclBsYXRlTnVtYmVyLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgdGhpcy5hY2NvdW50SUQgPSBhY2NvdW50SUQ7XHJcbiAgICB0aGlzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcclxuICAgIHRoaXMubGFzdE5hbWUgPSBsYXN0TmFtZTtcclxuICAgIHRoaXMubW9iaWxlTm8gPSBtb2JpbGVObztcclxuICAgIHRoaXMuZW1haWwgPSBlbWFpbDtcclxuICAgIHRoaXMuZHJpdmVyTGljZW5zZU51bWJlciA9IGRyaXZlckxpY2Vuc2VOdW1iZXI7XHJcbiAgICB0aGlzLmNhclBsYXRlTnVtYmVyID0gY2FyUGxhdGVOdW1iZXI7XHJcbiAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbn1cclxuXHJcbmNvbnN0IGFjY291bnQgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2FjY291bnRzJztcclxuXHJcbiAgICBjb25zdCBjcmVhdGVBY2NvdW50ID0gKGFjY291bnREYXRhKSA9PiB7XHJcbiAgICAgICAgbGV0IGNyZWF0ZVVSTCA9IHVybCArIFwiL1wiICsgXCJpZFwiO1xyXG5cclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignUE9TVCcsIGNyZWF0ZVVSTCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlzcGxheSBhY2NvdW50IGNyZWF0aW9uIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5TWVzc2FnZSgnY3JlYXRlJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KGFjY291bnREYXRhKSk7XHJcbiAgICAgICAgZG9tLmRpc3BsYXlNZXNzYWdlKCdjcmVhdGUnLCAnZXJyb3InKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGVja0xvZ2luID0gKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWFyY2hVUkwgPSB1cmwgKyBgP2VtYWlsPSR7ZW1haWx9JnBhc3N3b3JkPSR7cGFzc3dvcmR9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIElmIGVtYWlsIGFuZCBwYXNzd29yZCBhcmUgZm91bmRcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2NvdW50SUQnLCBhY2NvdW50RGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlclR5cGUnLCBhY2NvdW50RGF0YS51c2VyVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBkb20udXNlckxvZ2dlZEluKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIC8vIElmIGVtYWlsIGFuZCBwYXNzd29yZCBub3QgZm91bmRcclxuICAgICAgICBkb20uZGlzcGxheUxvZ2luRXJyb3IoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZ2V0QWNjb3VudCA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGxldCBzZWFyY2hVUkwgPSB1cmwgKyBgLyR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpfWA7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHNlYXJjaFVSTCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50RGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGFjY291bnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQWNjb3VudCA9IChhY2NvdW50RGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRJRCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2NvdW50SUQnKTtcclxuICAgICAgICBsZXQgdXBkYXRlVVJMID0gdXJsICsgXCIvXCIgKyBhY2NvdW50SUQ7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFjY291bnREYXRhKSk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdQVVQnLCB1cGRhdGVVUkwpO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBuZXcgdXNlciB0eXBlIHRvIGxvY2FsIHN0b3JhZ2VcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyVHlwZScsIGFjY291bnREYXRhWydVc2VyIFR5cGUnXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGFjY291bnQgdXBkYXRlIHN1Y2Nlc3NcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5TWVzc2FnZSgndXBkYXRlJywgJ3N1Y2Nlc3MnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKEpTT04uc3RyaW5naWZ5KGFjY291bnREYXRhKSk7XHJcbiAgICAgICAgLy8gRGlzcGxheSBlcnJvclxyXG4gICAgICAgIGRvbS5kaXNwbGF5TWVzc2FnZSgndXBkYXRlJywgJ2Vycm9yJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVBY2NvdW50LFxyXG4gICAgICAgIGNoZWNrTG9naW4sXHJcbiAgICAgICAgZ2V0QWNjb3VudCxcclxuICAgICAgICB1cGRhdGVBY2NvdW50LFxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWNjb3VudDtcclxuIiwiaW1wb3J0IGFjY291bnQgZnJvbSAnLi9hY2NvdW50JztcclxuaW1wb3J0IHJpZGUgZnJvbSAnLi9yaWRlJztcclxuXHJcbmNvbnN0IGRvbSA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuICAgIGNvbnN0IHNpZ25PdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ25PdXRMaW5rJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcclxuXHJcbiAgICBjb25zdCBsb2dpbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9naW5Gb3JtJyk7XHJcbiAgICBjb25zdCBsb2dpbkVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvZ2luRXJyb3InKTtcclxuXHJcbiAgICAvLyBUb2dnbGUgc2lkZWJhclxyXG4gICAgY29uc3QgdG9nZ2xlU2lkZWJhciA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJpZXZlIGxvZ2luIGlucHV0cyBhbmQgY2hlY2sgaW5wdXRzXHJcbiAgICBjb25zdCBnZXRGb3JtSW5wdXRzID0gKGFjdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gJ2xvZ2luJykge1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbElucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElucHV0cyBhcmUgbm90IGVtcHR5XHJcbiAgICAgICAgICAgIHJldHVybiBbZW1haWxJbnB1dFZhbHVlLCBwYXNzd29yZElucHV0VmFsdWVdOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uID09ICdzaWduVXAnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlyc3ROYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYXN0TmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBtb2JpbGVOb0lucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9iaWxlTm8nKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZW1haWxJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkSW5wdXRWYWx1ZT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkJykudmFsdWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgSlNPTlxyXG4gICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcIkZpcnN0IE5hbWVcIjogZmlyc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTGFzdCBOYW1lXCI6IGxhc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTW9iaWxlIE51bWJlclwiOiBtb2JpbGVOb0lucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkVtYWlsIEFkZHJlc3NcIjogZW1haWxJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJVc2VyIFR5cGVcIjogJ3Bhc3NlbmdlcicsXHJcbiAgICAgICAgICAgICAgICBcIkRyaXZlciBMaWNlbnNlIE51bWJlclwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJDYXIgUGxhdGUgTnVtYmVyXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBhc3N3b3JkXCI6IHBhc3N3b3JkSW5wdXRWYWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY2NvdW50RGF0YTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gJ3VwZGF0ZScpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3ROYW1lSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdE5hbWUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgbGFzdE5hbWVJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhc3ROYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vYmlsZU5vSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2JpbGVObycpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbElucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgdXNlclR5cGVJbnB1dHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInNlbGVjdFVzZXJUeXBlXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGRyaXZlckxpY2Vuc2VJbnB1dFZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgbGV0IGNhclBsYXRlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBjYXIgb3duZXIgcmFkaW8gaXMgc2VsZWN0ZWQsIHJldHJpZXZlIHRoZSBjYXIgb3duZXIgZm9ybSBpbnB1dHNcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJPd25lclNlbGVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkcml2ZXJMaWNlbnNlTnVtYmVyJykudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjYXJQbGF0ZUlucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyUGxhdGVOdW1iZXInKS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgcGFzc2VuZ2VyLCByZW1vdmUgZHJpdmVyIGxpY2Vuc2UgbnVtYmVyICYgY2FyIHBsYXRlIG51bWJlclxyXG4gICAgICAgICAgICBpZiAodXNlclR5cGVJbnB1dHZhbHVlID09ICdwYXNzZW5nZXInKSB7XHJcbiAgICAgICAgICAgICAgICBkcml2ZXJMaWNlbnNlSW5wdXRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjYXJQbGF0ZUlucHV0VmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgSlNPTlxyXG4gICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBcIkZpcnN0IE5hbWVcIjogZmlyc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTGFzdCBOYW1lXCI6IGxhc3ROYW1lSW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIFwiTW9iaWxlIE51bWJlclwiOiBtb2JpbGVOb0lucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkVtYWlsIEFkZHJlc3NcIjogZW1haWxJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJVc2VyIFR5cGVcIjogdXNlclR5cGVJbnB1dHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJEcml2ZXIgTGljZW5zZSBOdW1iZXJcIjogZHJpdmVyTGljZW5zZUlucHV0VmFsdWUsXHJcbiAgICAgICAgICAgICAgICBcIkNhciBQbGF0ZSBOdW1iZXJcIjogY2FyUGxhdGVJbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgXCJQYXNzd29yZFwiOiBwYXNzd29yZElucHV0VmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjb3VudERhdGE7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGxheSBlcnJvciB3aGVuIGxvZ2luIGNyZWRlbnRpYWxzIGFyZSBpbmNvcnJlY3RcclxuICAgIGNvbnN0IGRpc3BsYXlMb2dpbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIGxvZ2luRm9ybS5yZXNldCgpO1xyXG4gICAgICAgIGxvZ2luRXJyb3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc3BsYXkgcmVnaXN0cmF0aW9uIGZvcm1cclxuICAgIGNvbnN0IGRpc3BsYXlTaWduVXBGb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFjY291bnRGb3JtXCIgaWQ9XCJzaWduVXBGb3JtXCIgYWN0aW9uPVwiI1wiPlxyXG4gICAgICAgICAgICAgICAgPGgyPkNyZWF0ZSBhbiBhY2NvdW50PC9oMj5cclxuICAgICAgICAgICAgICAgIDwhLS0gRmlyc3ROYW1lIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBMYXN0TmFtZSBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gTW9iaWxlIE51bWJlciBJbnB1dC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibW9iaWxlTm9cIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1vYmlsZU5vXCI+TW9iaWxlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwhLS0gRW1haWwgSW5wdXQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImVtYWlsXCI+RW1haWw8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8IS0tIFBhc3N3b3JkIElucHV0LS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIiBcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci10ZXh0IGlucHV0RXJyb3IgaGlkZVwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIHNpZ25VcEJ0blwiPkNyZWF0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9naW5MaW5rXCI+SGF2ZSBhbiBhY2NvdW50PzxzcGFuIGNsYXNzPVwidW5kZXJsaW5lIGRpc3BsYXlMb2dpblwiPkxvZyBpbiBoZXJlPC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5TG9naW5Gb3JtID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImFjY291bnRGb3JtXCIgaWQ9XCJsb2dpbkZvcm1cIiBhY3Rpb249XCIjXCI+XHJcbiAgICAgICAgICAgICAgICA8aDI+U2lnbiBJbjwvaDI+XHJcbiAgICAgICAgICAgICAgICA8IS0tIEVtYWlsIElucHV0IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBpZD1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCIgXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBpbnB1dEVycm9yIGhpZGVcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPCEtLSBQYXNzd29yZCBJbnB1dCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVycm9yLXRleHQgaW5wdXRFcnJvciBoaWRlXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gbG9naW5CdG5cIj5TaWduIEluPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItdGV4dCBsb2dpbkVycm9yIGhpZGVcIj5JbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25VcExpbmtcIj5Eb24ndCBoYXZlIGFuIGFjY291bnQ/PHNwYW4gY2xhc3M9XCJ1bmRlcmxpbmUgZGlzcGxheVNpZ25VcFwiPlNpZ24gdXAgaGVyZTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlckxvZ2dlZEluID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIEdldCB1c2VyIHR5cGUgZnJvbSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgY29uc3QgdXNlclR5cGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlclR5cGUnKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1lbGVtZW50cycpLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWJldHdlZW4nO1xyXG4gICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgc2lnbk91dExpbmsuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG5cclxuICAgICAgICBpZiAodXNlclR5cGUgPT0gJ3Bhc3NlbmdlcicpIHtcclxuICAgICAgICAgICAgcmlkZS5nZXRSaWRlcygocmlkZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlUcmlwcyhyaWRlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmICh1c2VyVHlwZSA9PSAnY2FyIG93bmVyJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgY2FyIG93bmVyXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJMb2dnZWRPdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1lbGVtZW50cycpLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XHJcbiAgICAgICAgaGFtYnVyZ2VyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICBzaWduT3V0TGluay5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0TGluayA9ICh0YXJnZXQsIGRlc3RpbmF0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpbmtcIik7XHJcbiAgICAgICAgbGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG4gICAgICAgICAgICBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmUtbGlua1wiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgIC8vIENsaWNrIG9uIG1lbnUgb3IgcHJvamVjdCBsaW5rXHJcbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsaW5rXCIpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlLWxpbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENsaWNrIG9uIG1lbnUgaWNvblxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtZW51LWljb25cIikpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1saW5rXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xpY2sgb24gaG9tZVxyXG4gICAgICAgIGlmIChkZXN0aW5hdGlvbiA9PSAncmlkZXMnKSB7XHJcbiAgICAgICAgICAgIHJpZGUuZ2V0UmlkZXMoKHJpZGVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VHJpcHMocmlkZXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgLy8gQ2xpY2sgb24gdmlldyBwcm9maWxlXHJcbiAgICAgICAgZWxzZSBpZiAoZGVzdGluYXRpb24gPT0gJ3Byb2ZpbGUnKSB7XHJcbiAgICAgICAgICAgIGFjY291bnQuZ2V0QWNjb3VudCgoYWNjb3VudERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlQcm9maWxlKGFjY291bnREYXRhKTtcclxuICAgICAgICAgICAgfSk7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkaXNwbGF5VHJpcHMgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBuYW1lPVwic2VhcmNoLW91dGxpbmVcIiBpZD1cInN1Ym1pdFNlYXJjaFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgaWQ9XCJzZWFyY2gtYmFyXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJpZGVzTGlzdFwiPjwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZGF0YS5SaWRlcyk7XHJcbiAgICAgICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZGVzTGlzdCcpLmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmlkZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5SaWRlIHN0YXJ0ZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJTdGFydCBSaWRlIFRpbWVcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+UGljay11cCBsb2NhdGlvbjogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIlBpY2sgVXAgTG9jYXRpb25cIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+RGVzdGluYXRpb246IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJEZXN0aW5hdGlvbiBBZGRyZXNzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNhcGFjaXR5OiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiUGFzc2VuZ2VyIENhcGFjaXR5XCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlBhc3NlbmdlcnM6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJOdW1QYXNzZW5nZXJzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNvbXBsZXRlZCBhdDogPHNwYW4gY2xhc3M9XCJyaWRlLWluZm9cIj4ke2RhdGEuUmlkZXNba2V5XVtcIkNvbXBsZXRlZCBBdFwiXX08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DYW5jZWxsZWQgYXQ6IDxzcGFuIGNsYXNzPVwicmlkZS1pbmZvXCI+JHtkYXRhLlJpZGVzW2tleV1bXCJDYW5jZWxsZWQgQXRcIl19PC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+U3RhdHVzOiA8c3BhbiBjbGFzcz1cInJpZGUtaW5mb1wiPiR7ZGF0YS5SaWRlc1trZXldW1wiU3RhdHVzXCJdfTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gZW5yb2xCdG5cIj5FbnJvbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSk7IFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdldFNlYXJjaGJhcklucHV0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaEJhcklucHV0VmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWJhcicpLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBzZWFyY2hCYXJJbnB1dFZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlQcm9maWxlID0gKGFjY291bnQpID0+IHtcclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJhY2NvdW50Rm9ybVwiIGFjdGlvbj1cIiNcIj5cclxuICAgICAgICAgICAgICAgIDxoMj5IZWxsbyAke2FjY291bnRbJ0ZpcnN0IE5hbWUnXSArIFwiIFwiICsgYWNjb3VudFsnTGFzdCBOYW1lJ119PC9oMj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImZpcnN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydGaXJzdCBOYW1lJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaXJzdE5hbWVcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCIgXCIgdmFsdWU9XCIke2FjY291bnRbJ0xhc3QgTmFtZSddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibGFzdE5hbWVcIj5MYXN0IE5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibW9iaWxlTm9cIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnTW9iaWxlIE51bWJlciddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibW9iaWxlTm9cIj5Nb2JpbGUgTnVtYmVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydFbWFpbCBBZGRyZXNzJ119XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydQYXNzd29yZCddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidXNlclR5cGVTZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJwYXNzZW5nZXJcIiBuYW1lPVwic2VsZWN0VXNlclR5cGVcIiB2YWx1ZT1cInBhc3NlbmdlclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3NlbmdlclwiPlBhc3NlbmdlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiY2FyLW93bmVyXCIgbmFtZT1cInNlbGVjdFVzZXJUeXBlXCIgdmFsdWU9XCJjYXIgb3duZXJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXItb3duZXJcIj5DYXIgT3duZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhck93bmVyU2VsZWN0aW9uIGhpZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZHJpdmVyTGljZW5zZU51bWJlclwiIHBsYWNlaG9sZGVyPVwiIFwiIHZhbHVlPVwiJHthY2NvdW50WydEcml2ZXIgTGljZW5zZSBOdW1iZXInXX1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHJpdmVyTGljZW5zZU51bWJlclwiPkRyaXZlciBMaWNlbnNlIE51bWJlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY2FyUGxhdGVOdW1iZXJcIiBwbGFjZWhvbGRlcj1cIiBcIiB2YWx1ZT1cIiR7YWNjb3VudFsnQ2FyIFBsYXRlIE51bWJlciddfVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjYXJQbGF0ZU51bWJlclwiPkNhciBQbGF0ZSBOdW1iZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gdXBkYXRlQnRuXCI+VXBkYXRlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGRlbEJ0blwiPkRlbGV0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWxldGVNb2RhbFwiPlxyXG4gICAgICAgICAgICAgICAgPHA+QXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZT88L3A+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsQWN0aW9uQnRuc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gY29uZmlybURlbEJ0blwiPkNvbmZpcm08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGNhbmNlbERlbEJ0blwiPkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheVwiPlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhc3NlbmdlclJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3NlbmdlcicpO1xyXG4gICAgICAgIGNvbnN0IGNhck93bmVyUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyLW93bmVyJyk7XHJcblxyXG4gICAgICAgIGlmIChhY2NvdW50WydVc2VyIFR5cGUnXSA9PSAncGFzc2VuZ2VyJykge1xyXG4gICAgICAgICAgICBwYXNzZW5nZXJSYWRpby5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY2NvdW50WydVc2VyIFR5cGUnXSA9PSAnY2FyIG93bmVyJykge1xyXG4gICAgICAgICAgICBjYXJPd25lclJhZGlvLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNhck93bmVyRE9NKCdjYXItb3duZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdG9nZ2xlQ2FyT3duZXJET00gPSAodXNlclR5cGUpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyT3duZXJTZWxlY3Rpb24nKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodXNlclR5cGUgPT0gJ2Nhci1vd25lcicpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhck93bmVyU2VsZWN0aW9uJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlNZXNzYWdlID0gKHR5cGUsIG91dGNvbWUpID0+IHtcclxuICAgICAgICBpZiAodHlwZSA9PSAnY3JlYXRlJyAmJiBvdXRjb21lID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaWduVXBNZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+U3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgYWNjb3VudDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInVuZGVybGluZSByZXR1cm5Mb2dpblwiPlJldHVybiB0byBzaWduIGluPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2NyZWF0ZScgJiYgb3V0Y29tZSA9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZ25VcE1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD5SZWdpc3RyYXRpb24gZXJyb3IuIFRyeSBhZ2FpbjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInVuZGVybGluZSByZXR1cm5TaWduVXBcIj5SZXR1cm48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ3VwZGF0ZScgJiYgb3V0Y29tZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgWW91ciBkZXRhaWxzIGhhdmUgYmVlbiB1cGRhdGVkYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAndXBkYXRlJyAmJiBvdXRjb21lID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgRXJyb3IgdXBkYXRpbmcgYWNjb3VudCBkZXRhaWxzLmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlEZWxldGVNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlTW9kYWwnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3ZlcmxheScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlRGVsZXRlTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZU1vZGFsJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvZ2dsZVNpZGViYXIsXHJcbiAgICAgICAgZ2V0Rm9ybUlucHV0cyxcclxuICAgICAgICBkaXNwbGF5TG9naW5FcnJvcixcclxuICAgICAgICBkaXNwbGF5U2lnblVwRm9ybSxcclxuICAgICAgICBkaXNwbGF5TG9naW5Gb3JtLFxyXG4gICAgICAgIHVzZXJMb2dnZWRJbixcclxuICAgICAgICB1c2VyTG9nZ2VkT3V0LFxyXG4gICAgICAgIHNlbGVjdExpbmssXHJcbiAgICAgICAgdG9nZ2xlQ2FyT3duZXJET00sXHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UsXHJcbiAgICAgICAgZGlzcGxheURlbGV0ZU1vZGFsLFxyXG4gICAgICAgIGNsb3NlRGVsZXRlTW9kYWwsXHJcbiAgICAgICAgZ2V0U2VhcmNoYmFySW5wdXQsXHJcbiAgICAgICAgZGlzcGxheVRyaXBzLFxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0IGFjY291bnQgZnJvbSAnLi9hY2NvdW50JztcclxuaW1wb3J0IHJpZGUgZnJvbSAnLi9yaWRlJztcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSAoKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrcyA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBzaWRlYmFyXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGFtYnVyZ2VyJykgfHxcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyLWxpbmUnKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGRvbS50b2dnbGVTaWRlYmFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvZ2luIGJ1dHRvblxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2dpbkJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgW2VtYWlsLCBwYXNzd29yZF0gPSBkb20uZ2V0Rm9ybUlucHV0cygnbG9naW4nKTtcclxuICAgICAgICAgICAgICAgIGFjY291bnQuY2hlY2tMb2dpbihlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNwbGF5IHJlZ2lzdHJhdGlvbiBmb3JtXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGlzcGxheVNpZ25VcCcpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JldHVyblNpZ25VcCcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkb20uZGlzcGxheVNpZ25VcEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGlzcGxheSBsb2dpbiBmb3JtXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGlzcGxheUxvZ2luJykgfHwgXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3JldHVybkxvZ2luJykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kaXNwbGF5TG9naW5Gb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNpZ24gb3V0XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZ25PdXRMaW5rJykpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2NvdW50SUQnKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyVHlwZScpO1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlMb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgICAgIGRvbS51c2VyTG9nZ2VkT3V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNpZGViYXIgbGlua3NcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uTGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWRlc3RpbmF0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICBkb20uc2VsZWN0TGluayhlLnRhcmdldCwgZGVzdGluYXRpb25MaW5rKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2VsZWN0IHBhc3NlbmdlciBvciBjYXIgb3duZXIgcmFkaW8gaW4gcHJvZmlsZVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gJ2Nhci1vd25lcicgfHwgXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gJ3Bhc3NlbmdlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS50b2dnbGVDYXJPd25lckRPTShlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgICAvLyBDcmVhdGEgYWNjb3VudFxyXG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZ25VcEJ0bicpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWNjb3VudERhdGEgPSBkb20uZ2V0Rm9ybUlucHV0cygnc2lnblVwJyk7XHJcbiAgICAgICAgICAgICAgICBhY2NvdW50LmNyZWF0ZUFjY291bnQoYWNjb3VudERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgYWNjb3VudFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1cGRhdGVCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFjY291bnREYXRhID0gZG9tLmdldEZvcm1JbnB1dHMoJ3VwZGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudC51cGRhdGVBY2NvdW50KGFjY291bnREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGlzcGxheSBkZWxldGUgYWNjb3VudCBtb2RhbFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWxCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZG9tLmRpc3BsYXlEZWxldGVNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb25maXJtIGRlbGV0ZSBhY2NvdW50IGluIG1vZGFsXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbmZpcm1EZWxCdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgLy9hY2NvdW50LmRlbGV0ZUFjY291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2xvc2UgZGVsZXRlIGFjY291bnQgbW9kYWxcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsRGVsQnRuJykpIHtcclxuICAgICAgICAgICAgICAgIGRvbS5jbG9zZURlbGV0ZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFN1Ym1pdCBzZWFyY2ggYmFyIGlucHV0XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJykgPT0gJ3N1Ym1pdFNlYXJjaCcpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hiYXJJbnB1dCA9IGRvbS5nZXRTZWFyY2hiYXJJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgcmlkZS5zZWFyY2hSaWRlKHNlYXJjaGJhcklucHV0LCAocmlkZURhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uZGlzcGxheVRyaXBzKHJpZGVEYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgaGFuZGxlQ2xpY2tzIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyOyIsImNvbnN0IHJpZGUgPSAoKCkgPT4ge1xyXG4gICAgbGV0IHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL3JpZGVzJztcclxuXHJcbiAgICBjb25zdCBnZXRSaWRlcyA9IChjYWxsYmFjaykgPT4ge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlYXJjaFJpZGUgPSAoc2VhcmNoSW5wdXQsIGNhbGxiYWNrKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/c2VhcmNoPSR7c2VhcmNoSW5wdXR9YDtcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgc2VhcmNoVVJMKTtcclxuICAgIFxyXG4gICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCByaWRlRGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHJpZGVEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRSaWRlcyxcclxuICAgICAgICBzZWFyY2hSaWRlLFxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmlkZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBoYW5kbGVyIGZyb20gJy4vaGFuZGxlcic7XHJcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xyXG5cclxuaGFuZGxlci5oYW5kbGVDbGlja3MoKTtcclxuXHJcbi8vIElmIG5vdCBsb2dnZWQgaW4sIHNob3cgbG9naW4gZm9ybVxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY291bnRJRCcpKSB7XHJcbiAgICBkb20udXNlckxvZ2dlZEluKCk7XHJcbn0gXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9