let parseInfoFromStorage = JSON.parse(localStorage.getItem("cart"));

let divContainerCart = document.querySelector(".cartContainer");

let orderPrice = 0;

for (let key in parseInfoFromStorage) {
  fetch(`https://fakestoreapi.com/products/${key}`)
    .then((res) => res.json())
    .then((json) => loadInfoOnCartPage(json, parseInfoFromStorage[key]));
}

function loadInfoOnCartPage(data, quantity) {
  orderPrice += data.price * quantity;
  let h2OrderPrice = document.querySelector(".titleTotal");
  h2OrderPrice.innerHTML = "Price per order: " + orderPrice;

  let divItem = document.createElement("div");
  divItem.className = "item cartContainer__item";
  divItem.id = data.id;

  let imgProduct = document.createElement("img");
  imgProduct.className = "cartContainer__imgProduct";
  imgProduct.src = data.image;
  imgProduct.alt = data.title;

  let pTitleProduct = document.createElement("p");
  pTitleProduct.className = "cartContainer__titleProduct";
  pTitleProduct.innerHTML = data.title;

  let divTabloOnCart = document.createElement("div");
  divTabloOnCart.className = "tabloOnCart";

  let buttonPlus = document.createElement("button");
  buttonPlus.innerHTML = "plus";
  buttonPlus.setAttribute("id", "plus");
  buttonPlus.addEventListener("click", moreItems);
  divTabloOnCart.appendChild(buttonPlus);

  let inputQuantity = document.createElement("input");
  inputQuantity.value = quantity;

  let buttonMinus = document.createElement("button");
  buttonMinus.setAttribute("id", "minus");
  buttonMinus.addEventListener("click", lessItems);
  buttonMinus.innerHTML = "minus";

  let buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "delete";
  buttonDelete.className = "tabloOnCart__delete";
  buttonDelete.addEventListener("click", deleteItem);

  let h4ItemPrice = document.createElement("h4");
  h4ItemPrice.innerHTML = "Price for item: " + data.price;

  let h4TotalPrice = document.createElement("h4");
  h4TotalPrice.setAttribute("id", `total${data.id}`);
  h4TotalPrice.innerHTML = "Price for items: "+data.price*quantity;

  divTabloOnCart.appendChild(buttonPlus);
  divTabloOnCart.appendChild(inputQuantity);
  divTabloOnCart.appendChild(buttonMinus);
  divTabloOnCart.appendChild(h4ItemPrice);
  divTabloOnCart.appendChild(h4TotalPrice);

  divItem.appendChild(imgProduct);
  divItem.appendChild(pTitleProduct);
  divItem.appendChild(divTabloOnCart);
  divItem.appendChild(buttonDelete);

  divContainerCart.appendChild(divItem);
}

function moreItems(e) {
  let input = e.target.nextSibling;
  let itemId = input.parentNode.parentNode.id;
  fetch(`https://fakestoreapi.com/products/${itemId}`)
    .then((res) => res.json())
    .then((json) => calculateAndShowPlus(json, input));
}

function calculateAndShowPlus(data, input) {
  input.value++;

  let objLocal = JSON.parse(localStorage.getItem("cart"));
  objLocal[data.id] = Number(input.value);
  localStorage.setItem("cart", JSON.stringify(objLocal));

  let h4PriceItems = document.getElementById(`total${data.id}`);
  h4PriceItems.innerHTML = "Price for items: "+data.price*input.value;

  let total = document.querySelector("#total");
  orderPrice += data.price;
    //cut for two numbers
  total.innerHTML = "Total price for all: " + orderPrice;
}

function lessItems(e){
  let input = e.target.previousSibling;
  let itemId = input.parentNode.parentNode.id;
  fetch(`https://fakestoreapi.com/products/${itemId}`)
    .then((res) => res.json())
    .then((json) => calculateAndShowMinus(json, input));
}

function calculateAndShowMinus(data, input){
  input.value--

  let objLocal = JSON.parse(localStorage.getItem("cart"));
  objLocal[data.id] = Number(input.value);
  localStorage.setItem("cart", JSON.stringify(objLocal));

  let h4PriceItems = document.getElementById(`total${data.id}`);
  h4PriceItems.innerHTML = "Price for items: "+data.price*input.value;

  let total = document.querySelector("#total");
  orderPrice -= data.price;
    //cut for two numbers
  total.innerHTML = "Total price for all: " + orderPrice;
}


function deleteItem(e) {
  e.target.parentNode.className = "tabloOnCart__delete-visibility";

  let objLocal = JSON.parse(localStorage.getItem("cart"));
  delete objLocal[e.target.parentNode.id];

  if (JSON.stringify(objLocal) === "{}") {
    let divContainer = document.querySelector(".container");
    let emptyCartWindow = document.querySelector(".emptyCartWindow-visibility");

    emptyCartWindow.classList.add("emptyCartWindow");
    emptyCartWindow.classList.remove("emptyCartWindow-visibility");

    divContainer.classList.add("cartContainer-visibility");
    divContainer.classList.remove("cartContainer");
  }

  localStorage.setItem("cart", JSON.stringify(objLocal));
}
