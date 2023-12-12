import handler from './handler';
import dom from './dom';

handler.handleClicks();

// If not logged in, show login form
if (localStorage.getItem('accountID')) {
    dom.userLoggedIn();
} 


