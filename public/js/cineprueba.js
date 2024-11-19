// Este archivo JavaScript se encarga de manejar la logica del frontend para la sala de cine.
// Se ejecuta cuando se carga la pagina.
document.addEventListener('DOMContentLoaded', () => {
    // El contenedor de los asientos
    const asientosContainer = document.querySelector('#guardar');
    // El boton para reservar los asientos
    const reservarButton = document.querySelector('#reservar');
    // El boton para crear un nuevo asiento
    const crearButton = document.querySelector('#crear');
    // El boton para eliminar 
    const eliminarButton = document.querySelector('#eliminar');
    // La identificacion de la sala en la que nos encontramos
    const salaId = 1; 

    // Funcion para recargar los asientos
    const recargarAsientos = async () => {
        try {
            // Hacemos una peticion HTTP para obtener los asientos de la sala
            const response = await fetch(`/api/salas/${salaId}/asientos`);
            // Si no hay asientos, no hacemos nada
            if (response.status === 404) return;
            // Verificamos si hubo un error en la peticion
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            // Convertimos la respuesta a un objeto JSON
            const data = await response.json();

            // Recorremos los asientos y actualizamos su imagen dependiendo de si estan disponibles o no
            data.asientos.forEach((asiento) => {
                // Obtenemos el elemento HTML del asiento
                const asientoElement = document.querySelector(`#guardar div:nth-child(${asiento.id})`);
                if (asientoElement) {
                    // Obtenemos la imagen del asiento
                    const img = asientoElement.querySelector('img');
                    // Verificamos si la imagen es una imagen de asiento disponible
                    if (img) {
                        // Actualizamos la imagen del asiento
                        img.src = asiento.disponibilidad ? 
                            './imagenes/asientodisponible.png' : 
                            './imagenes/asientoocupado.png';
                    }
                }
            });
        } catch (error) {
            console.error('Error al recargar los asientos:', error);
            alert('Hubo un problema al cargar los asientos. Por favor, recarga la p gina.');
        }
    };

    // Funcion para reservar los asientos seleccionados
    const reservarAsientos = async () => {
        // Obtenemos los asientos seleccionados por el usuario
        const asientosSeleccionados = Array.from(asientosContainer.children)
            .filter(child => child.classList.contains('ring-8'));

        // Verificamos si se seleccionaron asientos
        if (asientosSeleccionados.length < 1) {
            alert('Por favor, selecciona al menos un asiento.');
            return;
        }
        // Verificamos si se seleccionaron mas de 10 asientos
        if (asientosSeleccionados.length > 10) {
            alert('No puedes seleccionar m s de 10 asientos.');
            asientosSeleccionados.slice(10).forEach(asiento => {
                asiento.classList.remove('ring-8', 'ring-red-500');
            });
            return;
        }

        // Obtenemos los IDs de los asientos seleccionados
        const id_asiento = asientosSeleccionados.map(asiento => 
            parseInt(asiento.textContent.trim()));

        try {
            // Hacemos una peticion HTTP para reservar los asientos
            const response = await fetch(`/api/salas/${salaId}/asientos/reservar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id_asiento }),
            });

            // Verificamos si hubo un error en la peticion
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error en la reserva');
            }

            // Obtenemos los datos de la respuesta
            const result = await response.json();

            // Mostramos un mensaje segun lo que suceda
            if (result.mensaje) {
                alert(result.mensaje);
                // Recargamos los asientos y quitamos la seleccion de los asientos
                await recargarAsientos();
                asientosSeleccionados.forEach(asiento => {
                    asiento.classList.remove('ring-8', 'ring-red-500');
                });
            }
        } catch (error) {
            console.error('Error al reservar los asientos:', error);
            alert(error.message || 'Hubo un problema al realizar la reserva.');
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

    // Cargar asientos al iniciar
    recargarAsientos();
});

