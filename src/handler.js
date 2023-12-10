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
                let courseData = dom.getFormInputs('signUp');
                account.createAccount(courseData);
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
                dom.displayLoginForm();
                dom.userLoggedOut();
            }

            // Sidebar links
            if (e.target.classList.contains('select')) {
                const displayLink = e.target.getAttribute('data-link');
                dom.selectLink(e.target, displayLink);
            }

            if (
                e.target.getAttribute('id') == 'car-owner' || 
                e.target.getAttribute('id') == 'passenger') 
            {
                dom.toggleCarOwnerDOM(e.target.getAttribute('id'));
            } 
        })
    }

    return { handleClicks };
})();

export default handler;