let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

let saldoNumerico = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);

let users = JSON.parse(localStorage.getItem('usuarios')) || undefined;



document.getElementById('transferir').addEventListener('click', ()=>{

    const fields = {
        name: document.getElementById('Nombre').value,
        ID: document.getElementById('id').value,
        banco: document.getElementById('banco').value,
        cuenta: document.getElementById('cuenta').value,
        valor: document.getElementById('valor_transferir').value
    }

    if(!checkFields(fields)){
        alert('Por favor introduzca todos los datos requeridos');
        return;
    }
    if(!checkValor(fields.valor)){
        console.log(fields.valor)
        alert('Por favor introduzca un valor correcto');
        document.getElementById('valor_transferir').value = '';
        return;
    }
    const valorTransaccion = crearValorTransaccion(fields.valor);
    if(!checkRetiro(valorTransaccion.numero)){
        alert('El valor a transferir de ' + valorTransaccion.dinero + ' supera el saldo de tu cuenta.\nSaldo actual de la cuenta: ' + saldoNumerico);
        document.getElementById('valor_transferir').value = '';
        return;
    }
    const usuarioReceptor = getTransferencia(fields.ID, fields.cuenta);
    if(usuarioReceptor == null){
        alert('Usuario receptor con el número de ID ' + fields.ID + ' y el número de cuenta ' + fields.cuenta + ' no existe.\nPor favor revise la información y vuelva a introducirla.')
        document.getElementById('id').value = '';
        document.getElementById('cuenta').value = '';
        return;
    }

    const saldoEmisor = crearValorTransaccion(currentUser.Saldo - valorTransaccion.numero);
    const saldoReceptor = crearValorTransaccion(usuarioReceptor.Saldo + valorTransaccion.numero);

    currentUser.Saldo = saldoEmisor.numero;
    currentUser.Movimientos.push({

        'descripcion': 'Transferencia a cuenta ' + usuarioReceptor.Cuenta,
        'fecha': new Date(),
        'tipo': 'Transferencia',
        'valor': valorTransaccion.numero

    })
    localStorage.setItem('current_user', JSON.stringify(currentUser));
    
    usuarioReceptor.Saldo = saldoReceptor.numero;
    usuarioReceptor.Movimientos.push({
        'descripcion': 'Consignación desde cuenta ' + currentUser.Cuenta,
        'fecha': new Date(),
        'tipo': 'Transferencia',
        'valor': valorTransaccion.numero
    })

    updateUserList(currentUser);
    updateUserList(usuarioReceptor);
    let nuevoSaldo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);
    alertUser(valorTransaccion.dinero, nuevoSaldo, usuarioReceptor.Cuenta);
    document.getElementById('Nombre').value = '';
    document.getElementById('id').value = '';
    document.getElementById('banco').value = '';
    document.getElementById('cuenta').value = '';
    document.getElementById('valor_transferir').value = '';
    window.location.href = '../menu.html';
})


function getTransactionData(){

    return {

        ID: document.getElementById('id').value,
        Cuenta: document.getElementById('cuenta').value

    }

}

function checkFields(fields){

    for(let field in fields){

        if(fields.hasOwnProperty(field)){
            if(fields[field] == '') return false;
        }
    }
    return true;

}

function checkValor(valor){

    let valorNumerico = parseFloat(valor);

    if(isNaN(valorNumerico)){
        return false;
    }
    return true;

}

function crearValorTransaccion(valor){
    let valorNumerico = parseFloat(valor);
    return {
        numero: valorNumerico,
        dinero: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(valorNumerico))
    }

}

function checkRetiro(valor){

    if(currentUser.Saldo - valor < 0) return false;
    return true;

}

function getTransferencia(id, cuenta){

    for(let i = 0; i < users.length; i++){

        if(users[i].id == id && users[i].Cuenta == cuenta){
            if(users[i].id == currentUser.id || users[i].Cuenta == currentUser.Cuenta){
                return null;
            }
            return users[i];
        }

    }
    return null;

}

function updateUserList(currentUser){

    let userList = JSON.parse(localStorage.getItem('usuarios'));

    for(let i = 0; i < userList.length; i++){

        if(userList[i].id == currentUser.id){
            userList[i] = currentUser;
        }

    }

    localStorage.setItem('usuarios', JSON.stringify(userList));

}

function alertUser(valorTransferencia, saldoActual, cuenta){

    alert('Transferencia existosa a la cuenta ' + cuenta + '\nPor valor de ' + valorTransferencia + '\nSaldo actual ' + saldoActual)

}

