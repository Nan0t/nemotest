// document.body.style.backgroundColor = "red";
// RECORDATORIO:
// Posiciones de cartas random en cada juego
// tener un timer
// mostrar intentos
let colores=["red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue","red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue"];
let cartasDisponibles= document.querySelectorAll(".card");
let cartasAsignadas=[];
let cartasClickeadas=[];
let intentos=0;
let botonInicio= document.getElementById("botonJugar");
botonInicio.onclick= iniciarJuego;

function iniciarJuego(){
    let cartasDisponibles= document.querySelectorAll(".card");
    asignarPosicionesAleatoriamente();
    manejarRonda();
};

function asignarPosicionesAleatoriamente(){
    cartasDisponibles.forEach(function(nodoCarta){
            let colorAleatorioIndice= colorAleatorioIndex();
            asignarColor(colores[colorAleatorioIndice],nodoCarta);
            cartasAsignadas.push(nodoCarta);
            colores.splice(colorAleatorioIndice,1);
    })
};

function colorAleatorioIndex(){
    return Math.floor(Math.random()*colores.length);
};

function asignarColor(color, carta){
    carta.classList.add(color);
    carta.classList.add("oculto");
};

function manejarRonda(){
    for(i=0;i<cartasAsignadas.length;i++){
        cartasAsignadas[i].addEventListener("click",evento=>manejarInput(evento));
    }
};

function manejarInput(evento){
    disableInput();
    let carta= evento.target;
    cartasClickeadas.push(carta);
    carta.classList.remove("oculto")
    if (cartasClickeadas.length===2){
        compararCartas();
    };
    enableInput();
}

function compararCartas(){
    disableInput();
    setTimeout(function(){
    if(cartasClickeadas[0].isEqualNode(cartasClickeadas[1]) && cartasClickeadas[0]!==cartasClickeadas[1]){
        cartasClickeadas.forEach(carta=>eliminar(carta));
        liberarCartasClickeadas()
    } else {
        cartasClickeadas.forEach(carta=>carta.classList.add("oculto"));
        liberarCartasClickeadas();
    }},1000);
}
function eliminar(carta){
    carta.classList.add("eliminado");
}
function liberarCartasClickeadas(){
    cartasClickeadas.pop();
    cartasClickeadas.pop();
}
function disableInput() {
    cartasDisponibles.forEach(carta=> carta.style.pointerEvents="none");
  };
function enableInput(){
    cartasDisponibles.forEach(carta=> carta.style.pointerEvents="auto");
}