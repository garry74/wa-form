const form = document.getElementById("login");

if (history.length == 1) {
  previous.disabled = true;
}

const fields = [
  { element: email, min: 2, max: 35, label: "E-mail" },
  { element: password, min: 2, max: 15, label: "Password" },
  { element: repeatPassword, min: 2, max: 15, label: "Repeat password" },
];

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
  if (!checkEmailReg()) {
    alert("E-mail is wrong");
  }

  isAlerted = checkPassword();
  if (!isAlerted) {
    isAlerted = checkRadio();
  }
  if (!isAlerted) window.location.href = "card.html";
});

function checkPassword() {
  if (password.value != repeatPassword.value) {
    alert("Passwords must match");
    const formGroup = repeatPassword.parentElement;
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    return true;
  }
  return false;
}

function checkRadio() {
  if (!(standardPackage.checked || premiumPackage.checked)) {
    alert("One of the packages must be selected");
    return true;
  }
  return false;
}

function checkEmailReg() {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let res = reg.test(email.value.toLowerCase());
  if (!res) {
    const formGroup = email.parentElement;
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
  }
  return res;
}

function checkInput(el, min, max, massage) {
  let element = el.value.trim();
  const formGroup = el.parentElement;
  var isValid = true;
  if (element.length < min || element.length > max) {
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    var isValid = false;
  } else {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    var isValid = true;
  }

  return {
    isValid: isValid,
    message: `${massage} must bee minimum ${min} and maximum ${max} characters`,
  };
}

function back() {
  if (history.length == 1) {
    previous.disabled = true;
  } else {
    history.back();
  }
}
