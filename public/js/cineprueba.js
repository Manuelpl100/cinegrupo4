document.addEventListener('DOMContentLoaded', () => {
    const asientosContainer = document.querySelector('.grid');
    const reservarButton = document.querySelector('button');
    let asientosData = [];
    let asientoSeleccionado = null;

    // Función para cargar los asientos
    // const cargarAsientos = async () => {
    //     try {
    //         const response = await fetch('/asientos');
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         if (Array.isArray(data)) {
    //             asientosData = data;
    //             actualizarVistaAsientos();
    //         } else {
    //             throw new Error('Formato de datos inesperado');
    //         }
    //     } catch (error) {
    //         console.error('Error al cargar los asientos:', error);
    //         alert('Hubo un problema al cargar los asientos. Por favor, recarga la página.');
    //     }
    // };

    // Función para actualizar la vista de los asientos
    const actualizarVistaAsientos = () => {
        if (!asientosContainer) {
            console.error('El contenedor de asientos no se encontró');
            return;
        }
        const asientosElements = asientosContainer.querySelectorAll('div:not(.col-span-1)');
        asientosElements.forEach((asientoElement, index) => {
            const asiento = asientosData[index];
            if (asiento) {
                asientoElement.classList.toggle('bg-red-500', !asiento.disponibilidad);
                asientoElement.classList.toggle('bg-black', asiento.disponibilidad);
                asientoElement.classList.toggle('cursor-not-allowed', !asiento.disponibilidad);
                asientoElement.classList.toggle('hover:bg-red-900', asiento.disponibilidad);
            }
        });
    };

    // Función para reservar un asiento
    const reservarAsiento = async () => {
        if (!asientoSeleccionado) {
            alert('Por favor, selecciona un asiento primero.');
            return;
        }

        const index = Array.from(asientosContainer.children).indexOf(asientoSeleccionado);
        const asiento = asientosData[index];

        try {
            const response = await fetch('/asientos/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: asiento.id })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje);
                await cargarAsientos();
                asientoSeleccionado = null;
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error al reservar el asiento:', error);
            alert('Hubo un error al intentar reservar el asiento. Por favor, inténtalo de nuevo.');
        }
    };

    // Función para seleccionar un asiento y guardar el elemento seleccionado
    const seleccionarAsiento = (event) => {
        const asientoElement = event.target.closest('div:not(.col-span-1)');
        if (!asientoElement) return;

        if (asientoSeleccionado) {
            asientoSeleccionado.classList.remove('ring-2', 'ring-yellow-500');
        }
        asientoElement.classList.add('ring-2', 'ring-yellow-500');
        asientoSeleccionado = asientoElement;
    };

    // Verificar si los elementos existen antes de agregar event listeners
    if (asientosContainer) {
        asientosContainer.addEventListener('click', seleccionarAsiento);
    } else {
        console.error('El contenedor de asientos no se encontró en el DOM');
    }

    if (reservarButton) {
        reservarButton.addEventListener('click', reservarAsiento);
    } else {
        console.error('El botón de reserva no se encontró en el DOM');
    }

    // Cargar asientos al iniciar
    cargarAsientos();
});
