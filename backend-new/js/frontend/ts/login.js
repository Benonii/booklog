"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const email_or_username = document.getElementById('email_or_username').value;
        const password = document.getElementById('password').value;
        // Prepare the data for the API request
        const loginData = {
            email_or_username,
            password
        };
        try {
            const response = yield fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            if (response.ok) {
                const data = yield response.json();
                console.log("Data:", data.data);
                // storing the token in localStorage
                console.log("Token from backend:", data === null || data === void 0 ? void 0 : data.data.accessToken);
                localStorage.setItem('jwtToken', data === null || data === void 0 ? void 0 : data.data.accessToken);
                window.location.href = 'index.html'; // Redirect to dashboard
            }
            else {
                const errorData = yield response.json();
                alert(errorData.message || 'Login failed. Please try again.');
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    }));
});
