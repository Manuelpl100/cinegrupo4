// Función para marcar el asiento en rojo 
function marcarAsientoOcupado(i) {
    const elemento = document.querySelector(`#a${$i}`);
    if (elemento) {
        elemento.style.backgroundColor = "red";
        elemento.style.color = "white";
    }
}