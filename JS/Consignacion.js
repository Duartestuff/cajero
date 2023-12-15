let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

let saldoNumerico = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);


document.getElementById('saldo-actual').textContent = saldoNumerico;

document.getElementById('consignar').addEventListener('click', ()=>{

    let valor = document.getElementById('valor');
    if(valor.value == ''){
        alert('Por favor introduzca un valor para la consignación');
        return;
    }

    let valorNumerico = parseFloat(valor.value);

    if(isNaN(valorNumerico)){
        alert('Por favor introduzca un valor numérico');
        valor.value = '';
        return;
    } 

    currentUser.Saldo += valorNumerico;
    currentUser.Movimientos.push({
        'descripcion': 'Consignación a la cuenta',
        'fecha': new Date(),
        'tipo': 'Consignación',
        'valor': valorNumerico
    })
    let consignacionValorPesos = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valorNumerico);

    alert('Ha realizado una consignación a su cuenta por ' + consignacionValorPesos);
    valor.value = '';
    saldoNumerico = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentUser.Saldo);
    document.getElementById('saldo-actual').textContent = saldoNumerico;

    

    localStorage.setItem('current_user', JSON.stringify(currentUser));
    updateUserList(currentUser)
    window.location.href = '../menu.html';
})

function updateUserList(currentUser){

    let userList = JSON.parse(localStorage.getItem('usuarios'));

    for(let i = 0; i < userList.length; i++){

        if(userList[i].id == currentUser.id){
            userList[i] = currentUser;
        }

    }

    localStorage.setItem('usuarios', JSON.stringify(userList));

}