let buttonOrder = document.querySelector(".forma__button");

let arrPlaceholders = document.querySelectorAll(".js-placeholder");

for (let i = 0; i < arrPlaceholders.length; i++) {
  arrPlaceholders[i].addEventListener("focus", changePlacaholderFocus);
}

function changePlacaholderFocus(e) {
  let input = e.target;
  if (input.placeholder !== "") {
    input.placeholder = "";
  }
}

for (let i = 0; i < arrPlaceholders.length; i++) {
  arrPlaceholders[i].addEventListener("blur", changePlacaholderBlur);
}

function changePlacaholderBlur(e) {
  let input = e.target;
  if (input.value === "") {
    input.placeholder = input.name;
  }
}

buttonOrder.addEventListener("click", submitOrder);

function validate(text, rule) {
  const config = {
    required: isRequired,
    min: minLength,
  };

  const rulesArray = rule.split("|");

  const allResponses = [];

  for (let i = 0; i < rulesArray.length; i++) {
    if (rulesArray[i].indexOf(":") > -1) {
      const ruleWithParamArray = rulesArray[i].split(":");
      allResponses.push(
        config[ruleWithParamArray[0]](text, ruleWithParamArray[1])
      );
    } else {
      allResponses.push(config[rulesArray[i]](text));
    }
  }

  function isRequired(text) {
    if (text === "") {
      return "fill in the field";
    }
  }

  function minLength(text, min) {
    if (text.length < min) {
      return "min quantity : " + min;
    }
  }

  let indexErrorMsg;

  allResponses.some((elem, index) => {
    if (typeof elem === "string") {
      indexErrorMsg = index;
      return true;
    }
  });
  return allResponses[indexErrorMsg];
}

function getDivError(elem) {
  if (elem.nextSibling.localName === "div") {
    return elem.nextSibling;
  }
  return getDivError(elem.nextSibling);
}

function submitOrder(e) {
  let form = document.querySelector(".forma");

  const rules = {
    name: "required|min:3",
    phone: "required",
  };

  for (key in rules) {
    const elem = form.elements[key];
    const checkInput = validate(elem.value, rules[key]); // return undefined || "error msg"
    const errorDivElem = getDivError(elem);

    if (checkInput) {
      errorDivElem.innerHTML = checkInput;
      e.preventDefault();
    } else {
      errorDivElem.innerHTML = "";
    }
  }
}
// else{
//   fetch('https://fakestoreapi.com/carts',{
//     method:"POST",
//     body:JSON.stringify(
//         {
//            name:"Nadya",
//            surename:"fgsj",
//            phone:"52145362",
//             products:[{productId:5,quantity:1},{productId:1,quantity:5}]
//         }
//     )
// })
//     .then(res=>res.json())
//     .then(json=>console.log(json))
// }
