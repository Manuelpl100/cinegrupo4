document.addEventListener('DOMContentLoaded', () => {
    const asientosContainer = document.querySelector('#guardar');
    const reservarButton = document.querySelector('#reservar');
    const crearButton = document.querySelector('#crear');
    const eliminarButton = document.querySelector('#eliminar');

    // Función para reservar los asientos seleccionados
    const reservarAsientos = async () => {
            const asientosSeleccionados = Array.from(asientosContainer.children)
                .filter(child => child.classList.contains('ring-2'));
            if (asientosSeleccionados.length === 0) {
                alert('Por favor, selecciona al menos un asiento.');
                return;
            }
            if (asientosSeleccionados.length > 10) {
                const cantidadMaxima = 10;
                const asientosParaQuitar = asientosSeleccionados.length - cantidadMaxima;
                asientosSeleccionados.slice(-asientosParaQuitar).forEach(asiento => asiento.classList.remove('ring-2', 'ring-yellow-500'));
                alert(`Solo puedes seleccionar hasta ${cantidadMaxima} asientos a la vez.`);
                return;
            }

        const ids = asientosSeleccionados.map(asiento => parseInt(asiento.textContent.trim()));

        try {
            const response = await fetch('/asientos/reservar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids })
            });

            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje);
                await recargarAsientos();
                asientosSeleccionados.forEach(asiento => {
                    asiento.classList.remove('ring-2', 'ring-yellow-500');
                });
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error al reservar los asientos:', error);
            alert('Hubo un problema al realizar la reserva.');
        }
    };

    // Evento de selección de asientos
    asientosContainer.addEventListener('click', (e) => {
        const asientoElement = e.target.closest('div');
        if (!asientoElement || asientoElement.classList.contains('col-span-1')) return;
        
        const img = asientoElement.querySelector('img');
        if (!img || img.src.includes('asientoocupado.png')) return;

        // Deseleccionar asiento anterior si existe
        const asientoSeleccionadoPrevio = asientosContainer.querySelector('.ring-2');
        if (asientoSeleccionadoPrevio) {
            asientoSeleccionadoPrevio.classList.remove('ring-2', 'ring-yellow-500');
        }

        // Seleccionar nuevo asiento
        asientoElement.classList.add('ring-2', 'ring-yellow-500');
    });

    // Event listeners para los botones
    reservarButton.addEventListener('click', reservarAsientos);

});