let parseInfoFromStorage = JSON.parse(localStorage.getItem("cart"));

let divContainerCart = document.querySelector(".cartContainer");

for (let key in parseInfoFromStorage) {
  fetch(`https://fakestoreapi.com/products/${key}`)
    .then((res) => res.json())
    .then((json) => loadInfoOnCartPage(json, parseInfoFromStorage[key]));
}

function loadInfoOnCartPage(data, quantity) {
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
  divTabloOnCart.appendChild(buttonPlus);

  let inputQuantity = document.createElement("input");
  inputQuantity.value = quantity;

  let buttonMinus = document.createElement("button");
  buttonMinus.innerHTML = "minus";

  let buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "delete";
  buttonDelete.className = "tabloOnCart__delete";
  buttonDelete.addEventListener("click", deleteItem);

  let h4ItemPrice = document.createElement("h4");
  h4ItemPrice.innerHTML = "Price for item: " + data.price;

  let h4TotalPrice = document.createElement("h4");
  h4TotalPrice.innerHTML = "Total price: " + data.price * quantity;

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

function deleteItem(e) {
  e.target.parentNode.className = "tabloOnCart__delete-visibility";

  let objLocal = JSON.parse(localStorage.getItem("cart"));
  delete objLocal[e.target.parentNode.id];

  if (JSON.stringify(objLocal) === "{}") {

    let divContainerItem = document.querySelector(".cartContainer");
    let emptyCartWindow = document.querySelector(".emptyCartWindow-visibility");

    emptyCartWindow.classList.add("emptyCartWindow");
    emptyCartWindow.classList.remove("emptyCartWindow-visibility");

    divContainerItem.classList.add("cartContainer-visibility");
    divContainerItem.classList.remove("cartContainer");

  }
  localStorage.setItem("cart", JSON.stringify(objLocal));
}
