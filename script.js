const palavrasIgnoradas = [
  "a", "o", "os", "as", "um", "uma", "uns", "umas",
  "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
  "por", "com", "para", "se", "e", "que", "é", "à", "ao", "aos", "às",
  "não", "sim", "mas", "ou", "como", "já", "só", "eu", "você", "ele", "ela",
  "eles", "elas", "me", "te", "nos", "vos", "lhe", "lhes", "um", "uma"
];

function contaFrequencias(palavras) {
  const frequencias = {};
  for (let palavra of palavras) {
    frequencias[palavra] = (frequencias[palavra] || 0) + 1;
  }
  return frequencias;
}

function processaTexto(texto) {
  const palavras = texto
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Zà-úÀ-ÚçÇ0-9\s]/g, '') 
    .split(/\s+/) 
    .filter(p => p.length > 0 && !palavrasIgnoradas.includes(p));

  const frequencias = contaFrequencias(palavras);

  const objects = Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1]);
  return objects.slice(0,10);
}

function mostraPalavrasChave() {
  const texto = document.querySelector('#entrada-de-texto').value;
  const campoResultado = document.querySelector('#resultado-palavrachave');
  const palavrasChave = processaTexto(texto);

  const resultadoFormatado = palavrasChave
    .map(([palavra, quantidade]) => {
      let cor;
      if (quantidade < 3) {
        cor = '#5a7b3f'; 
      } else if (quantidade <= 5) {
        cor = '#bfa76f'; 
      } else {
        cor = '#a0522d'; 
      }
      return `<span style="color: ${cor}; font-weight: bold;">${palavra}: ${quantidade}</span>`;
    })
    .join(", ");

  campoResultado.innerHTML = resultadoFormatado || "Nenhuma palavra relevante encontrada.";
}

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');
botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);



function criarContainerComNavi() {
  const botao = document.querySelector('#botao-palavrachave');

 
  if(document.querySelector('.container-resultado')) return;

  
  const container = document.createElement('div');
  container.classList.add('container-resultado');

  
  const naviImg = document.createElement('img');
  naviImg.src = 'img/imagem_2025-07-02_222315532-removebg-preview.png';  
  naviImg.alt = 'Navi';
  naviImg.classList.add('navi-img');

  
  const resultado = document.querySelector('#resultado-palavrachave');
  if (!resultado) {
    console.error("Elemento '#resultado-palavrachave' não encontrado.");
    return;
  }
  resultado.remove();

  
  container.appendChild(naviImg);
  container.appendChild(resultado);


  botao.insertAdjacentElement('afterend', container);

  
  const style = document.createElement('style');
  style.textContent = `
    .container-resultado {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      max-width: 65rem;
      padding: 1rem;
      background-color: rgba(246, 241, 231, 0.85);
      border: 2px dashed #bfa76f;
      border-radius: 10px;
      margin-top: 1.5rem;
    }
    .navi-img {
      width: 64px;
      height: auto;
      user-select: none;
      pointer-events: none;
      animation: navi-bounce 2.5s infinite alternate ease-in-out;
    }
    @keyframes navi-bounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(-8px); }
    }
  `;
  document.head.appendChild(style);
}




window.addEventListener('DOMContentLoaded', criarContainerComNavi);




