"use sctrict";
const createBtn = document.querySelector(".js-create-btn");
const hiddenBoxElement = document.querySelector(".js-display");

const inputsTextConfig = [
  {
    inputClass: ".js-input-name",
    cardClass: ".js-card-name",
    defaultValue: "Nombre apellidos",
    cardPrefix: "",
    cardElementAttribute: "innerHTML",
  },
  {
    inputClass: ".js-input-job",
    cardClass: ".js-card-job",
    defaultValue: "Profesión",
    cardPrefix: "",
    cardElementAttribute: "innerHTML",
  },
  {
    inputClass: ".js-input-email",
    cardClass: ".js-card-email",
    defaultValue: "",
    cardPrefix: "mailto:",
    cardElementAttribute: "href",
  },
  {
    inputClass: ".js-input-phone",
    cardClass: ".js-card-phone",
    defaultValue: "",
    cardPrefix: "tel:",
    cardElementAttribute: "href",
  },
  {
    inputClass: ".js-input-linkedin",
    cardClass: ".js-card-linkedin",
    defaultValue: "",
    cardPrefix: "https://www.linkedin.com/in/",
    cardElementAttribute: "href",
  },
  {
    inputClass: ".js-input-github",
    cardClass: ".js-card-github",
    defaultValue: "",
    cardPrefix: "https://github.com/",
    cardPrefixGithub: "@",
    cardElementAttribute: "href",
  },
];

function updateAllInputs() {
  saveInLocalStorage();
  resetShareSection();

  // recorro los 6 inputs del array inputsTextConfig
  for (const inputTextConfig of inputsTextConfig) {
    // por cada objeto del array inputsTextConfig hago:
    console.log(
      "Empiezo una nueva iteración del for con la configuración del elemento:",
      inputTextConfig
    );

    // obtengo el elemento input, el origen
    const inputElement = document.querySelector(inputTextConfig.inputClass);
    console.log(
      "Elemento del formulario:",
      inputTextConfig.inputClass,
      inputElement
    );

    // obtengo el elemento de la card, el destino
    const cardElement = document.querySelector(inputTextConfig.cardClass);
    console.log(
      "Elemento del la tarjeta:",
      inputTextConfig.cardClass,
      cardElement
    );

    // obtengo el valor del input
    let newValue = inputElement.value;

    // compruebo si tengo que usar el innerHTML, es decir si es el nombre o la profesion
    if (inputTextConfig.cardElementAttribute === "innerHTML") {
      // compruebo si está vacío
      if (inputElement.value === "") {
        newValue = inputTextConfig.defaultValue;
      } else {
        newValue = inputElement.value;
      }
      console.log("Valor por defecto:", inputTextConfig.defaultValue);
      console.log("Nuevo valor a poner en la tarjeta:", newValue);
      // actualizo la tarjeta
      cardElement.innerHTML = newValue;
    }

    // si no es de tipo innerHTML, compruebo si tengo que usar el href, es decir si es el email, phone, linkedin o gihtub
    else if (inputTextConfig.cardElementAttribute === "href") {
      // compruebo si está vacío
      if (inputElement.value === "") {
        newValue = "#";
      } else if (inputsTextConfig[5]) {
        newValue = newValue.replace(inputTextConfig.cardPrefix, "");
        newValue = newValue.replace(inputTextConfig.cardPrefixGithub, "");
        newValue = inputTextConfig.cardPrefix + newValue;
      } else {
        newValue = newValue.replace(inputTextConfig.cardPrefix, "");
        newValue = inputTextConfig.cardPrefix + newValue;
      }
      console.log("Valor del prefijo:", inputTextConfig.cardPrefix);
      console.log("Nuevo valor a poner en la tarjeta:", newValue);
      // actualizo la tarjeta
      cardElement.href = newValue;
    }

    console.log("-------------------------------------------------");
  }
}

// obtengo los 6 inputs del html
const inputTextElements = document.querySelectorAll(".js-input-text");
// escucho a cada uno de ellos con un addEventListener
for (const inputTextElement of inputTextElements) {
  inputTextElement.addEventListener("keyup", updateAllInputs);
}
