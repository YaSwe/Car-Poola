/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/account.js":
/*!************************!*\
  !*** ./src/account.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Account = (accountID, firstName, lastName, mobileNo, email, driverLicenseNumber, carPlateNumber, password) => {
    undefined.accountID = accountID;
    undefined.firstName = firstName;
    undefined.lastName = lastName;
    undefined.mobileNo = mobileNo;
    undefined.email = email;
    undefined.driverLicenseNumber = driverLicenseNumber;
    undefined.carPlateNumber = carPlateNumber;
    undefined.password = password;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (account);


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dom);

/***/ }),

/***/ "./src/handler.js":
/*!************************!*\
  !*** ./src/handler.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _account__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account */ "./src/account.js");



const handler = (() => {

    const handleClicks = () => {
        document.addEventListener('click', (e) => {
            // Toggle sidebar
            if (
                e.target.classList.contains('hamburger') ||
                e.target.classList.contains('burger-line')
            ) {
                _dom__WEBPACK_IMPORTED_MODULE_0__["default"].toggleSidebar();
            }

            // Login button
            if (e.target.classList.contains('loginBtn')) {
                let [email, password] = _dom__WEBPACK_IMPORTED_MODULE_0__["default"].getLoginFormInputs();
                _account__WEBPACK_IMPORTED_MODULE_1__["default"].searchAccount(email, password);
            }
        })
    }

    return { handleClicks };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "./src/handler.js");


_handler__WEBPACK_IMPORTED_MODULE_0__["default"].handleClicks();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1IsSUFBSSxTQUFJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU0sWUFBWSxTQUFTO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDTTtBQUNRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDRDQUFHO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLDRDQUFHO0FBQzNDLGdCQUFnQixnREFBTztBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsYUFBYTtBQUNiLENBQUM7QUFDRDtBQUNBLGlFQUFlLE9BQU87Ozs7OztVQzFCdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05nQztBQUNoQztBQUNBLGdEQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FyLXBvb2xhL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXItcG9vbGEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXItcG9vbGEvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYXItcG9vbGEvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQWNjb3VudCA9IChhY2NvdW50SUQsIGZpcnN0TmFtZSwgbGFzdE5hbWUsIG1vYmlsZU5vLCBlbWFpbCwgZHJpdmVyTGljZW5zZU51bWJlciwgY2FyUGxhdGVOdW1iZXIsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICB0aGlzLmFjY291bnRJRCA9IGFjY291bnRJRDtcclxuICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgdGhpcy5sYXN0TmFtZSA9IGxhc3ROYW1lO1xyXG4gICAgdGhpcy5tb2JpbGVObyA9IG1vYmlsZU5vO1xyXG4gICAgdGhpcy5lbWFpbCA9IGVtYWlsO1xyXG4gICAgdGhpcy5kcml2ZXJMaWNlbnNlTnVtYmVyID0gZHJpdmVyTGljZW5zZU51bWJlcjtcclxuICAgIHRoaXMuY2FyUGxhdGVOdW1iZXIgPSBjYXJQbGF0ZU51bWJlcjtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxufVxyXG5cclxuY29uc3QgYWNjb3VudCA9ICgoKSA9PiB7XHJcbiAgICBsZXQgdXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9hcGkvdjEvYWNjb3VudHMnO1xyXG5cclxuICAgIGNvbnN0IHNlYXJjaEFjY291bnQgPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlYXJjaFVSTCA9IHVybCArIGA/ZW1haWw9JHtlbWFpbH0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBzZWFyY2hVUkwpO1xyXG4gICAgXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IGFjY291bnRJRCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIC8vIElmIGVtYWlsIGFuZCBwYXNzd29yZCBhcmUgZm91bmRcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWNjb3VudElEKVxyXG4gICAgICAgICAgICAvLyBFbHNlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VhcmNoQWNjb3VudCxcclxuICAgIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjY291bnQ7XHJcbiIsImNvbnN0IGRvbSA9ICgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyk7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5cclxuXHJcbiAgICAvLyBUb2dnbGUgc2lkZWJhclxyXG4gICAgY29uc3QgdG9nZ2xlU2lkZWJhciA9ICgpID0+IHtcclxuICAgICAgICBpZiAoc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGhhbWJ1cmdlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBoYW1idXJnZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHJpZXZlIGxvZ2luIGlucHV0cyBhbmQgY2hlY2sgaW5wdXRzXHJcbiAgICBjb25zdCBnZXRMb2dpbkZvcm1JbnB1dHMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW1haWxJbnB1dFZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmRJbnB1dFZhbHVlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtlbWFpbElucHV0VmFsdWUsIHBhc3N3b3JkSW5wdXRWYWx1ZV07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b2dnbGVTaWRlYmFyLFxyXG4gICAgICAgIGdldExvZ2luRm9ybUlucHV0cyxcclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCBhY2NvdW50IGZyb20gJy4vYWNjb3VudCc7XHJcblxyXG5jb25zdCBoYW5kbGVyID0gKCgpID0+IHtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDbGlja3MgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUb2dnbGUgc2lkZWJhclxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hhbWJ1cmdlcicpIHx8XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlci1saW5lJylcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkb20udG9nZ2xlU2lkZWJhcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBMb2dpbiBidXR0b25cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbG9naW5CdG4nKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IFtlbWFpbCwgcGFzc3dvcmRdID0gZG9tLmdldExvZ2luRm9ybUlucHV0cygpO1xyXG4gICAgICAgICAgICAgICAgYWNjb3VudC5zZWFyY2hBY2NvdW50KGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGhhbmRsZUNsaWNrcyB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlcjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBoYW5kbGVyIGZyb20gJy4vaGFuZGxlcic7XHJcblxyXG5oYW5kbGVyLmhhbmRsZUNsaWNrcygpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=