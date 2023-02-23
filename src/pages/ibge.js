const apiBtn = document.getElementsByClassName('apiButton')[2];
const sectionApi = document.getElementById('api');

const sectionIbge = () => {
  const section = document.createElement('section');
  section.id = 'sectionIbge';
  sectionApi.appendChild(section);
};

const createInput = () => {
  const section = document.getElementById('sectionIbge');
  const input = document.createElement('input');
  input.id = 'ibge-input';
  return section.appendChild(input);
};

const createSearchBtn = () => {
  const section = document.getElementById('sectionIbge');
  const searchBtn = document.createElement('button');
  searchBtn.id = 'search-btn';
  searchBtn.innerText = 'Buscar';
  return section.appendChild(searchBtn);
};

const createP = () => {
  const p = document.createElement('p');
  p.id = 'p-result';
  return sectionApi.appendChild(p);
};

apiBtn.addEventListener('click', async () => {
  while (sectionApi.children.length > 0) {
    for (let i = 0; i < sectionApi.childElementCount; i += 1) {
      sectionApi.lastChild.remove();
    }
  }
  sectionIbge();
  createInput();
  createSearchBtn();
  createP();

  const input = document.getElementById('ibge-input');
  const searchBtn = document.getElementById('search-btn');
  const p = document.getElementById('p-result');
  searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const response = await fetch(`https://brasilapi.com.br/api/ibge/uf/v1/${input.value}`);

    const data = await response.json();

    p.innerHTML = `
    <p>Estado: ${data.nome}</p>
    <p>Região: ${data.regiao.nome} - ${data.regiao.sigla}</p>
    `;
  });
});
