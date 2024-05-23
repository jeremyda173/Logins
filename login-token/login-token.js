document.addEventListener("DOMContentLoaded", function () {
    const planeCursor = document.querySelector('.custom-cursor');

    // Ocultamos el cursor original
    document.body.style.cursor = 'none';

    // Mostramos el cursor del avión
    planeCursor.style.display = 'block';

    // Seguir el cursor con el avión
    document.addEventListener('mousemove', function (e) {
        planeCursor.style.left = `${e.clientX}px`;
        planeCursor.style.top = `${e.clientY}px`;
    });
})


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                errorMessage.textContent = 'Login successful!';
                errorMessage.style.color = 'green';
                // Redirigir o realizar otras acciones
            } else {
                errorMessage.textContent = data.message || 'Error en el inicio de sesión';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Error en el servidor';
        });
    });

    // Custom cursor logic
    const cursorImage = document.querySelector('.custom-cursor');
    if (cursorImage) {
        cursorImage.style.display = 'block';
        document.body.style.cursor = `url(${cursorImage.src}), auto`;
    }
});