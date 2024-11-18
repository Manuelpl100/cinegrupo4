document.addEventListener('DOMContentLoaded', () => {
    const asientosContainer = document.querySelector('.grid');
    const reservarButton = document.querySelector('#reservar-button');
    let asientosData = [];
    let salaId = 1; // Cambiar si es necesario obtener dinámicamente la sala.

    // Función para cargar los asientos de la sala
    const cargarAsientos = async () => {
        try {
            const response = await fetch(`/api/v1/salas/${salaId}/asientos`);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
            const data = await response.json();
            asientosData = data.asientos || [];
            actualizarVistaAsientos();
        } catch (error) {
            console.error('Error al cargar los asientos:', error);
            alert('Hubo un problema al cargar los asientos.');
        }
    };

    // Función para actualizar la vista de los asientos
    const actualizarVistaAsientos = () => {
        if (!asientosContainer) {
            console.error('El contenedor de asientos no existe en el DOM.');
            return;
        }

        asientosContainer.innerHTML = ''; // Limpiar los asientos anteriores
        asientosData.forEach((asiento, index) => {
            const asientoElement = document.createElement('div');
            asientoElement.dataset.index = index;
            asientoElement.dataset.id = asiento.id;
            asientoElement.className = `w-10 h-10 rounded flex items-center justify-center cursor-pointer 
                ${asiento.disponibilidad ? 'bg-black hover:bg-green-500' : 'bg-red-500 cursor-not-allowed'}`;
            asientosContainer.appendChild(asientoElement);
        });
    };

    // Función para reservar los asientos seleccionados
    const reservarAsientos = async () => {
        const seleccionados = Array.from(asientosContainer.querySelectorAll('.ring-2'))
            .map(el => el.dataset.id);

        if (!seleccionados.length) {
            alert('Selecciona al menos un asiento.');
            return;
        }

        try {
            const response = await fetch(`/api/v1/salas/${salaId}/reservar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: seleccionados }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error desconocido');
            }

            alert('Reserva realizada con éxito.');
            await cargarAsientos();
        } catch (error) {
            console.error('Error al reservar los asientos:', error);
            alert('No se pudieron reservar los asientos.');
        }
    };

    // Manejo de selección de asientos
    asientosContainer.addEventListener('click', (e) => {
        const asientoElement = e.target.closest('div[data-index]');
        if (!asientoElement || asientoElement.classList.contains('cursor-not-allowed')) return;

        asientoElement.classList.toggle('ring-2');
        asientoElement.classList.toggle('ring-yellow-500');
    });

    // Lógica del botón "Reservar"
    if (reservarButton) {
        reservarButton.addEventListener('click', reservarAsientos);
    } else {
        console.error('No se encontró el botón de reserva en el DOM.');
    }

    // Cargar asientos al inicializar la página
    cargarAsientos();
});