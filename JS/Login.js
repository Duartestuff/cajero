const fallo = 'Usuario o contraseña incorrectos';

document.getElementById('login').addEventListener('click', ()=>{


    let userList = JSON.parse(localStorage.getItem('usuarios')) || [];

    if(userList.length == 0){
        alert(fallo);
        return;
    }

    let user = document.getElementById('username').value;
    let pw = document.getElementById('password').value;
    let currentUser; // Usuario actual
    let logged = false;// Si se logueo o no

    for(let i = 0; i < userList.length; i++){
        
        if(userList[i].user == user && userList[i].password == pw){
            currentUser = userList[i];
            userList[i].Movimientos.push(
                {
                    'descripcion': 'Logueo a la cuenta',
                    'fecha': new Date(),
                    'tipo': 'Logueo'
                }
            )
            logged = true;
        }

    }

    if(logged){

        localStorage.setItem('current_user', JSON.stringify(currentUser));
        updateUserList(currentUser);
        alert('Bienvenido: ' + currentUser.nombreyApellido);
        window.location.href = 'html/menu.html';

    }else alert(fallo);


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