// document.body.style.backgroundColor = "red";
// RECORDATORIO:
// Posiciones de cartas random en cada juego DONE
// tener un timer
// mostrar intentos
let colores=["red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue","red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue"];
let cartasDisponibles= document.querySelectorAll(".card");
let cartasClickeadas=[];
let intentos=0;
let tiempo;
let botonInicio= document.getElementById("botonJugar");
botonInicio.onclick= iniciarJuego;

function iniciarJuego(){
    clearInterval(tiempo);
    desabilitarBotonInicio();
    let cartasDisponibles= document.querySelectorAll(".card");
    asignarPosicionesAleatoriamente();
    manejarRonda();
    iniciarTimer();
};

function asignarPosicionesAleatoriamente(){
    cartasDisponibles.forEach(function(nodoCarta){
            let colorAleatorioIndice= colorAleatorioIndex();
            asignarColor(colores[colorAleatorioIndice],nodoCarta);
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
    for(i=0;i<cartasDisponibles.length;i++){
        
        cartasDisponibles[i].addEventListener("click",evento=>manejarInput(evento));
    }
    // if(estanEliminados()){
    //     terminarRonda();
    //     return;
    // }
};

function manejarInput(evento){
    let carta= evento.target;
    if(cartasClickeadas.length<1){
    cartasClickeadas.push(carta);
    carta.classList.remove("oculto")
    } else if (cartasClickeadas.length<2){
        cartasClickeadas.push(carta);
        carta.classList.remove("oculto")
        compararCartas();
    };
    
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
    aumentarIntentos();
    enableInput();
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
function iniciarTimer(){
    let segundos =0;
    tiempo =setInterval(() => {
        document.getElementById("tiempo").innerHTML = `Tiempo: ${segundos} seg`;
        segundos++
        
    }, 1000);
}
function aumentarIntentos(){
    intentos++;
    document.getElementById("intentos").innerHTML = `Intentos: ${intentos}`;
}

function terminarRonda(){
    clearInterval(tiempo);
    intentos =0;
    habilitarBotonInicio();
    restaurarClasesOriginalesCartas();
    botonInicio.onclick= iniciarJuego;
}
function estanEliminados(){
    let valorInicial= true;
    for(i=0; i<cartasDisponibles.length;i++){
         if(!cartasDisponibles[i].classList.contains("eliminado")){
             valorInicial=false;
         }
    }
    return valorInicial; 
}

function desabilitarBotonInicio(){
    botonInicio.style.pointerEvents="none";
};
function habilitarBotonInicio(){
    botonInicio.style.pointerEvents="auto";
};
function restaurarClasesOriginalesCartas(){
    cartasDisponibles.forEach(carta=> carta.className = "col card");
}
function pasarRonda(){
    aumentarIntentos();
    enableInput();
    manejarRonda();
}