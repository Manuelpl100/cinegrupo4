document.addEventListener('DOMContentLoaded', () => {
    const asientosContainer = document.querySelector('#guardar');
    const reservarButton = document.querySelector('#reservar');
    const crearButton = document.querySelector('#crear');
    const eliminarButton = document.querySelector('#eliminar');

    // Función para reservar los asientos seleccionados

    const reservarAsientos = async () => {
        const asientosSeleccionados = Array.from(asientosContainer.children)
            .filter(child => child.classList.contains('ring-8'));
        if (asientosSeleccionados.length === 0) {
            alert('Por favor, selecciona al menos un asiento.');
            return;
        }

        const ids = asientosSeleccionados.map(asiento => parseInt(asiento.textContent.trim()));

        try {
            const response = await fetch(`/api/1/asientos/reservar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: ids }),
            });

            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje);
                await recargarAsientos();
                asientosSeleccionados.forEach(asiento => {
                    asiento.classList.remove('ring-8', 'ring-yellow-500');
                });
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                const errorMessage = Object.values(errors).flat().join('\n');
                alert(errorMessage);
            } else {
                console.error('Error al reservar los asientos:', error);
                alert('Hubo un problema al realizar la reserva.');
            }
        }
    };

    // Evento de selección de asientos
    asientosContainer.addEventListener('click', (e) => {
        const asientoElement = e.target.closest('div');
        if (!asientoElement || asientoElement.classList.contains('col-span-1')) return;

        const img = asientoElement.querySelector('img');
        if (!img || img.src.includes('asientoocupado.png')) return;

        const asientosSeleccionados = Array.from(asientosContainer.children)
            .filter(child => child.classList.contains('ring-8'));

        if (asientosSeleccionados.length < 10) {
            asientoElement.classList.toggle('ring-8', 'ring-yellow-500');
        } else {
            alert('Solo puedes seleccionar hasta 10 asientos a la vez.');
        }
    });

    // Event listeners para los botones
    reservarButton.addEventListener('click', reservarAsientos);

    // Función para crear un nuevo asiento
    const crearAsiento = async () => {
        const response = await fetch('/asientos/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fila: 1, columna: 1 })
        });

        const result = await response.json();

        if (result.mensaje) {
            alert(result.mensaje);
            await recargarAsientos();
        } else if (result.error) {
            alert(result.error);
        }
    };

    // Event listener para el botón de crear asiento
    crearButton.addEventListener('click', crearAsiento);

    // Función para eliminar un asiento
    const eliminarAsiento = async () => {
        const asientoSeleccionado = asientosContainer.querySelector('.ring-8');
        if (!asientoSeleccionado) {
            alert('Por favor, selecciona un asiento para eliminar.');
            return;
        }

        const img = asientoSeleccionado.querySelector('img');
        if (!img || !img.src.includes('asiento.png')) {
            alert('Solo puedes eliminar asientos que no estan disponibles.');
            return;
        }

        const id = parseInt(asientoSeleccionado.textContent.trim());

        try {
            const response = await fetch(`/asientos/eliminar/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (result.mensaje) {
                alert(result.mensaje);
                await recargarAsientos();
                asientoSeleccionado.classList.remove('ring-8', 'ring-yellow-500');
            } else if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error al eliminar el asiento:', error);
            alert('Hubo un problema al eliminar el asiento.');
        }
    };

    // Event listener para el botón de eliminar asiento
    eliminarButton.addEventListener('click', eliminarAsiento);
});

