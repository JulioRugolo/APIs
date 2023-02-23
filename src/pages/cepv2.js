const apiCep = document.getElementById('apiCep');
const sectionApi = document.getElementById('api');

apiCep.addEventListener('click', () => {
  const cepContainer = document.createElement('section');
  cepContainer.className('cepContainer');
  cepContainer.innerText = 'teste';
  sectionApi.appendChild(cepContainer);
});
