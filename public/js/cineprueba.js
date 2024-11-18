document.addEventListener('DOMContentLoaded', () => {
    const asientosContainer = document.getElementById('asientos');
    const reservarButton = document.querySelector('button');
    let asientosData = [];
    let asientoSeleccionado = null;

    const cargarAsientos = async () => {
        try {
            const response = await fetch('/asientos');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data)) {
                throw new Error('Los datos recibidos no son un array');
            }
            asientosData = data;
            actualizarVistaAsientos();
        } catch (error) {
            console.error('Error al cargar los asientos:', error);
            alert('Hubo un problema al cargar los asientos. Por favor, recarga la página y revisa la consola para más detalles.');
        }
    };

    const actualizarVistaAsientos = () => {
        asientosData.forEach(asiento => {
            const asientoElement = document.getElementById(`a${asiento.id}`);
            if (asientoElement) {
                asientoElement.classList.remove('bg-blue-500', 'bg-red-500');
                asientoElement.classList.add(asiento.disponibilidad ? 'bg-blue-500' : 'bg-red-500');
                asientoElement.classList.toggle('cursor-not-allowed', !asiento.disponibilidad);
            }
        });
    };

    const actualizarEstadoBotonReserva = () => {
        reservarButton.disabled = !asientoSeleccionado;
        reservarButton.classList.toggle('opacity-50', !asientoSeleccionado);
        reservarButton.classList.toggle('cursor-not-allowed', !asientoSeleccionado);
    };

    const seleccionarAsiento = (event) => {
        const asientoElement = event.target.closest('[id^="a"]');
        if (!asientoElement) return;

        const asientoId = parseInt(asientoElement.id.slice(1));
        const asiento = asientosData.find(a => a.id === asientoId);

        if (asiento && asiento.disponibilidad) {
            if (asientoSeleccionado) {
                asientoSeleccionado.classList.remove('ring-2', 'ring-yellow-500');
            }
            if (asientoSeleccionado === asientoElement) {
                asientoSeleccionado = null;
            } else {
                asientoElement.classList.add('ring-2', 'ring-yellow-500');
                asientoSeleccionado = asientoElement;
            }
            actualizarEstadoBotonReserva();
        }
    };

    const reservarAsiento = async () => {
        if (!asientoSeleccionado) {
            alert('Por favor, selecciona un asiento primero.');
            return;
        }

        const asientoId = parseInt(asientoSeleccionado.id.slice(1));

        try {
            const response = await fetch('/asientos/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({ id: asientoId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje);
                await cargarAsientos();
                asientoSeleccionado.classList.remove('ring-2', 'ring-yellow-500');
                asientoSeleccionado = null;
                actualizarEstadoBotonReserva();
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error al reservar el asiento:', error);
            alert('Hubo un error al intentar reservar el asiento. Por favor, inténtalo de nuevo.');
        }
    };

    asientosContainer.addEventListener('click', seleccionarAsiento);
    reservarButton.addEventListener('click', reservarAsiento);

    cargarAsientos();
    actualizarEstadoBotonReserva();
});