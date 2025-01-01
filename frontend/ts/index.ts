type User = {
    id: string;
    email: string;
    full_name: string;
    username: string;
};

interface MeApiResponse {
    data: User;
};

const token: string | null = localStorage.getItem('jwtToken');

function redirectToLogin(): void {
    window.location.href = 'login.html'
}

// Verify token exists and is valid
function verifyToken(): void {
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
    }).then((data: MeApiResponse | undefined) => {
        if (data && data.data) {
            localStorage.setItem('userData', JSON.stringify(data.data));
        }
    }).catch((error: Error) => {
        console.log("Error verifying token:", error);
        redirectToLogin();
    });
};

document.addEventListener('DOMContentLoaded', function() {
    try {
        verifyToken();
    } catch {
        redirectToLogin();
    }

    const user: Partial<User> | null = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '') : null;
    console.log("User:", user)
    const userDataCtr = document.getElementById('userDataCtr');
    const userEmail = document.createElement('p')
    userEmail.textContent = `${user?.email}`;
    userEmail.style.marginBottom = '0px'
    const userUsername = document.createElement('p')
    userUsername.className = 'text-secondary';
    userUsername.textContent = `${user?.username}`;
    userUsername.style.marginBottom = '0px'



    userDataCtr?.appendChild(userEmail);
    userDataCtr?.appendChild(userUsername);
});