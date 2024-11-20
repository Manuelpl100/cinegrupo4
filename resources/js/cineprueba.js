document.addEventListener('DOMContentLoaded', function() {
    const asientosContainer = document.querySelector('.space-y-4');
    const reservarButton = document.getElementById('reservar');
    let selectedSeat = null;

    // Función para actualizar la imagen del asiento
    function updateSeatImage(seatElement, isAvailable) {
        const imgElement = seatElement.querySelector('img');
        if (imgElement) {
            imgElement.src = isAvailable
                ? '/imagenes/asientodisponible.png'
                : '/imagenes/asientoocupado.png';
        }
    }

    // Agregar evento de clic a cada asiento
    document.querySelectorAll('.w-10.h-10').forEach(seat => {
        seat.addEventListener('click', function(event) {
            const imgElement = this.querySelector('img');
            if (imgElement && imgElement.src.includes('asientodisponible.png')) {
                // Deseleccionar el asiento previamente seleccionado
                if (selectedSeat) {
                    selectedSeat.classList.remove('ring-8', 'ring-yellow-500');
                }
                // Seleccionar el nuevo asiento
                this.classList.add('ring-8', 'ring-yellow-500');
                selectedSeat = this;
                console.log('Asiento seleccionado:', imgElement.alt);
            }
        });
    });

    // Agregar evento de clic al botón de reservar
    reservarButton.addEventListener('click', async function() {
        if (!selectedSeat) {
            alert('Por favor, selecciona un asiento antes de reservar');
            return;
        }

        try {
            const seatId = selectedSeat.querySelector('img').alt;

            console.log('Intentando reservar:', {
                seatId,
                url: `/public/asientos/reservar/${seatId}`
            });

            // Llamar al endpoint de reserva con la ruta correcta incluyendo /public/
            const response = await fetch(`/public/asientos/reservar/${seatId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (data.mensaje) {
                // Reserva exitosa
                updateSeatImage(selectedSeat, false);
                selectedSeat.classList.remove('ring-8', 'ring-yellow-500');
                selectedSeat = null;
                alert('Asiento reservado con éxito');

                // Recargar la página para actualizar todos los asientos
                window.location.reload();
            } else if (data.error) {
                alert(`Error: ${data.error}`);
                console.error('Error detallado:', data.error_message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Error al realizar la reserva: ${error.message}`);
        }
    });
});
