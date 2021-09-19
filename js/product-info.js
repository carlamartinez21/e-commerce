var product = {};
var comentarios = [];
// Comentarios

 function comentariosJSON(){ //va a estar mostrando los comentarios en el HTML luego de obtener del getJSONData
     let htmlContentToAppend = "";
     for(let i=0; i<comentarios.length; i++){
         let comentario= comentarios[i];
        console.log(comentario.dateTime);

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ comentario.user +`</h4>
                        <div id="estrellas">
        `
        for(let i=1; i<=5; i++){
            if(i<=comentario.score){
                htmlContentToAppend += "<span class='fa fa-star checked'></span>"
            }
            else{
                htmlContentToAppend += "<span class='fa fa-star'></span>"
            }
    
        }

        htmlContentToAppend += `
                     </div>
                </div>
                <p class="mb-1">` + comentario.description + `</p>   
            </div>
             <p class="mb-1">` + comentario.dateTime + `</p>
        </div>`
    };
    document.getElementById("comentarios").innerHTML = htmlContentToAppend
 }

function showImages(array){ //recorre las imagenes

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
     getJSONData(PRODUCT_INFO_URL).then(function(resultObj){ //información del producto
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImages(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){ //Comentarios del producto
            if (resultObj.status === "ok"){
                comentarios= resultObj.data
                comentariosJSON();
               

            }
    });
})


var contador;

function calificar(item){
    console.log(item);
    contador = item.id[0];//capture el primer caracter
    let nombre = item.id.substring(1);//4 estrella captura todos menos el primer caracter
    for(let i=0; i<5; i++){
        if(i<contador){
            document.getElementById((i+1)+nombre).style.color="orange";//primera vez 0+1 = 1+esrella;
        }
        else{
            document.getElementById((i+1)+nombre).style.color="black";
        }
    }
}
