
// Obtener los elementos del formulario
const form = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

// Agregar un evento de escucha al formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de usuario y contraseña
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Realizar la lógica de inicio de sesión aquí
  // Por ejemplo, puedes hacer una petición a un servidor para verificar las credenciales

  // Limpiar los campos del formulario
  usernameInput.value = '';
  passwordInput.value = '';
});
