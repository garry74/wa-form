const fields = [
  { element: firstName, min: 2, max: 15, label: "First name" },
  { element: lastName, min: 2, max: 15, label: "Last name" },
  { element: country, min: null, max: null, label: "Country" },
  { element: city, min: 2, max: 15, label: "City" },
  { element: address, min: 5, max: 45, label: "Address" },
  { element: postalCode, min: null, max: null, label: "Postal code" },
  { element: chooseShipping, min: null, max: null, label: "Choose shipping" },
  { element: shippingCity, min: 2, max: 15, label: "Shipping city" },
  { element: shippingAddress, min: 5, max: 45, label: "Shipping address" },
  {
    element: shippingPostalCode,
    min: null,
    max: null,
    label: "Shipping postal code",
  },
];

const countries = [
  {
    id: 1,
    name: "Armenia",
    postalCodePattern: /^[0-9]{4}$/,
  },
  {
    id: 2,
    name: "Russia",
    postalCodePattern: /^[0-9]{5}$/,
  },
  {
    id: 3,
    name: "USA",
    postalCodePattern: /^[0-9]{3}$/,
  },
  {
    id: 4,
    name: "China",
    postalCodePattern: /^[0-9]{4}$/,
  },
];

populateCountrySelect(country);
populateCountrySelect(chooseShipping);
setTimeout(() => {
  ifChecked();
});

next.addEventListener("click", (e) => {
  let isAlerted = false;
  fields.forEach((field) => {
    let checkResult = checkInput(
      field.element,
      field.min,
      field.max,
      field.label
    );

    if (!checkResult.isValid && !isAlerted) {
      isAlerted = true;
      alert(checkResult.message);
    }
  });

  const isValidMainPostalCode = isValidPostalCode(country, postalCode);
  const isValidShippingPostalCode = isValidPostalCode(
    chooseShipping,
    shippingPostalCode
  );

  if (!isAlerted && !isValidMainPostalCode) {
    alert("Postal code is not valid");
    isAlerted = true;
  }

  if (!isAlerted && !isValidShippingPostalCode) {
    alert("Postal code is not valid");
    isAlerted = true;
  }

  if (!isAlerted) window.location.href = "package.html";
});

function checkInput(el, min, max, message) {
  const isValidRequired = checkIsRequired(el);

  if (!isValidRequired) {
    return {
      isValid: false,
      message: `${message} is required`,
    };
  }

  if (min != null && max != null) {
    const isValidLength = checkLength(el, min, max);

    if (!isValidLength) {
      return {
        isValid: false,
        message: `${message} must bee minimum ${min} and maximum ${max} characters`,
      };
    }
  }

  return {
    isValid: true,
    message: "",
  };
}

function checkLength(el, min, max) {
  let elementValue = el.value.trim();

  if (elementValue.length < min || elementValue.length > max) {
    setErrorState(el.parentElement);
    return false;
  }

  setSuccessState(el.parentElement);
  return true;
}

function checkIsRequired(el) {
  if (!el.value) {
    setErrorState(el.parentElement);
    return false;
  }

  setSuccessState(el.parentElement);
  return true;
}

function setErrorState(formGroup) {
  formGroup.classList.remove("success");
  formGroup.classList.add("error");
}

function setSuccessState(formGroup) {
  formGroup.classList.remove("error");
  formGroup.classList.add("success");
}

function ifChecked() {
  if (shipping.checked) {
    chooseShipping.value = country.value;
    shippingCity.value = city.value;
    shippingAddress.value = address.value;
    shippingPostalCode.value = postalCode.value;
    chooseShipping.disabled = true;
    shippingCity.disabled = true;
    shippingAddress.disabled = true;
    shippingPostalCode.disabled = true;
  } else {
    chooseShipping.value = "";
    shippingCity.value = "";
    shippingAddress.value = "";
    shippingPostalCode.value = "";
    chooseShipping.disabled = false;
    shippingCity.disabled = false;
    shippingAddress.disabled = false;
    shippingPostalCode.disabled = false;
  }
}

function changeCountry() {
  if (shipping.checked) {
    chooseShipping.value = country.value;
  }
}

function changeCity() {
  if (shipping.checked) {
    shippingCity.value = city.value;
  }
}
function changeAddress() {
  if (shipping.checked) {
    shippingAddress.value = address.value;
  }
}
function changeCode() {
  if (shipping.checked) {
    shippingPostalCode.value = postalCode.value;
  }
}

function populateCountrySelect(el) {
  countries.forEach((c) => {
    var option = document.createElement("option");
    option.value = c.id;
    option.innerHTML = c.name;
    el.appendChild(option);
  });
}

function isValidPostalCode(selectElement, postalCodeElement) {
  const id = selectElement.value;
  const selectedCountry = countries.find((c) => c.id == id);
  const regex = selectedCountry.postalCodePattern;
  const postalCodeValue = postalCodeElement.value;
  const result = regex.test(postalCodeValue);

  if (result) {
    setSuccessState(postalCodeElement.parentElement);
  } else {
    setErrorState(postalCodeElement.parentElement);
  }
  return result;
}
