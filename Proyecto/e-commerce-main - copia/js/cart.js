//url para carrito https://japdevdep.github.io/ecommerce-api/cart/987.json


let productosCarrito=[];
let subTotalProd;
let totalCarrito;

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateSubtotal(count, unitCost, id, currency){
    let subtotalProd = count * unitCost;
    document.getElementById("subtotal"+ id).innerHTML = currency +" "+ subtotalProd;
    calculaTotalCarrito();
}

// para calculat total y pasar dolares en pesos
function calculaTotalCarrito(){
    totalCarrito=0;
    let subtotales = document.getElementsByClassName("subTotal");
       for(subtotal of subtotales){
           let currency= subtotal.innerHTML.split(" ")[0];
           let precio= subtotal.innerHTML.split(" ")[1];
            if(currency=="USD"){
                precio= parseInt(precio)*40;
            }

           totalCarrito= totalCarrito + parseInt(precio);
       }
    
     document.getElementById("carritoTotal").innerHTML = "UYU" + totalCarrito;
}



/*aparece el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){

    /*muestra los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let i = 0;
    for(let article of productosCarrito){
        
        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="precio">${article.currency} ${article.unitCost}</td>
        <td class="align-middle"><input id="cant" type="number" min ="1" value=${article.count} id="${i}" onchange="updateSubtotal(this.value,${article.unitCost},${i},'${article.currency}')"></td>
        <td class="align-middle subTotal"  id="subtotal${i}">${article.currency} ${article.count * article.unitCost}</td>
        </tr>`                   
       
        i++;

        document.getElementById("carritoTotal").innetHTML="UYU"+ article.count * article.unitCost;
    }
    document.getElementById("carrito").innerHTML = htmlToAppend;
    calculaTotalCarrito();
}


function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles;
        showCarrito();
        
    })
})
