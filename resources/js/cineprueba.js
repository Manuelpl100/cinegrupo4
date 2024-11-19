// Este archivo JavaScript se encarga de manejar la logica del frontend para la sala de cine.
// Se ejecuta cuando se carga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    // El contenedor de los asientos
    const asientosContainer = document.querySelector('#guardar');
    // El boton para reservar los asientos
    const reservarButton = document.querySelector('#reservar');
    // El boton para crear un nuevo asiento
    const crearButton = document.querySelector('#crear');
    // La identificacion de la sala en la que nos encontramos
    const salaId = 1;

    // Funcion para reservar los asientos seleccionados
    const reservarAsientos = async () => {
        // Obtenemos todos los asientos seleccionados
    const asientosSeleccionados = document.querySelector('#guardar');

    if (asientosSeleccionados.length === 0) {
        alert('Por favor, selecciona al menos un asiento para reservar.');
        return;
    }

    try {
            const asientoId = asientosSeleccionados.getAttribute('data-id');
            console.log("sellega1");
            console.log("Requesting URL:", `/asientos/reservar/${asientoId}`);

            // Hacemos la petición para reservar el asiento
            const response = await fetch(`/asientos/reservar/${asientoId}`, {
                method: 'GET',
            }).catch(error => {
                console.error("Fetch error:", error);
                throw error;
            });

            console.log("sellega2");
            console.log(asientoId);
            console.log("Response status:", response.status);
            console.log("Response OK:", response.ok);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("sellega3")
            const result = await response.json();

            if (result.mensaje === 'Asiento reservado con exito') {
                // Actualizamos la UI para mostrar el asiento como ocupado
                const img = asiento.querySelector('img');
                console.log("sellega4")
                if (img) {
                    img.src = './imagenes/asientoocupado.png';
                    console.log("sellega5")
                }
                // Removemos las clases de selección
                asiento.classList.remove('ring-8', 'ring-yellow-500');
            } else {
                console.error('Error al reservar asiento:', result.error);
            }


        alert('Asientos reservados con éxito!');
        // Opcionalmente, podrías llamar a recargarAsientos() aquí si quieres actualizar toda la sala
    } catch (error) {
        console.error('Error al reservar los asientos:', error);
        alert('Hubo un problema al reservar los asientos. Por favor, inténtalo de nuevo.');
    }
    };

    // Evento para cuando se selecciona un asiento
    asientosContainer.addEventListener('click', (e) => {
        // Obtenemos el elemento que se clickeo
        const asientoElement = e.target.closest('div');
        // Verificamos si se clickeo un asiento y no un espacio vacio
        if (!asientoElement || asientoElement.classList.contains('col-span-1')) return;

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
