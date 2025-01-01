type User = {
    id: string;
    email: string;
    full_name: string;
    username: string;
};

interface MeApiResponse {
    user: User;
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
        if (data && data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
        }
    }).catch((error: Error) => {
        console.log("Error verifying token:", error);
        redirectToLogin();
    });
};

document.addEventListener('DOMContentLoaded', verifyToken);