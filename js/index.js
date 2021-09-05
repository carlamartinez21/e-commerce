function validar(){
    let nombre = document.getElementById("nombre").value;
    let pass = document.getElementById("pass").value;
    if ((nombre !=="")&&(pass !=="")){
        setUser();
        window.location.href="home.html";
    }
    else{
      alert("Los campos deben ser completados");  
    }
}

//document.addEventListener("DOMContentLoad")

// Guarda en nombre del usuario
function setUser(){
  let nombre = document.getElementById("nombre").value;
  localStorage.setItem("user",nombre);
}