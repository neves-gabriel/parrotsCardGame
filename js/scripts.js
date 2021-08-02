let QtdeCartas = 0;





perguntarQtde();

function perguntarQtde() {
    while (QtdeCartas > 14 || QtdeCartas < 4 || QtdeCartas % 2 !== 0) {
        QtdeCartas = parseInt(prompt("Com quantas cartas você quer jogar? Escolha números pares de 4 a 14"));
    }
    montarBaralho();
    iniciarRelogio();
}

function montarBaralho () {

}

function iniciarRelogio () {
    
}