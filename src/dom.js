import account from './account';
import ride from './ride';

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
            ride.getRides((rides) => {
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
            ride.getRides((rides) => {
                displayTrips(rides);
            })
        } 
        // Click on view profile
        else if (destination == 'profile') {
            account.getAccount((accountData) => {
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
                        <button class="btn enrolBtn" data-link-rideID="${key}" data-link-rideData='${JSON.stringify(data.Rides[key])}'>Enrol</button>
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

    const exceedPassengerCapacity = (rideID) => {
        const message = document.querySelector(`.exceedMessage[data-link-id="${rideID}"]`);
        message.classList.remove('hide');
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
        exceedPassengerCapacity,
    }

})();

export default dom;