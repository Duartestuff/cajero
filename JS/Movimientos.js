let currentUser = JSON.parse(localStorage.getItem('current_user')) || undefined;

let movmientos = currentUser.Movimientos;
let movimientosElement = document.getElementById('movimientos');

for(let i = 0; i < movmientos.length; i++){

    let contenedor = document.createElement('div');
    contenedor.classList.add('detalle-container');

    for(let detalle in movmientos[i]){

        let titulo = document.createElement('h2');
        titulo.textContent = detalle;
        let detail = document.createElement('p');
        detail.textContent = movmientos[i][detalle];
        contenedor.append(titulo);
        contenedor.append(detail);
    }
    movimientosElement.append(contenedor);

}