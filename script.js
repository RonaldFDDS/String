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


// Função para criar o container com a Navi e o resultado
function criarContainerComNavi() {
  const botao = document.querySelector('#botao-palavrachave');

  // Verifica se o container já existe (para evitar duplicação)
  if(document.querySelector('.container-resultado')) return;

  // Cria o container
  const container = document.createElement('div');
  container.classList.add('container-resultado');

  // Cria a imagem da Navi
  const naviImg = document.createElement('img');
  naviImg.src = 'img/imagem_2025-07-02_222315532-removebg-preview.png';  // ajuste o caminho da imagem conforme necessário
  naviImg.alt = 'Navi';
  naviImg.classList.add('navi-img');

  // Pega o elemento resultado e o remove do lugar atual
  const resultado = document.querySelector('#resultado-palavrachave');
  if (!resultado) {
    console.error("Elemento '#resultado-palavrachave' não encontrado.");
    return;
  }
  resultado.remove();

  // Adiciona a imagem e o resultado dentro do container
  container.appendChild(naviImg);
  container.appendChild(resultado);

  // Insere o container logo após o botão "Extrair"
  botao.insertAdjacentElement('afterend', container);

  // Injeta o CSS para o container e a imagem Navi
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




