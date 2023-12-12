import dom from './dom';
import account from './account';

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

            // Signup Btn 
            if (e.target.classList.contains('signUpBtn')) {
                let accountData = dom.getFormInputs('signUp');
                account.createAccount(accountData);
            }

            // Display registration form
            if (e.target.classList.contains('displaySignUp')) {
                dom.displaySignUpForm();
            }

            // Display login form
            if (e.target.classList.contains('displayLogin')) {
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

            if (
                e.target.getAttribute('id') == 'car-owner' || 
                e.target.getAttribute('id') == 'passenger') 
            {
                dom.toggleCarOwnerDOM(e.target.getAttribute('id'));
            } 

            if (e.target.classList.contains('updateBtn')) {
                let accountData = dom.getFormInputs('update');
                account.updateAccount(accountData);
            }

            if (e.target.classList.contains('delBtn')) {
                e.preventDefault();
                dom.displayDeleteModal();
            }

            if (e.target.classList.contains('confirmDelBtn')) {
                //account.deleteAccount();
            }

            if (e.target.classList.contains('cancelDelBtn')) {
                dom.closeDeleteModal();
            }
        })
    }

    return { handleClicks };
})();

export default handler;