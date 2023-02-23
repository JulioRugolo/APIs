import './cep.css';

const apiCep = document.getElementById('apiCep');
const sectionApi = document.getElementById('api');

const createContCepMap = () => {
  const cepContainer = document.createElement('section');
  cepContainer.className = 'cepContainer';
  cepContainer.innerText = 'Map';
  sectionApi.appendChild(cepContainer);
};

const showAdress = (cep, state, city, neighborhood, street, latitude, longitude) => {
  const cepForm = document.querySelector('.cepForm');
  const contAdress = document.createElement('section');
  contAdress.className = 'contAdress';
  contAdress.innerHTML = `
  ${cep}<br>
  Rua: ${street}<br>
  Bairro: ${neighborhood}<br>
  ${city}-${state}<br>
  `;
  cepForm.appendChild(contAdress);
};

const buscarCep = async () => {
  const cep = document.getElementById('inputCep').value;
  const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const data = await response.json();
  const {
    state, city, neighborhood, street, location,
  } = data;
  const { coordinates: { latitude, longitude } } = location;
  showAdress(cep, state, city, neighborhood, street, latitude, longitude);
};

const createForm = (cepForm) => {
  const labelCep = document.createElement('label');
  labelCep.innerText = 'Digite o cep';
  labelCep.setAttribute('for', 'inputCep');
  const inputCep = document.createElement('input');
  inputCep.className = 'inputCep';
  inputCep.id = 'inputCep';
  const buttonCep = document.createElement('button');
  buttonCep.innerText = 'Buscar';
  buttonCep.addEventListener('click', buscarCep);
  cepForm.appendChild(labelCep);
  cepForm.appendChild(inputCep);
  cepForm.appendChild(buttonCep);
};

const createContCepForm = () => {
  const cepForm = document.createElement('section');
  cepForm.className = 'cepForm';
  sectionApi.appendChild(cepForm);
  createForm(cepForm);
};

apiCep.addEventListener('click', () => {
  createContCepForm();
  createContCepMap();
});
