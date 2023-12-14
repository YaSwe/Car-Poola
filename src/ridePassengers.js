import dom from './dom';

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

export default ridePassengers;