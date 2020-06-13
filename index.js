// document.body.style.backgroundColor = "red";
// RECORDATORIO:
// Posiciones de cartas random en cada juego
// tener un timer
// mostrar intentos
let colores=["red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue"];
let cartasDisponibles= document.querySelectorAll(".card");
let botonInicio= document.getElementById("botonJugar");
botonInicio.onclick= IniciarJuego;

function IniciarJuego(){
    asignarPosicionesAleatoriamente();
};

function asignarPosicionesAleatoriamente(){

};