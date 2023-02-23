const apiLink = document.getElementById('apiBank');
const sectionApi = document.getElementById('api');

const createForm = () => {
  const form = document.createElement('form');
  form.style.className = 'form';
  form.createElement();
  sectionApi.appendChild(form);
};

apiLink.addEventListener('click', () => {
  sectionApi.innerHTML = '';
});
