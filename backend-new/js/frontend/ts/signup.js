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
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        if (password !== confirm_password) {
            alert("Passwords do not match.");
            return;
        }
        const signupData = {
            full_name: first_name + ' ' + last_name,
            username,
            email,
            password,
        };
        try {
            const response = yield fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });
            if (response.ok) {
                const data = yield response.json();
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 0);
            }
            else {
                const errorData = yield response.json();
                alert(errorData.message || "Signup failed. Please try again.");
            }
        }
        catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again later.');
        }
    }));
});
