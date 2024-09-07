document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Obtener los campos de entrada
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Validar nombre
    if (nombreInput.value.trim() === '') {
        showError(nombreInput, 'Este campo es obligatorio.');
        isValid = false;
    } else {
        clearError(nombreInput);
    }

    // Validar apellido
    if (apellidoInput.value.trim() === '') {
        showError(apellidoInput, 'Este campo es obligatorio.');
        isValid = false;
    } else {
        clearError(apellidoInput);
    }

    // Validar el correo electrónico
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Introduce un correo válido.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validar la contraseña
    if (passwordInput.value.length < 6) {
        showError(passwordInput, 'La contraseña debe tener al menos 6 caracteres.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    if (isValid) {
        this.submit(); // Si es válido, enviamos el formulario
    }
});

// Funciones auxiliares para mostrar/limpiar errores y validar el correo electrónico
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Validación en tiempo real
document.querySelectorAll('#registerForm input').forEach(input => {
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
