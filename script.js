// Lista de palavras comuns que serão ignoradas (todas minúsculas com acento quando necessário)
const palavrasIgnoradas = [
  "a", "o", "os", "as", "um", "uma", "uns", "umas",
  "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
  "por", "com", "para", "se", "e", "que", "é", "à", "ao", "aos", "às",
  "não", "sim", "mas", "ou", "como", "já", "só", "eu", "você", "ele", "ela",
  "eles", "elas", "me", "te", "nos", "vos", "lhe", "lhes", "um", "uma"
];

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');
botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
  const texto = document.querySelector('#entrada-de-texto').value;
  const campoResultado = document.querySelector('#resultado-palavrachave');
  const palavrasChave = processaTexto(texto);

  const resultadoFormatado = palavrasChave
    .map(([palavra, quantidade]) => `${palavra}: ${quantidade}`)
    .join(", ");

  campoResultado.textContent = resultadoFormatado || "Nenhuma palavra relevante encontrada.";
}

function processaTexto(texto) {
  
  let palavras = texto
    .toLowerCase()
    .normalize("NFD") // )
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Zà-úÀ-ÚçÇ0-9\s]/g, '') 
    .split(/\s+/) // separa por espaços

    
    .filter(p => p.length > 0 && !palavrasIgnoradas.includes(p));

  const frequencias = contaFrequencias(palavras);

  return Object.entries(frequencias)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
}

function contaFrequencias(palavras) {
  const frequencias = {};
  for (let palavra of palavras) {
    frequencias[palavra] = (frequencias[palavra] || 0) + 1;
  }
  return frequencias;
}
function mostraPalavrasChave() {
  const texto = document.querySelector('#entrada-de-texto').value;
  const campoResultado = document.querySelector('#resultado-palavrachave');
  const palavrasChave = processaTexto(texto);

  const resultadoFormatado = palavrasChave
    .map(([palavra, quantidade]) => {
      let cor;
      if (quantidade < 3) {
        cor = '#5a7b3f'; // verde musgo
      } else if (quantidade <= 5) {
        cor = '#bfa76f'; // amarelo dourado
      } else {
        cor = '#a0522d'; // vermelho terracota
      }
      return `<span style="color: ${cor}; font-weight: bold;">${palavra}: ${quantidade}</span>`;
    })
    .join(", ");

  campoResultado.innerHTML = resultadoFormatado || "Nenhuma palavra relevante encontrada.";
}
