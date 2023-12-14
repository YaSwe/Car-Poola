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
                return;
            } 
        }
        request.send(JSON.stringify(rideData));
        // If ride creation fails
        dom.displayMessage('publish', 'error');
    }

    return {
        getRides,
        searchRide,
        updateRide,
        getCarOwnerRides,
        createRide
    }
})();

export default ride;