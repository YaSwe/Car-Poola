import dom from './dom';

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
                    dom.displayAllPassengerRides(rides);
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
                dom.displayMessage('publish', 'success');

                setTimeout(() => {
                    // 5 second delay and return to display all trips
                    ride.getCarOwnerRides((rides) => {
                        dom.displayAllCarOwnerRides(rides);
                    })
                }, 5000);
                return;
            } 
        }
        request.send(JSON.stringify(rideData));
        // If ride creation fails
        dom.displayMessage('publish', 'error');
    }

    const delRide = (rideID) => {
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

    const checkRideStartTime = (rideID, callback) => {
        let searchURL = url + `?rideID=${rideID}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            // If ride is 30 mins ago
            if (request.status == 200) {
                callback(true);
            // If found
            } else {
                callback(false);
            }
        }
        request.send();
    }

    const selectRidesTakenByPassenger = () => {
        
    }

    return {
        getRides,
        searchRide,
        updateRide,
        getCarOwnerRides,
        createRide,
        delRide,
        checkRideStartTime,
    }
})();

export default ride;