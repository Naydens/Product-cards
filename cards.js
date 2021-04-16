const minusQuantity = document.querySelectorAll(".js-minus-quantity");

const plusQuantity = document.querySelectorAll(".js-plus-quantity");

const cartQuantity = document.querySelector(".js-cart-quantity");

const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

const inputCount = document.querySelectorAll(".js-cart-count");

const ddd = document.querySelector(".header");
ddd.addEventListener("click", losd);
function losd(){
  console.log("click");
  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>loadF(json))
}
function loadF(data){
  let divContainer=document.querySelector(".container");

  let divCard = document.createElement("div");
  let imgCard = document.createElement("img");
  let h4FP = document.createElement("h4");
  let pDesc = document.createElement("p");
  let h4SP = document.createElement("h4");
  let divTablo = document.createElement("div");
  let buttonM = document.createElement("button");
  let buttonP = document.createElement("button");
  let buttonAdd = document.createElement("button");
  let inputCount = document.createElement("input");

  divCard.className = "card container__card js-div-card";
  document.body.appendChild(divCard);

  imgCard.className="imgProduct card__imgProduct js-img-photo";
  imgCard.src = data[1].image;
  imgCard.alt = "photo producta";
  divCard.appendChild(imgCard);

  h4FP.className = "price card__price js-h4-priceFirst";
  h4FP.innerHTML = data[1].price;
  divCard.appendChild(h4FP);

  pDesc.className ="description card__description js-p-description";
  pDesc.innerHTML = data[1].description;
  divCard.appendChild(pDesc);

  h4SP.className = "card__fileName js-h4-priceSecond";
  h4SP.innerHTML = data[1].price;
  divCard.appendChild(h4SP);

  divTablo.className = "positionInTablo card__tablo js-div-tablo";

  buttonM.className = "js-minus-quantity amount";
  buttonM.innerHTML = "&#8722";
  divTablo.appendChild(buttonM);


  inputCount.className = "js-cart-count  count";
  inputCount.value="1";
  inputCount.name = "card__count";
  divTablo.appendChild(inputCount);

  buttonP.className = "js-plus-quantity amount";
  buttonP.innerHTML = "&#43";
  divTablo.appendChild(buttonP);

  buttonAdd.className = "addToCart js-add-to-cart";
  buttonAdd.innerHTML = "add to cart";
  buttonAdd.setAttribute("data-product-id","1");
  divTablo.appendChild(buttonAdd);

  divCard.appendChild(divTablo);
}




  /* validation */

  for (let i = 0; i < inputCount.length; i++) {
    const elem = inputCount[i];
    elem.addEventListener("input", OnlyNumbersValidation);

    function OnlyNumbersValidation(e) {
      e.target.value = e.target.value.replace(/[^\d]{5}/g, "");
    }
  }

  function validate(text, rules) {
    console.log(typeof text);
  }

  /* events focus start */

  for (let i = 0; i < inputCount.length; i++) {
    const elem = inputCount[i];
    elem.addEventListener("focus", function (e) {
      e.target.value = "";
    });
  }

  /* events focus end */

  /* function add to cart start*/
  for (let i = 0; i < addToCartButtons.length; i++) {
    const elem = addToCartButtons[i];
    elem.addEventListener("click", addToCart);
  }

  function addToCart(e) {
    const productId = e.target.getAttribute("data-product-id");
    const quantity = parseInt(
      e.target.parentNode.querySelector(".js-cart-count").value
    );
    if (cart[productId] === undefined) {
      cart[productId] = quantity;
    } else {
      cart[productId] += quantity;
    }

    cartQuantity.innerHTML = calculateTotalCartItems();
  }

  const cart = {};

  function calculateTotalCartItems() {
    let total = 0;
    for (let key in cart) {
      total += cart[key];
    }
    return total;
  }
  /* function add to cart end*/

  /* function minus start */

  for (let i = 0; i < minusQuantity.length; i++) {
    const elem = minusQuantity[i];
    elem.addEventListener("click", minus);
  }

  function minus(e) {
    const input = e.target.nextSibling.nextSibling;
    if (input.value > 1) {
      input.value--;
    }
  }
  /* function minus end */

  /* function plus start */

  for (let i = 0; i < plusQuantity.length; i++) {
    const elem = plusQuantity[i];
    elem.addEventListener("click", plus);
  }

  function plus(e) {
    const input = e.target.previousSibling.previousSibling;
    if (input.value < input.size) {
      input.value++;
    }
  }
/* function plus end */

// for(let i = 0;i<inputCount.length;i++){
//   const elem = inputCount[i];
//   elem.addEventListener("blur", function(e) {
//     e.target.value = 1;
//     console.log(e.target.value)
//     })
// }

// function putDataOnPage(data) {
//   divContainer = document.querySelector("container");


//   for (let i = 0; i < 5; i++) {
//     let divCard = document.createElement("div");
//     let imgPhoto = document.createElement("img");
//     let h4PriceF = document.createElement("h4");
//     let h4PriceS = document.createElement("h4");
//     let pDescription = document.createElement("p");
//     let divTablo = document.createElement("div");
//     let buttonMinus = document.createElement("button");
//     let buttonPlus = document.createElement("button");
//     let input = document.createElement("input");
//     let buttonAddTo = document.createElement("div");

//     divCard.className = "card container__card js-div-card";
//     imgPhoto.className = "imgProduct card__imgProduct js-img-photo";
//     h4PriceF.className = "price card__price js-h4-priceFirst";
//     h4PriceS.className = "card__fileName js-h4-priceSecond";
//     pDescription.className = "description card__description js-p-description";
//     divTablo.className = "description card__description js-p-description";
//     buttonMinus.className = "js-minus-quantity amount";
//     buttonPlus.className = "js-plus-quantity amount";
//     input.className = "js-cart-count  count";
//     buttonAddTo.className = "addToCart js-add-to-cart";

//     h4PriceF.innerHTML = data[i].price;
//     h4PriceS.innerHTML = data[i].price;
//     pDescription.innerHTML = data[i].description;
//     buttonMinus.innerHTML = "&#8722";
//     buttonPlus.innerHTML = "&#43";
//     buttonAddTo.innerHTML = "add to cart";

//     divContainer.appendChild(divCard);
//     divCard.appendChild(imgPhoto);
//     divCard.appendChild(h4PriceF);
//     divCard.appendChild(pDescription);

//     divCard.appendChild(h4PriceS);
//     divCard.appendChild(divTablo);
//     divTablo.appendChild(buttonMinus);
//     divTablo.appendChild(inputCount);
//     divTablo.appendChild(buttonPlus);
//     divTablo.appendChild(buttonAddTo);
  
//   }
//   document.body.appendChild(divContainer);
// }
