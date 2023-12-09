let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

let saldoNumerico = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);

document.getElementById('nombre-usuario').textContent = currentUser.nombreyApellido;
document.getElementById('saldo-usuario').textContent = saldoNumerico;

