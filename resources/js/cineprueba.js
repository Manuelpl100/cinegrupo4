document.addEventListener('DOMContentLoaded', function() {
    const asientosCon = document.querySelector('#asientosSala');
    const reservarBoton = document.getElementById('reservar');
    // Variable para almacenar el asiento que seleccionamos 
    let seleccionAsiento = null;

    // Verifica si la reserva ya ha sido completada anteriormente
    if (localStorage.getItem('Asientoreservado') === 'true') {
        // Limpia el estado de reserva completada en localStorage
        localStorage.removeItem('Asientoreservado');
        // Muestra un mensaje de éxito de reserva
        alert('Asiento reservado con éxito');
    }

    // Función para actualizar la imagen del asiento según su disponibilidad
    function cambioImagen(elemento, asientoLibre) {
        // Cambia la imagen del asiento a disponible u ocupado según el estado
        if (asientoLibre) {
            elemento.querySelector('img').src = '/imagenes/asientodisponible.png';
        } else {
            elemento.querySelector('img').src = '/imagenes/asientoocupado.png';
        }
    }

    // Añade un evento de clic para seleccionar un asiento
    asientosCon.addEventListener('click', function(event) {
        // Encuentra el elemento de asiento más cercano que fue clicado
        const asi = event.target.closest('.w-10.h-10');
        // Verifica si el asiento está disponible
        if (asi && asi.querySelector('img').src.includes('asientodisponible.png')) {
            // Si hay un asiento seleccionado anteriormente, elimina su clase de resaltado
            if (seleccionAsiento) {
                seleccionAsiento.classList.remove('ring-8', 'ring-yellow-500');
            }
            // Añade clase de resaltado al asiento actualmente seleccionado
            asi.classList.add('ring-8', 'ring-yellow-500');
            // Actualiza el asiento seleccionado
            seleccionAsiento = asi;
        }
    });

    // Añade un evento de clic para reservar el asiento seleccionado
    reservarBoton.addEventListener('click', async function() {
        // Verifica si no hay un asiento seleccionado
        if (!seleccionAsiento) {
            // Muestra un mensaje solicitando seleccionar un asiento antes de reservar
            alert('Selecciona un asiento primero');
            return;
        }

        // Obtiene el ID del asiento seleccionado desde el atributo alt de la imagen
        const idAsiento = seleccionAsiento.querySelector('img').alt;
        try {
            // Envía una solicitud GET para reservar el asiento seleccionado
            const response = await fetch(`/public/asientos/reservar/${idAsiento}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            // Convierte la respuesta en JSON
            const data = await response.json();
            // Verifica si hay un mensaje de confirmación
            if (data.mensaje) {
                // Actualiza la imagen del asiento a ocupado
                cambioImagen(seleccionAsiento, false);
                // Elimina la clase de resaltado del asiento reservado
                seleccionAsiento.classList.remove('ring-8', 'ring-yellow-500');
                // Resetea el asiento seleccionado
                seleccionAsiento = null;

                // Marca que la reserva fue completada en localStorage
                localStorage.setItem('Asientoreservado', 'true');
                // Recarga la página para actualizar el estado de los asientos
                window.location.reload();
            } 
        } catch (error) {
            // Muestra un mensaje de error si la reserva falla
            alert(`Error al realizar la reserva`);
        }
    });
});