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
    return text !== "";
  }

  function minLength(text, min) {
    return text.length >= min;
  }

  const result = allResponses.some((elem) => {
    if (!elem) {
      return true;
    }
  });

  return !result;
}

function submitOrder(e) {
  let form = document.querySelector(".forma");

  const rules = {
    name: "required|min:3",
    phone: "required",
  };

  for (key in rules) {
    const elem = form.elements[key];
    const isValid = validate(elem.value, rules[key]);
    if (!isValid) {
      //show validation error to user
      e.preventDefault();
    }
  }
}
