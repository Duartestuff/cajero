document.getElementById('logout').addEventListener('click', ()=>{

    let currentUser = JSON.parse(localStorage.getItem('current_user'));

    currentUser.Movimientos.push(
        {
            'descripcion': 'Salir de la sesión',
            'fecha': new Date(),
            'tipo': 'Logueo'
        }
    )

    updateUserList(currentUser);
    localStorage.setItem('current_user', '');
    window.location.href = '../Logout.html';


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