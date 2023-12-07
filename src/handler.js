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
                let [email, password] = dom.getLoginFormInputs();
                account.searchAccount(email, password);
            }
        })
    }

    return { handleClicks };
})();

export default handler;