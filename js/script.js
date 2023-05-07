/* Variables */
let tarjetaDestapada = 0;
let tarjeta = null;
let tarjeta1 = null;
let primerResultado = 0;
let seguidoResultado = 0;
let movimientos = 0;
let aciertos = 0;
let primerBoton = null;
let segundoBoton = null;
let tiempo = 30;
let temporizador = false;
let setIntervalo = null;

/* Generacion de numero aleatorios */
let num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
num = num.sort(() => { return Math.random() - 0.5 });

/* VARIABLES DE DOM */
let numeros = document.querySelectorAll("[buttom]");
let conteoMovimientos = document.querySelector("[movimiento]");
let imprimirAciertos = document.querySelector("[acierto]");
let mostrarTiempo = document.querySelector("[tiempo]");

/* SOUDS GAMES */
let louseAudio = new Audio("../sounds/perder.wav");
let winAudio = new Audio("../sounds/win.wav");
let pulsarAudio = new Audio("../sounds/pulsar.wav");
let aciertoAudio = new Audio("../sounds/acierto.wav");

for (let i = 0; i < numeros.length; i++) {

    numeros[i].addEventListener("click", () => {
        tarjetaDestapada++

        if (temporizador == false) {
            temporizadorTiempo();
            temporizador = true;
        }

        if (tarjetaDestapada == 1) {

            primerResultado = `<img class="icon__img" src="./img/${num[i]}.png" alt="imgen">`;
            pulsarAudio.play();
            primerBoton = numeros[i];

            numeros[i].innerHTML = primerResultado;
            numeros[i].disabled = true;
        }

        if (tarjetaDestapada == 2) {

            seguidoResultado = `<img class="icon__img" src="./img/${num[i]}.png" alt="imgen">`;
            pulsarAudio.play();
            segundoBoton = numeros[i];

            numeros[i].innerHTML = seguidoResultado;
            numeros[i].disabled = true;

            /* Contador movimiento */
            movimientos++;

            /* Imprimiendo movimiento */
            conteoMovimientos.innerHTML = `Movimientos ${movimientos}`;

            /* Reiniciando variable tarjeta detapada */
            tarjetaDestapada = 0;

            /* Comparando Valores */
            if (primerResultado == seguidoResultado) {
                /* incrementar aciertos */
                aciertos++;
                aciertoAudio.play();
                imprimirAciertos.innerHTML = `Aciertos: ${aciertos}`;

                if (aciertos == 8) {
                    clearInterval(setIntervalo);
                    winAudio.play();
                    imprimirAciertos.innerHTML = `Usted gano`;
                }
            } else {
                setTimeout(() => {
                    primerBoton.innerHTML = "";
                    segundoBoton.innerHTML = "";
                    primerBoton.disabled = false;
                    segundoBoton.disabled = false;
                }, 120);
            }
        }
    })
}


/*  FUNCIONES */

function temporizadorTiempo() {
    setIntervalo = setInterval(() => {
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo ${tiempo} Restante`;

        if (tiempo == 0) {
            clearInterval(setIntervalo);
            desbloquearTarjeta();
            louseAudio.play();
        }
    }, 1000);
}

function desbloquearTarjeta() {

    for (let i = 0; i < numeros.length; i++) {
        numeros[i].innerHTML = `<img class="icon__img" src="./img/${num[i]}.png" alt="imgen">`;
        if (numeros[i].disabled == false) {
            numeros[i].disabled = true;
        }
    }
}



