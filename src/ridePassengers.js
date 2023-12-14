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

    const passengerInRide = (rideID, passengerID) => {
        let searchURL = url + `?rideID=${rideID}&passengerID=${passengerID}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            // If not found
            if (request.status == 200) {
                return false;
            } 
        }
        request.send();
        // If found
        return true;
    }

    return {
        enrolRide,
        passengerInRide,
    }
})();

export default ridePassengers;