const minusQuantity = document.querySelectorAll(".js-minus-quantity");

const plusQuantity = document.querySelectorAll(".js-plus-quantity");

const cartQuantity = document.querySelector(".js-cart-quantity");

const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

const inputCount = document.querySelectorAll(".js-cart-count");

/* fetch, show data on page start */
window.addEventListener("load", fetchFakeApi);

// window.addEventListener("load", showQuantityItems);

function fetchFakeApi() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => showInfoCards(json));
}
function showInfoCards(data) {
  let divContainer = document.querySelector(".container");

  for (let i = 0; i < data.length; i++) {
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
    divContainer.appendChild(divCard);

    imgCard.className = "imgProduct card__imgProduct js-img-photo";
    imgCard.src = data[i].image;
    imgCard.alt = "photo producta";
    divCard.appendChild(imgCard);

    h4FP.className = "price card__price js-h4-priceFirst";
    h4FP.innerHTML = data[i].price;
    divCard.appendChild(h4FP);

    pDesc.className = "description card__description js-p-description";
    pDesc.innerHTML = data[i].description;
    divCard.appendChild(pDesc);

    h4SP.className = "card__fileName js-h4-priceSecond";
    h4SP.innerHTML = data[i].price;
    divCard.appendChild(h4SP);

    divTablo.className = "positionInTablo card__tablo js-div-tablo";

    buttonM.className = "js-minus-quantity amount";
    buttonM.innerHTML = "&#8722";
    buttonM.addEventListener("click", minus);
    divTablo.appendChild(buttonM);

    inputCount.className = "js-cart-count  count";
    inputCount.value = "1";
    inputCount.name = "card__count";
    inputCount.addEventListener("input", OnlyNumbersValidation);
    inputCount.addEventListener("focus", function (e) {
      e.target.value = "";
    });
    inputCount.addEventListener("blur", function (e) {
      if (e.target.value == 0 || e.target.value == "") {
        e.target.value = "1";
      } else {
        e.target.value = e.target.value;
      }
    });
    divTablo.appendChild(inputCount);

    buttonP.className = "js-plus-quantity amount";
    buttonP.innerHTML = "&#43";
    buttonP.addEventListener("click", plus);
    divTablo.appendChild(buttonP);

    buttonAdd.className = "addToCart js-add-to-cart";
    buttonAdd.innerHTML = "add to cart";
    buttonAdd.addEventListener("click", addToCart);
    buttonAdd.setAttribute("data-product-id", data[i].id);
    divTablo.appendChild(buttonAdd);

    divCard.appendChild(divTablo);
  }
}
/* fetch, show data on page end */


for (let i = 0; i < inputCount.length; i++) {
  const elem = inputCount[i];
  elem.addEventListener("input", OnlyNumbersValidation);
}
function OnlyNumbersValidation(e) {
  let regex = /[^\d]/g;
  e.target.value = e.target.value.replace(regex, "");
}

/* events focus,blur start */
for (let i = 0; i < inputCount.length; i++) {
  const elem = inputCount[i];
  elem.addEventListener("focus", function (e) {
    e.target.value = "";
  });
}

for (let i = 0; i < inputCount.length; i++) {
  const elem = inputCount[i];
  elem.addEventListener("blur", function (e) {
    if (e.target.value == 0 || e.target.value == "") {
      e.target.value = "1";
    } else {
      e.target.value = e.target.value;
    }
  });
}
/* events focus,blur end */

/* function add to cart start*/
let cart = {};

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

    // let localInfo = localStorage.getItem("purchases");
    // let parseLocalInfo = JSON.parse(localStorage.getItem("purchases"));
    // parseLocalInfo[productId].quantity = cart[productId];
    // localStorage.setItem("purchases", JSON.stringify(parseLocalInfo))
  }
  cartQuantity.innerHTML = calculateTotalCartItems();
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
  const input = e.target.nextSibling;
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
  const input = e.target.previousSibling;
  if (input.value < input.size) {
    input.value++;
  }
}
/* function plus end */

let cartLocal = localStorage.getItem("cart"); //string or null
// let cartLocal = localStorage["cart"]; //string or undefined
//undefined->catch
//"hello"-> catch
// int in string  "10" -> try
try {
  cart = JSON.parse(cartLocal);
  // if(typeof cart === "number" || typeof cart === "boolean" || cart === null || Array.isArray(cart)){
  //   cart ={};
  //   localStorage.setItem("cart",JSON.stringify(cart));
  // }
  if (!(typeof cart === "object" && cart != null && !Array.isArray(cart))) {
    cart = {};
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  cartQuantity.innerHTML = calculateTotalCartItems();
} catch (err) {
  // console.dir(err);
  cart = {};
  localStorage.setItem("cart", JSON.stringify(cart));
}

//code for modalWindow
let linkToCart = document.querySelector(".fullCart");
linkToCart.addEventListener("click",modalWindow);

function modalWindow(e) {
  let infoStorage = localStorage.getItem("cart");
  if (infoStorage === "{}") {
    e.preventDefault();
    let modal = document.querySelector("#modalWindow");
    modal.classList.remove("body__backModal-visibility");
  }
}

let modalWindowCloseButton = document.querySelector(".mCloseButton");
modalWindowCloseButton.addEventListener("click", closeModalWindow);

function closeModalWindow(){
  let modal = document.querySelector("#modalWindow");
  modal.classList.add("body__backModal-visibility");
}
