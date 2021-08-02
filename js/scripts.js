let qtdeCartas = 0;
let segundos = 0;
let intervalo;
const relogio = document.getElementById("relogio");
const tiposCartas = ["bobross", "explody", "fiesta", "metal", "revertit", "triplets", "unicorn"]





perguntarQtde();

function perguntarQtde() {
    while (qtdeCartas > 14 || qtdeCartas < 4 || qtdeCartas % 2 !== 0) {
        qtdeCartas = parseInt(prompt("Com quantas cartas você quer jogar? Escolha números pares de 4 a 14"));
    }
    montarBaralho();
    iniciarRelogio();
}

function montarBaralho () {

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

