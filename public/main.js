
// Event listener for comment submission
document.addEventListener('submit', async (event) => {
    if (event.target.matches('.comment-form')) {
        event.preventDefault(); // Prevent the normal submission action
        const form = event.target;
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data
            });
            if (response.ok) {
                const newComment = await response.json();
                appendComment(newComment); // Function to add the comment to the DOM
                form.reset(); // Reset the form fields after successful submission
            } else {
                throw new Error('Failed to submit comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    }
});

function appendComment(comment) {
    const commentList = document.querySelector('.comments-list');
    const commentElement = document.createElement('li');
    commentElement.textContent = comment.text; 
    commentList.appendChild(commentElement);
}
// handling login response
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log("hello login form ");
        const formData = new FormData(loginForm);
        try {
            const response = await fetch('/login', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                window.location.href = '/reservations';  // Redirect on successful login
            } else {
                // Display error message directly on the form
                displayLoginError(result.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    });
}

function displayLoginError(message) {
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block'; 
}
// Handling logout functionality

document.getElementById('logout-link').addEventListener('click', async () => {
    const response = await fetch('/logout', { method: 'POST' });
    if (response.ok) {
        window.location.replace('/');
       // window.location.href = '/login';
        console.log('Logged out successfully');
    } else {
        console.error('Logout failed:', await response.text());
    }
});

