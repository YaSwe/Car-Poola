import handler from './handler';
import dom from './dom';

handler.handleClicks();

const accountID = localStorage.getItem('accountID');

if (!accountID) {
    dom.displayLoginForm();
} 
else {
    dom.userLoggedIn('passenger');
}
