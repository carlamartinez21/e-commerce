const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cost";
var currentProductsArray = [];
 var currentSortCriteria = undefined;
 var minCount = undefined;
 var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

           if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

             // cambie toda la estructura del html en forma cuadrícula    
            htmlContentToAppend += `
            <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
          <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
          <div class="card-body">
          <div class="card-title">
          <h4 class="mb-1">`+ product.name +`</h4>
          </div>
              <p class="card-text"><p class="mb-1">` + product.description + `</p><p class="mb-1">` + product.currency + product.cost + `</p></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary"><a href="product-info.html">Ver producto</a></button>
                </div>
                <small class="text-muted">` + product.soldCount + ` vendidos</small>
              </div>
            </div>
          </div>
        </div>
        `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
 }


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

     currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL ).then(function(resultObj){
        if (resultObj.status === "ok"){

            
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

      document.getElementById("sortAsc").addEventListener("click", function(){
          sortAndShowProducts(ORDER_ASC_BY_NAME);
      });

      document.getElementById("sortDesc").addEventListener("click", function(){
          sortAndShowProducts(ORDER_DESC_BY_NAME);
      });

      document.getElementById("sortByCount").addEventListener("click", function(){
          sortAndShowProducts(ORDER_BY_PROD_COUNT);
      });

      document.getElementById("clearRangeFilter").addEventListener("click", function(){
          document.getElementById("rangeFilterCountMin").value = "";
          document.getElementById("rangeFilterCountMax").value = "";

          minCount = undefined;
          maxCount = undefined;

          showProductsList();
      });

      document.getElementById("rangeFilterCount").addEventListener("click", function(){
          //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
          //de productos por categoría.
          minCount = document.getElementById("rangeFilterCountMin").value;
          maxCount = document.getElementById("rangeFilterCountMax").value;

          if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
              minCount = parseInt(minCount);
          }
          else{
              minCount = undefined;
          }

          if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
              maxCount = parseInt(maxCount);
          }
          else{
              maxCount = undefined;
          }

          showProductsList();
      });
});