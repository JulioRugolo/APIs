const apiBtn = document.getElementsByClassName('apiButton')[2];
const sectionApi = document.getElementById('api');

const createSectionMain = () => {
  const section = document.createElement('section');
  section.id = 'main';
  sectionApi.appendChild(section);
};

const createSectionInput = () => {
  const sectionMain = document.getElementById('main');
  const section = document.createElement('section');
  section.id = 'section-input';
  sectionMain.appendChild(section);
};

const createInput = () => {
  const sectionInput = document.getElementById('section-input');
  const input = document.createElement('input');
  input.id = 'ibge-input';
  return sectionInput.appendChild(input);
};

const createSearchBtn = () => {
  const sectionInput = document.getElementById('section-input');
  const searchBtn = document.createElement('button');
  searchBtn.id = 'search-btn';
  searchBtn.innerText = 'Buscar';
  return sectionInput.appendChild(searchBtn);
};

const createP = () => {
  const sectionMain = document.getElementById('main');
  const p = document.createElement('p');
  p.id = 'p-result';
  return sectionMain.appendChild(p);
};

const createImg = () => {
  const img = document.createElement('img');
  img.id = 'regioes';
  return sectionApi.appendChild(img);
};

apiBtn.addEventListener('click', async () => {
  while (sectionApi.children.length > 0) {
    for (let i = 0; i < sectionApi.childElementCount; i += 1) {
      sectionApi.lastChild.remove();
    }
  }
  createSectionMain();
  createSectionInput();
  createInput();
  createSearchBtn();
  createP();
  createImg();

  const input = document.getElementById('ibge-input');
  const searchBtn = document.getElementById('search-btn');
  const p = document.getElementById('p-result');
  const img = document.getElementById('regioes');
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const response = await fetch(`https://brasilapi.com.br/api/ibge/uf/v1/${input.value}`);

    const data = await response.json();

    p.innerHTML = `
    <p>Estado: ${data.nome}</p>
    <p>Região: ${data.regiao.nome} - ${data.regiao.sigla}</p>
    `;
    img.setAttribute('src', '../img/regioes.jpg');
  });
});
