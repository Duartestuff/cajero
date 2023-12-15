let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

document.getElementById('holder').textContent = currentUser.nombreyApellido;
document.getElementById('card-number').textContent = currentUser.Cuenta;