let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

let saldoActualDinero = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);

let botonRetirar = document.getElementById('retirar');

if(botonRetirar.textContent == 'Retirar Cajero'){
    botonRetirarCajero('Retiro Cajero');
}else if(botonRetirar.textContent == 'Retirar Sucursal'){

    document.getElementById('numero_cuenta').textContent = currentUser.Cuenta;
    document.getElementById('codigo').textContent = Math.floor(100000 + Math.random() * 900000);
    botonRetirarCajero('Retiro Sucursal');

}

function botonRetirarCajero(tipoRetiro){
    botonRetirar.addEventListener('click', ()=>{
            
        let valorRetirar = document.getElementById('valor_retirar');

        if(!checkNumber(valorRetirar.value)){
            alert('Por favor introduzca un valor válido');
            valorRetirar.value = '';
            return;
        }
        let valorNumerico = parseFloat(valorRetirar.value);
        let valorDinero = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valorNumerico);

        if(!checkRetiro(valorNumerico)){
            alert('No puedes retirar esa cantidad, excedes los fondos de tu cuenta, saldo actual: ' + saldoActualDinero);
            return;
        }

        let saldoNuevo = currentUser.Saldo - valorNumerico;
        let saldoNuevoDinero = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(saldoNuevo);

        alert('Retiro exitoso por ' + valorDinero);
        alert('Su saldo ahora es ' + saldoNuevoDinero);

        currentUser.Saldo = saldoNuevo;
        movimientoUpdate(tipoRetiro, valorNumerico);
        localStorage.setItem('current_user', JSON.stringify(currentUser));

        updateUserList(currentUser);

        valorRetirar.value = '';
    })    
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

function checkNumber(valor){

    let valorParse = parseFloat(valor);

    if(isNaN(valorParse)) return false;
    return true;

}

function checkRetiro(valor){

    if((currentUser.Saldo - valor) < 0) return false;
    return true;

}

function movimientoUpdate(tipoRetiro, valor){

    currentUser.Movimientos.push({

        'descripcion': tipoRetiro,
        'fecha': new Date(),
        'tipo': 'Retiro',
        'valor': valor

    })

}