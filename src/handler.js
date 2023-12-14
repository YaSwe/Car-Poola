import dom from './dom';
import account from './account';
import ride from './ride';
import ridePassengers from './ridePassengers';

const handler = (() => {

    const handleClicks = () => {
        document.addEventListener('click', (e) => {
            // Toggle sidebar
            if (
                e.target.classList.contains('hamburger') ||
                e.target.classList.contains('burger-line')
            ) {
                dom.toggleSidebar();
            }

            // Login button
            if (e.target.classList.contains('loginBtn')) {
                let [email, password] = dom.getFormInputs('login');
                account.checkLogin(email, password);
            }

            // Display registration form
            if (
                e.target.classList.contains('displaySignUp') ||
                e.target.classList.contains('returnSignUp'))
            {
                dom.displaySignUpForm();
            }

            // Display login form
            if (
                e.target.classList.contains('displayLogin') || 
                e.target.classList.contains('returnLogin'))
            {
                dom.displayLoginForm();
            }

            // Sign out
            if (e.target.classList.contains('signOutLink')) {
                localStorage.removeItem('accountID');
                localStorage.removeItem('userType');
                dom.displayLoginForm();
                dom.userLoggedOut();
            }

            // Sidebar links
            if (e.target.classList.contains('select')) {
                const destinationLink = e.target.getAttribute('data-link-destination');
                dom.selectLink(e.target, destinationLink);
            }

            // Select passenger or car owner radio in profile
            if (
                e.target.getAttribute('id') == 'car-owner' || 
                e.target.getAttribute('id') == 'passenger')
            {
                dom.toggleCarOwnerDOM(e.target.getAttribute('id'));
            } 

              // Creata account
              if (e.target.classList.contains('signUpBtn')) {
                let accountData = dom.getFormInputs('signUp');
                account.createAccount(accountData);
            }

            // Update account
            if (e.target.classList.contains('updateBtn')) {
                let accountData = dom.getFormInputs('update');
                account.updateAccount(accountData);
            }

            // Display delete account modal
            if (e.target.classList.contains('delBtn')) {
                e.preventDefault();
                dom.displayDeleteModal();
            }

            // Confirm delete account in modal
            if (e.target.classList.contains('confirmDelBtn')) {
                // Delete account with retrieved local storage account ID
                account.deleteAccount();
            }

            // Close delete account modal
            if (e.target.classList.contains('cancelDelBtn')) {
                dom.closeDeleteModal();
            }

            // Submit search bar input
            if (e.target.getAttribute('id') == 'submitSearch') {
                let searchbarInput = dom.getSearchbarInput();
                ride.searchRide(searchbarInput, (rideData) => {
                    dom.displayAllPassengerRides(rideData);
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
                    ridePassengers.passengerInRide(rideID, accountID, function(result) {
                        if (result == true) {
                            // Passenger found in the ride
                            dom.displayPassengerInRide(rideID);
                        } else {
                            // Passenger not found in the ride
                            ride.updateRide(rideID, updateData);
                            ridePassengers.enrolRide(rideID);
                        }
                    });
                } else if (data["Status"] == 'started') {
                    dom.exceedPassengerCapacity(rideID);
                }
            }

            // Display form for publishing ride
            if (e.target.classList.contains('displayPublishRideBtn')) {
                dom.displayPublishRideForm();
            }

            // Publish ride
            if (e.target.classList.contains('publishRideBtn')) {
                let rideData = dom.getFormInputs('publish-ride');
                ride.createRide(rideData);
            }

            if (e.target.classList.contains('cancelRideBtn')) {
                let rideID = e.target.getAttribute('data-link-id');
                ridePassengers.delRidePassenger(rideID);

            }
        })
    }

    return { handleClicks };
})();

export default handler;