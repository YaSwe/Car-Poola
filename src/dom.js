const dom = (() => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');


    // Toggle sidebar
    const toggleSidebar = () => {
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            content.classList.remove('active');
            hamburger.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            content.classList.add('active');
            hamburger.classList.add('active');
        }
    }

    // Retrieve login inputs and check inputs
    const getLoginFormInputs = () => {
        const emailInputValue = document.querySelector('#email').value;
        const passwordInputValue= document.querySelector('#password').value;

        return [emailInputValue, passwordInputValue];
    }

    return {
        toggleSidebar,
        getLoginFormInputs,
    }

})();

export default dom;