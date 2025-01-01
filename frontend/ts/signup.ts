interface SignupData {
    full_name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface SignupAPIResponse {
    messsage: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm') as HTMLFormElement;

    signupForm.addEventListener('submit', async (e: Event) => {
        e.preventDefault();

        const first_name = (document.getElementById('first_name') as HTMLInputElement).value;
        const last_name = (document.getElementById('last_name') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirm_password = (document.getElementById('confirm_password') as HTMLInputElement).value;

        if (password !== confirm_password) {
            alert("Passwords do not match.");
            return;
        }

        const signupData: Omit<SignupData, 'confirm_password'> = {
            full_name: first_name + ' ' + last_name,
            username,
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                const data: ApiResponse = await response.json();

                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 0)
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});