/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import './cep.css';
import Swal from 'sweetalert2';

const apiCep = document.getElementById('apiCep');
const sectionApi = document.getElementById('api');
let map;
let marker;

const mapCreate = (latitude, longitude, street) => {
  if (!map) {
    map = L.map('map').setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    marker = L.marker([latitude, longitude]).addTo(map)
      .bindPopup(`${street}`)
      .openPopup();
  } else {
    map.setView([latitude, longitude], 17);
    marker.setLatLng([latitude, longitude])
      .setPopupContent(street)
      .openPopup();
  }
};

const createContCepMap = () => {
  const cepContainerMap = document.createElement('section');
  cepContainerMap.className = 'cepContainerMap';
  cepContainerMap.id = 'map';
  sectionApi.appendChild(cepContainerMap);
};
// Exibe o endereço
const showAdress = (cep, state, city, neighborhood, street) => {
  const cepForm = document.querySelector('.cepForm');
  const oldContAdress = document.querySelector('.contAdress');
  if (oldContAdress) cepForm.removeChild(oldContAdress);
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

// Busca na API o cep informado
const buscarCep = async () => {
  const contMap = document.querySelector('.cepContainerMap');
  try {
    const cep = document.getElementById('inputCep').value;
    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    const data = await response.json();
    const {
      state, city, neighborhood, street, location,
    } = data;
    const { coordinates: { latitude, longitude } } = location;
    showAdress(cep, state, city, neighborhood, street, latitude, longitude);
    if (latitude) {
      mapCreate(latitude, longitude, street);
    } else {
      if (map) map.remove();
      map = '';
      contMap.innerText = `Mapa indisponível para o cep ${cep}`;
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'CEP não encontrado!',
      footer: `${error}`,
    });
  }
};

const createForm = () => {
  const cepForm = document.querySelector('.cepForm');
  const labelCep = document.createElement('label');
  labelCep.className = 'labelCep';
  labelCep.innerText = 'Digite o CEP';
  labelCep.setAttribute('for', 'inputCep');
  const inputCep = document.createElement('input');
  inputCep.className = 'inputCep';
  inputCep.id = 'inputCep';
  const buttonCep = document.createElement('button');
  buttonCep.innerText = 'Buscar';
  buttonCep.className = 'buttonCep';
  buttonCep.addEventListener('click', buscarCep);
  cepForm.innerHTML = '';
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
  sectionApi.innerHTML = '';
  createContCepForm();
  createContCepMap();
});
