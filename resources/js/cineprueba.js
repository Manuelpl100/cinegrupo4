// Este archivo JavaScript se encarga de manejar la logica del frontend para la sala de cine.
// Se ejecuta cuando se carga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    // El contenedor de los asientos
    const asientosContainer = document.querySelector('.space-y-4');
    // El boton para reservar los asientos
    const reservarButton = document.querySelector('#reservar');
    // El boton para crear un nuevo asiento
    const crearButton = document.querySelector('#crear');
    // La identificacion de la sala en la que nos encontramos
    const salaId = 1;

    // Funcion para reservar los asientos seleccionados
    const reservarAsientos = async (asientoSeleccionado) => {
        if (!asientoSeleccionado || !(asientoSeleccionado instanceof HTMLElement) || !asientoSeleccionado.classList.contains('ring-8')) {
            alert('Por favor, selecciona un asiento válido para reservar.');
            return;
        }

        try {
            // Obtenemos el ID del asiento seleccionado
            const imgElement = asientoSeleccionado.querySelector('img');
            if (!imgElement) {
                alert('Error: No se pudo encontrar la imagen del asiento.');
                return;
            }

            const asientoId = imgElement.getAttribute('alt');

            // Hacemos la petición para reservar el asiento
            const response = await fetch(`/api/reservar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ id_asientos: [parseInt(asientoId)] }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en la reserva');
            }

            const result = await response.json();

            if (result.mensaje === 'Asiento reservado con exito') {
                // Actualizamos la UI para mostrar el asiento como ocupado
                imgElement.src = './imagenes/asientoocupado.png';
                // Cambiamos el color del asiento a rojo
                asientoSeleccionado.classList.remove('ring-8', 'ring-yellow-500');
                asientoSeleccionado.classList.add('ring-red-500');
                alert('Asiento reservado con éxito!');
            } else {
                console.error('Error al reservar asiento:', result.error);
            }

        } catch (error) {
            console.error('Error al reservar el asiento:', error);
            alert('Hubo un problema al reservar el asiento. Por favor, inténtalo de nuevo.');
        }
    };

    // Evento para cuando se clickea un asiento y se presiona el botón de reservar
    asientosContainer.addEventListener('click', (e) => {
        const asientoSeleccionado = e.target.closest('.ring-8');
        reservarButton.addEventListener('click', () => {
            reservarAsientos(asientoSeleccionado);
        });
    });

    // Evento para cuando se selecciona un asiento
    asientosContainer.addEventListener('click', (e) => {
        // Obtenemos el elemento que se clickeo
        const asientoElement = e.target.closest('div');

        // Verificamos si se clickeo un asiento y no un espacio vacio
        if (!asientoElement || asientoElement.classList.contains('space-y-4')) return;

        // Obtenemos la imagen del asiento
        const img = asientoElement.querySelector('img');
        // Verificamos si la imagen es una imagen de asiento disponible
        if (!img || img.src.includes('asientoocupado.png')) return;

        // Le agregamos o quitamos la clase de seleccion al asiento
        asientoElement.classList.toggle('ring-8');
        asientoElement.classList.toggle('ring-yellow-500');
    });

    // Event listeners para los botones
    reservarButton.addEventListener('click', reservarAsientos);

});

