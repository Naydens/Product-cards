const minusQuantity = document.querySelectorAll(".js-minus-quantity");

const plusQuantity = document.querySelectorAll(".js-plus-quantity");

const cartQuantity = document.querySelector(".js-cart-quantity");

const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

const inputCount = document.querySelectorAll(".js-cart-count")

/* validation */

for(let i = 0;i<inputCount.length;i++){
  const elem = inputCount[i];
  elem.addEventListener("input",OnlyNumbersValidation);

  function OnlyNumbersValidation(e){
    e.target.value = e.target.value.replace(/[^\d]/g,"");
  }
}

function validate(text, rules){
console.log(typeof text)
}

/* events focus start */

for(let i = 0;i<inputCount.length;i++){
  const elem = inputCount[i];
  elem.addEventListener("focus", function(e) {
    e.target.value ="";
    })
}

// for(let i = 0;i<inputCount.length;i++){
//   const elem = inputCount[i];
//   elem.addEventListener("blur", function(e) {
//     e.target.value = 1;
//     console.log(e.target.value)
//     })
// }

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



