import dom from './dom';

const Account = (accountID, firstName, lastName, mobileNo, email, driverLicenseNumber, carPlateNumber, password) => {
    this.accountID = accountID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNo = mobileNo;
    this.email = email;
    this.driverLicenseNumber = driverLicenseNumber;
    this.carPlateNumber = carPlateNumber;
    this.password = password;
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
                console.log("success")
            } else if (request.status == 409) {
                // Display account exist error
                console.log("error")
            } else {
                //dom.displayMessage('error', '');
            }
        }
        request.send(JSON.stringify(accountData));
    }

    const checkLogin = (email, password) => {
        let searchURL = url + `?email=${email}&password=${password}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            // If email and password are found
            if (request.status == 200) {

                //let accountID = JSON.parse(this.response);
                window.location.href = 'loggedIn.html';
            // Else 
            } else {
                dom.displayLoginError();
            }
        }
        request.send();
    };

    return {
        createAccount,
        checkLogin,
    }
})();

export default account;
