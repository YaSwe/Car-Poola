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
    let url = 'http://localhost:5000/api/v1/accounts';

    const searchAccount = (email, password) => {
        let searchURL = url + `?email=${email}&password=${password}`;
        let request = new XMLHttpRequest();
        request.open('GET', searchURL);
    
        request.onload = function() {
            let accountID = JSON.parse(this.response);
            // If email and password are found
            if (request.status == 200) {
                console.log(accountID)
            // Else
            } else {
                console.log("error")
            }
        }
        request.send();
    };

    return {
        searchAccount,
    }
})();

export default account;
