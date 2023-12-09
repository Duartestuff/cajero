document.getElementById("guardar").addEventListener("click", function () {
  //toma los datos del formulario, los llama y los almacena en una variable con la que trabaja el js
  let user = document.getElementById("user").value;
  let nombreyApellido = document.getElementById("nombreyApellido").value;
  let id = document.getElementById("id").value;
  let expedicion = document.getElementById("expedicion").value;
  let password = document.getElementById("password").value;
  let password_comprobar = document.getElementById("password_comprobar").value;

  //valida que los campos no esten vacios
  // || es un operador logico que significa "o"
  if (
    user == "" ||
    nombreyApellido == "" ||
    id == "" ||
    expedicion == "" ||
    password == "" ||
    password_comprobar == ""
  ) {
    alert("Todos los campos son obligatorios");
    return false;
  }

  //valida que el nombre de usuario tenga mas de 3 caracteres
  if (user.length < 3) {
    alert("El nombre de usuario debe tener al menos 3 caracteres");
    return false;
  }

  //validar que el user y el id sea unico
  //trae los datos del local storage y los almacena en una variable
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  //recorre el array de usuarios y valida que el user y el id no este repetido
  for (let i = 0; i < usuarios.length; i++) {
    if (user == usuarios[i].user) {
      alert("El nombre de usuario ya existe");
      return false;
    }
    if (id == usuarios[i].id) {
      alert("El numero de identificacion ya existe");
      return false;
    }
  }
  //valida  que coinsida las contraseñas
  if (password != password_comprobar) {
    alert("Las contraseñas no coinciden");
    return false;
  }

  //validar que la contraseña tenga al menos 8 caracteres, un caracter especial, una mayuscula y un numero
  //expresion regular
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  /*valida que las condicionales del regex se cumplan con la variable que le 
    estamos dando en los parentesis, si es no se cumple retorna false y da la alerta*/
  if (regex.test(password) == false) {
    alert(
      "La contraseña debe tener al menos 8 caracteres, una mayuscula, un numero y un caracter especial"
    );
    return false;
  }

  const numeroDecuenta = Math.floor(
    10000000000 + Math.random() * 90000000000
  ).toString();
  const fecha = new Date();
  //crea un objeto con los datos del formulario para enviarlo al local storage
  let usuario = {
    user: user,
    Cuenta: numeroDecuenta,
    id: id,
    nombreyApellido: nombreyApellido,
    expedicion: expedicion,
    password: password,
    Saldo: 200000,
    Movimientos: [
      {
        fecha: fecha,
        descripcion: "Apertura de cuenta",
        valor: 200000,
        tipo: "Consignación",
      },
    ],
  };

  // almacena el objeto en el array de usuarios
  usuarios.push(usuario);
  //almacena el objeto en el local storage JSON.stringify convierte el objeto en un string
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  //alerta de que el usuario se creo correctamente
  alert("Usuario creado correctamente");

  //limpia el formulario
  document.getElementById("user").value = "";
  document.getElementById("nombreyApellido").value = "";
  document.getElementById("id").value = "";
  document.getElementById("expedicion").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password_comprobar").value = "";
});
