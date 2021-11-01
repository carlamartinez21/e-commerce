// para obtener los datos
function getData(){
    var nombre1 = document.getElementById("nombre1").value
    var nombre2 = document.getElementById("nombre2").value
    var apellido1 = document.getElementById("apellido1").value
    var apellido2 = document.getElementById("apellido2").value
    var edad = document.getElementById("edad").value
    var ema = document.getElementById("ema").value
    var tele = document.getElementById("tele").value

    var datos = { nombre1, nombre2, apellido1, apellido2, edad, ema, tele }
    return datos;
}

// agarra los contenidos de los imputs y los guarda en un objeto, ese objeto lo convierto en unJSON.stringify para juardarlo en el LocalStorage
function saveData(){
    localStorage.setItem("usuario",JSON.stringify(getData()));
}

// para establecer los datos
function setDeFault(){
    var datos = localStorage.getItem("usuario");
    datos = JSON.parse(datos);

    document.getElementById("nombre1").value = datos.nombre1
    document.getElementById("nombre2").value = datos.nombre2
    document.getElementById("apellido1").value = datos.apellido1
    document.getElementById("apellido2").value = datos.apellido2
    document.getElementById("edad").value = datos.edad
    document.getElementById("ema").value = datos.ema
    document.getElementById("tele").value = datos.tele
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    setDeFault();
});
