document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el contenedor de asientos del DOM
    const asientosContainer = document.querySelector('#asientosSala');
    // Obtiene el botón de reserva del DOM
    const reservarButton = document.getElementById('reservar');
    // Variable para almacenar el asiento seleccionado actualmente
    let selectedSeat = null;

    // Verifica si la reserva ya ha sido completada anteriormente
    if (localStorage.getItem('reservationCompleted') === 'true') {
        // Limpia el estado de reserva completada en localStorage
        localStorage.removeItem('reservationCompleted');
        // Muestra un mensaje de éxito de reserva
        alert('Asiento reservado con éxito');
    }

    // Función para actualizar la imagen del asiento según su disponibilidad
    function updateSeatImage(seatElement, isAvailable) {
        // Cambia la imagen del asiento a disponible u ocupado según el estado
        seatElement.querySelector('img').src = isAvailable
            ? '/imagenes/asientodisponible.png'
            : '/imagenes/asientoocupado.png';
    }

    // Añade un evento de clic para seleccionar un asiento
    asientosContainer.addEventListener('click', function(event) {
        // Encuentra el elemento de asiento más cercano que fue clicado
        const seat = event.target.closest('.w-10.h-10');
        // Verifica si el asiento está disponible
        if (seat && seat.querySelector('img').src.includes('asientodisponible.png')) {
            // Si hay un asiento seleccionado anteriormente, elimina su clase de resaltado
            if (selectedSeat) {
                selectedSeat.classList.remove('ring-8', 'ring-yellow-500');
            }
            // Añade clase de resaltado al asiento actualmente seleccionado
            seat.classList.add('ring-8', 'ring-yellow-500');
            // Actualiza el asiento seleccionado
            selectedSeat = seat;
        }
    });

    // Añade un evento de clic para reservar el asiento seleccionado
    reservarButton.addEventListener('click', async function() {
        // Verifica si no hay un asiento seleccionado
        if (!selectedSeat) {
            // Muestra un mensaje solicitando seleccionar un asiento antes de reservar
            alert('Por favor, selecciona un asiento antes de reservar');
            return;
        }

        // Obtiene el ID del asiento seleccionado desde el atributo alt de la imagen
        const seatId = selectedSeat.querySelector('img').alt;
        try {
            // Envía una solicitud GET para reservar el asiento seleccionado
            const response = await fetch(`/public/asientos/reservar/${seatId}`, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            // Convierte la respuesta en JSON
            const data = await response.json();
            // Verifica si hay un mensaje de confirmación
            if (data.mensaje) {
                // Actualiza la imagen del asiento a ocupado
                updateSeatImage(selectedSeat, false);
                // Elimina la clase de resaltado del asiento reservado
                selectedSeat.classList.remove('ring-8', 'ring-yellow-500');
                // Resetea el asiento seleccionado
                selectedSeat = null;

                // Marca que la reserva fue completada en localStorage
                localStorage.setItem('reservationCompleted', 'true');
                // Recarga la página para actualizar el estado de los asientos
                window.location.reload();
            } 

        } catch (error) {
            // Muestra un mensaje de error si la reserva falla
            alert(`Error al realizar la reserva: ${error.message}`);
        }
    });
});
