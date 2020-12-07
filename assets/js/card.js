const backspaceInputType = "deleteContentBackward";
const today = new Date();
hideAllCardTypes();
displayCard(".card-unknown");
if (history.length == 1) {
  previous.disabled = true;
}
cardNumber.addEventListener("input", function (e) {
  let trimmed = cardNumber.value.replaceAll(" ", "");

  parseCardType(trimmed);

  let cardNumberVal = cardNumber.value;
  const lastCharacter = cardNumberVal[cardNumberVal.length - 1];

  if (
    isNaN(lastCharacter) ||
    lastCharacter == " " ||
    e.inputType == backspaceInputType
  ) {
    cardNumber.value = cardNumber.value.substring(0, cardNumberVal.length - 1);
    return;
  }

  if (trimmed.length % 4 == 0) {
    cardNumber.value += " ";
  }
});

cvc.addEventListener("input", function (e) {
  let cvcVal = cvc.value;
  const lastCharacter = cvcVal[cvcVal.length - 1];
  if (
    isNaN(lastCharacter) ||
    lastCharacter == " " ||
    e.inputType == backspaceInputType
  ) {
    cvc.value = cvc.value.substring(0, cvcVal.length - 1);
    return;
  }
});

function back() {
  if (history.length == 1) {
    previous.disabled = true;
  } else {
    history.back();
  }
}

next.addEventListener("click", (e) => {
  const date = new Date(expirationDate.value);

  if (cardNumber.value.length != 20) {
    alert("Card number must be 16 digits");
    return;
  }

  if (!checkInput(fullName, "Full name")) return;
  if (!checkInput(cvc, "Cvc")) return;

  if (date > today || expirationDate.value == "") {
    alert("Expiration date should be before today's date");
    return;
  }

  alert("Registration was successful!!!");
});

function checkInput(element, elementName) {
  const formGroup = element.parentElement;

  if (element.value.trim().length == 0) {
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
    alert(elementName + " must not be empty");
    return false;
  } else {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    return true;
  }
}

function parseCardType(value) {
  hideAllCardTypes();

  if (isVisaCardNumber(value)) {
    displayCard(".card-visa");
  } else if (isMasterCardNumber(value)) {
    displayCard(".card-mastercard");
  } else displayCard(".card-unknown");
}

function isVisaCardNumber(value) {
  var cardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  return cardNumber.test(value);
}

function isMasterCardNumber(value) {
  var cardNumber = /^(?:5[1-5][0-9]{14})$/;
  return cardNumber.test(value);
}

function hideAllCardTypes() {
  document.querySelectorAll(".plastic-card").forEach((el) => {
    el.style.display = "none";
  });
}

function displayCard(className) {
  document.querySelector(className).style.display = "block";
}
