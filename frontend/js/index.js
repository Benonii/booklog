"use strict";
;
const token = localStorage.getItem('jwtToken');
function redirectToLogin() {
    window.location.href = 'login.html';
}
// Verify token exists and is valid
function verifyToken() {
    if (!token) {
        redirectToLogin();
        return;
    }
    fetch("http://localhost:3000/api/auth/me", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(response => {
        if (!response.ok) {
            redirectToLogin();
            return;
        }
        return response.json();
    }).then((data) => {
        if (data && data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
        }
    }).catch((error) => {
        console.log("Error verifying token:", error);
        redirectToLogin();
    });
}
;
document.addEventListener('DOMContentLoaded', verifyToken);
