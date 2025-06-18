let cartas = [];
let cartasViradas = [];
let cartasEncontradas = [];
let numCartas = 12;  // Aumentando o número de pares (campo + cidade)
let larguraCarta = 120;
let alturaCarta = 120;

function setup() {
  createCanvas(600, 600);
  let posX = 50;
  let posY = 50;

  // Definindo cores para "Campo" e "Cidade"
  let coresCampo = ['#6B8E23', '#228B22', '#9ACD32', '#32CD32', '#556B2F', '#6B8E23'];  // Cores relacionadas ao campo (verde)
  let coresCidade = ['#4682B4', '#5F9EA0', '#B0C4DE', '#87CEFA', '#00008B', '#1E90FF'];  // Cores relacionadas à cidade (azul)

  // Criar as cartas (cada par será uma carta do campo e uma da cidade)
  for (let i = 0; i < numCartas; i++) {
    cartas.push({ cor: coresCampo[i % 6], tipo: 'campo', x: posX, y: posY, virada: false });
    cartas.push({ cor: coresCidade[i % 6], tipo: 'cidade', x: posX + larguraCarta + 30, y: posY, virada: false });

    posX += larguraCarta + 30;
    if (posX > width - larguraCarta - 30) {
      posX = 50;
      posY += alturaCarta + 30;
    }
  }

  // Embaralhar as cartas
  shuffle(cartas, true);
}

function draw() {
  background(220);

  // Desenhar todas as cartas
  for (let i = 0; i < cartas.length; i++) {
    let carta = cartas[i];

    if (carta.virada || cartasEncontradas.includes(i)) {
      fill(carta.cor);
      rect(carta.x, carta.y, larguraCarta, alturaCarta);
    } else {
      fill(200);
      rect(carta.x, carta.y, larguraCarta, alturaCarta);
    }
  }
  
  // Verificar se o jogo terminou
  if (cartasEncontradas.length === cartas.length) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Você venceu!", width / 2, height / 2);
  }
}

function mousePressed() {
  for (let i = 0; i < cartas.length; i++) {
    let carta = cartas[i];
    // Verifica se a carta foi clicada
    if (!carta.virada && !cartasEncontradas.includes(i) && mouseX > carta.x && mouseX < carta.x + larguraCarta && mouseY > carta.y && mouseY < carta.y + alturaCarta) {
      carta.virada = true;
      cartasViradas.push(i);
      
      // Se houver duas cartas viradas, verificar se são um par
      if (cartasViradas.length === 2) {
        let indice1 = cartasViradas[0];
        let indice2 = cartasViradas[1];

        if (cartas[indice1].tipo === cartas[indice2].tipo) {
          cartasEncontradas.push(indice1, indice2);
        } else {
          // Se não forem um par, virar as cartas de volta
          setTimeout(() => {
            cartas[indice1].virada = false;
            cartas[indice2].virada = false;
            cartasViradas = [];
          }, 1000);
        }
      }
    }
  }
}
