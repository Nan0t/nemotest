let colores,
cartasDisponibles= document.querySelectorAll(".card"),
cartasClickeadas=[],
intentos=0,
tiempo,
intentosAcertados=0,
vecesJugadas=0;
botonInicio= document.getElementById("botonJugar");

botonInicio.onclick= iniciarJuego;

function iniciarJuego(){
    colores=["red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue","red","blue","darkgreen","cyan","darkslateblue","indigo","saddlebrown","aliceblue"];
    intentosAcertados=0;
    clearInterval(tiempo);
    desabilitarBotonInicio();
    asignarPosicionesAleatoriamente(colores);
    iniciarTimer();
    if(vecesJugadas===0){
        vecesJugadas++;
        manejarRonda();
    }
};

function asignarPosicionesAleatoriamente(colores){
    cartasDisponibles.forEach(function(nodoCarta){
            let colorAleatorioIndice= colorAleatorioIndex(colores);
            asignarColor(colores[colorAleatorioIndice],nodoCarta);
            colores.splice(colorAleatorioIndice,1);
    })
};

function colorAleatorioIndex(colores){
    return Math.floor(Math.random()*colores.length);
};

function asignarColor(color, carta){
    carta.classList.add(color);
    carta.classList.add("oculto");
};

function manejarRonda(){  
    let evento= document.getElementById("tablero");
    evento.addEventListener("click", function(event){
        let elemento=  event.target;
        if(elemento.classList.contains("card")){
            manejarInput(elemento);
        }
    })
};

function manejarInput(elemento){
    let carta= elemento;
    if(cartasClickeadas.length<1){
    cartasClickeadas.push(carta);
    carta.classList.remove("oculto")
    } else if (cartasClickeadas.length<2){
        cartasClickeadas.push(carta);
        carta.classList.remove("oculto")
        compararCartas();
    };
    setTimeout(verificarFin,1000)
}

function compararCartas(){
    disableInput();
    setTimeout(function(){
    if(cartasClickeadas[0].isEqualNode(cartasClickeadas[1]) && cartasClickeadas[0]!==cartasClickeadas[1]){
        cartasClickeadas.forEach(carta=>eliminar(carta));
        liberarCartasClickeadas();
        aumentarAcertados();
    } else {
        cartasClickeadas.forEach(carta=>carta.classList.add("oculto"));
        liberarCartasClickeadas();
    }},1000);
    aumentarIntentos();
    enableInput();
}
function eliminar(elemento){
    elemento.classList.add("eliminado");
}
function mostrar(elemento){
    elemento.classList.remove("eliminado");
};
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
    botonInicio.onclick= function(){
        iniciarJuego();
        eliminar(document.getElementById("felicitacion"))};
}

function desabilitarBotonInicio(){
    botonInicio.style.pointerEvents="none";
};
function habilitarBotonInicio(){
    botonInicio.style.pointerEvents="auto";
};
function restaurarClasesOriginalesCartas(){
    cartasDisponibles.forEach(carta=> carta.className = "col card");
};
function aumentarAcertados(){
    intentosAcertados++;
};
function verificarFin(){
    if(intentosAcertados===8){
        terminarRonda();
        mostrar(document.getElementById("felicitacion"))
        return;
    }
}