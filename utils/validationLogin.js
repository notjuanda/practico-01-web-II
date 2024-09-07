document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Obtener los campos de entrada
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validar el correo electrónico
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Introduce un correo válido.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validar la contraseña
    if (passwordInput.value.length < 4) {
        showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    if (isValid) {
        this.submit(); // Si es válido, enviamos el formulario
    }
});

// Función para mostrar errores dinámicamente
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
}

// Función para limpiar los errores
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
}

// Validar correo electrónico con expresiones regulares
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Validación en tiempo real
document.querySelectorAll('#loginForm input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.id === 'email' && !validateEmail(this.value)) {
            showError(this, 'Introduce un correo válido.');
        } else if (this.id === 'password' && this.value.length < 6) {
            showError(this, 'La contraseña debe tener al menos 6 caracteres.');
        } else {
            clearError(this);
        }
    });
});
