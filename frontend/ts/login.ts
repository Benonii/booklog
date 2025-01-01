interface LoginData {
    email_or_username: string;
    password: string;
}

interface ApiResponse {
    message: string;
    data: {
        accessToken: string;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();

        const email_or_username = (document.getElementById('email_or_username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        // Prepare the data for the API request
        const loginData: LoginData = {
            email_or_username,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data: ApiResponse = await response.json();
                console.log("Data:", data.data);

                // storing the token in localStorage
                console.log("Token from backend:", data?.data.accessToken);
                localStorage.setItem('jwtToken', data?.data.accessToken);
                window.location.href = 'index.html';  // Redirect to dashboard
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
