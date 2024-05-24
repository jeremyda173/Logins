document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aquí iría la lógica para enviar las credenciales al servidor
        // y obtener el token JWT
        
        // Supongamos que se recibe un token JWT válido
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNjIwMjg2OTc5LCJleHAiOjE2MjAyOTI5Nzl9.FXk5fn6hUEm4gsLVaR1bsoO82vZzmBbzP_0nA2cbA88';
        
        // Almacenar el token en localStorage
        localStorage.setItem('token', token);

        // Redirigir a otra página
        window.location.href = 'perfil.html';
    });
});
