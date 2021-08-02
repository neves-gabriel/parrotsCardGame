let qtdeCartas = 0;
let cartasSelecionadas = [];
let segundos = 0;
let intervalo;
let bloqueio = false;
let totalJogadas = 0;
let cartaAnterior = "";
let parrotAnterior = "";
let cartasViradas = 0;
let nome = "";
const relogio = document.getElementById("relogio");
const tiposCartas = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"]

document.querySelector("#baralho").addEventListener('click', userClick);

perguntarNome();

function perguntarNome() {
    while (nome == "") {
        nome = prompt("Qual é o seu nome?");
    }
    perguntarQtde();
}

function perguntarQtde() {
    while (qtdeCartas > 14 || qtdeCartas < 4 || qtdeCartas % 2 !== 0) {
        qtdeCartas = parseInt(prompt("Com quantas cartas você quer jogar? Escolha números pares de 4 a 14"));
    }
    montarBaralho();
    iniciarRelogio();
}

function iniciarRelogio () {
    clearInterval(intervalo);
    intervalo = setInterval(contarSegundos, 1000);
}

function contarSegundos() {
    segundos++;
    relogio.innerHTML = segundos;
}

function pararRelogio() {
    contarSegundos();
    clearInterval(intervalo);
}

function montarBaralho() {
    embaralharCartas();
    document.getElementById("baralho").innerHTML = "";
    for (let i = 0; i < qtdeCartas; i++) {
        document.getElementById("baralho").innerHTML += 
        `<li class="carta ${cartasSelecionadas[i]}">
            <div class="frente face">
            </div>
            <div class="costa face">
            </div>
        </li>`;
    }
}

function embaralharCartas() {
    cartasSelecionadas = tiposCartas.sort(comparador).slice(0, qtdeCartas / 2);
    cartasSelecionadas = cartasSelecionadas.concat(cartasSelecionadas);
    cartasSelecionadas = cartasSelecionadas.sort(comparador);
}

function comparador() {
    return Math.random() - 0.5;
}

function userClick(event) {
    const cartaEscolhida = event.target.parentNode;
    const tipoParrot = cartaEscolhida.classList[1]
    if (cartaEscolhida.classList[0] === "carta" && !cartaEscolhida.classList.contains("virada") && bloqueio !== true) {
        cartaEscolhida.classList.add("virada");
        totalJogadas++;
        if (cartaAnterior === "") {
            cartaAnterior = cartaEscolhida;
            parrotAnterior = tipoParrot;
        } else if (tipoParrot !== parrotAnterior) {
            bloqueio = true;
            setTimeout(function () {
                bloqueio = false;
                cartaEscolhida.classList.remove("virada");
                cartaAnterior.classList.remove("virada");
                cartaAnterior = "";
                parrotAnterior = "";
            }, 1000);
        } else {
            cartasViradas = cartasViradas + 2;
            cartaAnterior = "";
            parrotAnterior = "";
        }
        if (cartasViradas === qtdeCartas) {
            pararRelogio();
            setTimeout(finalJogo, 1000);
        }
    }
}

function finalJogo() {
    alert(`Você ganhou em ${totalJogadas} jogadas e ${segundos} segundos!`);
    let respostaPrompt = false;
    while (!respostaPrompt) {
        reiniciarPartida = prompt("Você gostaria de reiniciar a partida? Responda abaixo com sim ou não");
        if (reiniciarPartida === "sim" || reiniciarPartida === "s" || reiniciarPartida === "y" || reiniciarPartida === "yes") {
            respostaPrompt = true;
            qtdeCartas = 0;
            totalJogadas = 0;
            cartasViradas = 0;
            segundos = 0;
            relogio.innerHTML = "0";
            nome = "";
            perguntarNome();
        } else if (reiniciarPartida === "não" || reiniciarPartida === "nao" || reiniciarPartida === "n" || reiniciarPartida === "no") {
            respostaPrompt = true;
        }
    }
}