// Variáveis do jogo
let vidaGorila = 100;
let humanosVivos = 100;
let defendendo = false;

// Elementos do DOM
const gorilaElement = document.getElementById('gorila');
const humanosContainer = document.getElementById('humanos-container');
const vidaGorilaElement = document.getElementById('vida-gorila');
const humanosVivosElement = document.getElementById('humanos-vivos');
const logElement = document.getElementById('log');

//Criar os humanos na tela
function criarHumanos(){
    for (let i = 0; i < 100; i++){
        const humano = document.createElement(img);
        humano.src = './assests/humano.png';
        humano.className = 'humano';
        humanosContainer.appendChild(humano);
    }

    // Humanos atacam a cada 2 segundos
    setInterval(humanosAtacar, 2000);
    adicionarMensagem('O jogo começou! Gorila vs 100 Humanos!');
}



// Gorila ataca
function atacar() {
    if (humanosVivos<=0) return;

    //Animacao simples
    gorilaElement.style.transform = 'traslatex(20px)';
    setTimeout(() =>gorilaElement.style.transform = '',300) // agrupa a execocao da funcao depois de um determinado tempo
    
    //Elimina 1-3 humanos
    const eliminados = Math.min(Matdh.floor(Math.random() * 3) + 1, humanosVivos); //gera numero aleatorio entre 1-3 e o arredonda
    humanos -= eliminados;

    //Atualiza humanos na tela
    const humanos  = document.querySelector('.humano:not(morto');
    for (let i = 0; i < eliminados; i++) {
        if (humanos[i]) humanos[i].classList.add('morto');
        humanos.classList.add('morto');
        humanosVivos--;
    }
}

adicionarMensagem(`Gorila atacou e eliminou ${humanosEliminados} humanos!`);
atualizarInterface();

// Verificar vitoria
if (humanos <= 0) {
    adicionarMensagem('VITORIA! O Gorila derrotou todos os humanos!');
}

// Gorila se defende
