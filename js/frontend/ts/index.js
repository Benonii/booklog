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
        if (data && data.data) {
            localStorage.setItem('userData', JSON.stringify(data.data));
        }
    }).catch((error) => {
        console.log("Error verifying token:", error);
        redirectToLogin();
    });
}
;
document.addEventListener('DOMContentLoaded', function () {
    try {
        verifyToken();
    }
    catch (_a) {
        redirectToLogin();
    }
    const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '') : null;
    console.log("User:", user);
    const userDataCtr = document.getElementById('userDataCtr');
    const userEmail = document.createElement('p');
    userEmail.textContent = `${user === null || user === void 0 ? void 0 : user.email}`;
    userEmail.style.marginBottom = '0px';
    const userUsername = document.createElement('p');
    userUsername.className = 'text-secondary';
    userUsername.textContent = `${user === null || user === void 0 ? void 0 : user.username}`;
    userUsername.style.marginBottom = '0px';
    userDataCtr === null || userDataCtr === void 0 ? void 0 : userDataCtr.appendChild(userEmail);
    userDataCtr === null || userDataCtr === void 0 ? void 0 : userDataCtr.appendChild(userUsername);
});
