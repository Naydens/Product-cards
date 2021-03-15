const minusQuantity = document.querySelectorAll(".js-minus-quantity");

const plusQuantity = document.querySelectorAll(".js-plus-quantity");

const cartQuantity = document.querySelector(".js-cart-quantity");

const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

const cart = {};

function calculateTotalCartItems() {
  let total = 0;
  for (let key in cart) {
    total += cart[key];
  }
  return total;
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

for (let i = 0; i < addToCartButtons.length; i++) {
  const elem = addToCartButtons[i];
  elem.addEventListener("click", addToCart);
}

function minus(e) {
  const input = e.target.nextSibling.nextSibling;
  if (input.value > 1) {
      input.value--;
  }
}

for (let i = 0; i < minusQuantity.length; i++) {
  const elem = minusQuantity[i];
  elem.addEventListener("click", minus);
}

function plus (e){
    const input = e.target.previousSibling.previousSibling;
    if(input.value<input.size){
        input.value++;
    }
}

for (let i = 0; i < plusQuantity.length; i++) {
    const elem = plusQuantity[i];
    elem.addEventListener("click", plus);
  }