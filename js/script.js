// Variáveis do jogo
let vidaGorila = 100;
let humanosVivos = 100;
let gorilaDefendendo = false;

// Elementos do DOM
const gorilaElement = document.getElementById('gorila');
const humanosElement = document.getElementById('humanos');
const vidaGorilaElement = document.getElementById('vida-gorila');
const humanosVivosElement = document.getElementById('humanos-vivos');
const mensagensElement = document.getElementById('mensagens');

// Inicia o jogo
function iniciarJogo() {
    // Cria os humanos (usando emojis como placeholder)
    for (let i = 0; i < humanosVivos; i++) {
        const humano = document.createElement('div');
        humano.className = 'humano';
        humano.textContent = '🧑';
        humano.id = 'humano-' + i;
        humanosElement.appendChild(humano);
    }
    
    // Humanos atacam a cada 2 segundos
    setInterval(humanosAtacar, 2000);
    
    adicionarMensagem('O jogo começou! Gorila vs 100 Humanos!');
}

// Gorila ataca
function gorilaAtacar() {
    if (humanosVivos <= 0) return;
    
    // Animação simples
    gorilaElement.style.transform = 'translateX(20px)';
    setTimeout(() => gorilaElement.style.transform = 'translateX(0)', 300);
    
    // Elimina entre 1-3 humanos
    const humanosEliminados = Math.min(Math.floor(Math.random() * 3) + 1, humanosVivos);
    
    for (let i = 0; i < humanosEliminados; i++) {
        const humanoId = Math.floor(Math.random() * 100);
        const humano = document.getElementById('humano-' + humanoId);
        
        if (humano && !humano.classList.contains('morto')) {
            humano.classList.add('morto');
            humanosVivos--;
        }
    }
    
    adicionarMensagem(`Gorila atacou e eliminou ${humanosEliminados} humanos!`);
    atualizarInterface();
    
    // Verifica vitória
    if (humanosVivos <= 0) {
        adicionarMensagem('VITÓRIA! O gorila derrotou todos os humanos!');
    }
}

// Gorila se defende
function gorilaDefender() {
    gorilaDefendendo = true;
    gorilaElement.style.color = 'lightblue';
    adicionarMensagem('Gorila está se defendendo! Próximo ataque será reduzido.');
    
    // Defesa dura 3 segundos
    setTimeout(() => {
        gorilaDefendendo = false;
        gorilaElement.style.color = 'white';
        adicionarMensagem('Gorila não está mais defendendo.');
    }, 3000);
}

// Gorila se cura
function gorilaCurar() {
    const cura = Math.floor(Math.random() * 15) + 5;
    vidaGorila = Math.min(100, vidaGorila + cura);
    
    // Animação simples
    gorilaElement.style.color = 'lightgreen';
    setTimeout(() => gorilaElement.style.color = 'white', 500);
    
    adicionarMensagem(`Gorila se curou em ${cura} pontos de vida!`);
    atualizarInterface();
}

// Humanos atacam o gorila
function humanosAtacar() {
    if (humanosVivos <= 0 || vidaGorila <= 0) return;
    
    // Quantidade de humanos que atacam (1-5% dos humanos vivos)
    const atacantes = Math.max(1, Math.floor(humanosVivos * 0.03));
    let dano = atacantes;
    
    // Se gorila está defendendo, dano reduzido
    if (gorilaDefendendo) {
        dano = Math.floor(dano / 2);
    }
    
    vidaGorila -= dano;
    adicionarMensagem(`${atacantes} humanos atacaram! Gorila perdeu ${dano} de vida.`);
    
    // Verifica derrota
    if (vidaGorila <= 0) {
        vidaGorila = 0;
        adicionarMensagem('DERROTA! O gorila foi derrotado pelos humanos.');
    }
    
    atualizarInterface();
}

// Atualiza a interface
function atualizarInterface() {
    vidaGorilaElement.textContent = vidaGorila;
    humanosVivosElement.textContent = humanosVivos;
}

// Adiciona mensagem ao log
function adicionarMensagem(texto) {
    const mensagem = document.createElement('p');
    mensagem.textContent = texto;
    mensagensElement.appendChild(mensagem);
    
    // Rolagem automática
    mensagensElement.scrollTop = mensagensElement.scrollHeight;
}

// Inicia o jogo quando a página carrega
window.onload = iniciarJogo;