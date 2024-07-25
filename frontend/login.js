document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log('submitting');
    console.log(username);
    console.log(password);

    if (!username || !password) {
        alert('Please fill in both username and password.');
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'attendance.html'; // Redirect to attendance page
        } else {
            const data = await response.json();
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
});
