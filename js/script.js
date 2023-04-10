const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");

//validate CEP input


cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]|\./;
  const key = String.fromCharCode(e.keyCode)

  console.log(key);
    //allow only numbers
    console.log(onlyNumbers.test(key));
    if(!onlyNumbers.test(key)) {
      //para nao prosseguir com o que campo numerico se nao tiver numeros
      e.preventDefault()
      return;
    }
} )

//get address event

cepInput.addEventListener("keyup", (e) => {

  const inputValue = e.target.value

  //verifique se temos o comprimento correto

  if(inputValue.length === 8){
    getAddress(inputValue)

  }


})

//get customer address from api

//async e espera a funçao ser chamado a atal ponto

const getAddress = async (cep) => {

  toggleLoader()

  //o blur sever para preencher automaticamente ao colocar o cep
  //o resto de  enedereço o qual o site redericionar
  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  //o await seria o tempo  de resposta de que o site vai verificar os dados apara ao usuario
  const response = await fetch(apiUrl)
  const data = await response.json();
  console.log(data)
  console.log(formInputs)
  console.log(data.erro);

  if (data.erro === "true") {
    if (!addressInput.hasAttribute("disabled")) {
      toggleDisabled();
    }

    addressForm.reset();
    toggleLoader();
    toggleMessage("CEP Inválido, tente novamente.");
    return;
  }

  if(addressInput.value === ""){
    toggleDisabled()
  }

  addressInput.value = data.logradouro
  cityInput.value = data.localidade
  neighborhoodInput.value = data.bairro
  regionInput.value = data.uf

  toggleLoader()
}

//Add or remove disabled

const toggleDisabled = () => {
  
  if(regionInput.hasAttribute("disabled")){
    formInputs.forEach((input) =>{
      input.removeAttribute("disabled")
    })
  } else{
    formInputs.forEach((input) => {
      //aqui mostrar que se nao tiver o disabled ele adiconar
      input.setAttribute("disabled", "disabled")
    })
  }
}

//mostrar ou hider loader
const toggleLoader = () => {
  const fadeElement = document.querySelector("#fade");
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
};

// Show or hide message
const toggleMessage = (msg) => {
  const fadeElement = document.querySelector("#fade");
  const messageElement = document.querySelector("#message");

  const messageTextElement = document.querySelector("#message p");

  messageTextElement.innerText = msg;

  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
};

// Close message modal
closeButton.addEventListener("click", () => toggleMessage());

// Save address
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!");

    addressForm.reset();

    toggleDisabled();
  }, 1000);
});