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
                let accountData = JSON.parse(this.response);
                localStorage.setItem('accountID', accountData.id);
                localStorage.setItem('userType', accountData.userType);
                dom.userLoggedIn();
                return;
            } 
        }
        request.send();
        // If email and password not found
        dom.displayLoginError();
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
                dom.displayUpdateMessage('success');
                return;
            } 
        }
        request.send(JSON.stringify(accountData));
        // Display error
        dom.displayUpdateMessage('error');
    }

    return {
        createAccount,
        checkLogin,
        getAccount,
        updateAccount,
    }
})();

export default account;
