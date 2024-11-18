// Función para reservar un asiento
function reservarAsiento(idAsiento) {
  // Hacer la solicitud POST a la API para reservar el asiento
  fetch('/reservar', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')  // Token CSRF para seguridad
      },
      body: JSON.stringify({ id: idAsiento })  // Enviar el ID del asiento
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error);  // Mostrar mensaje de error
      } else {
          alert(data.mensaje);  // Mostrar mensaje de éxito
      }
  })
  .catch(error => {
      console.error('Error al reservar el asiento:', error);
      alert('Hubo un problema al reservar el asiento.');
  });
}


// Función para obtener un asiento disponible aleatorio
function obtenerAsientoAleatorio() {
  fetch('/buscarAsientoDisponibleAleatorio')
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error);  // Mostrar mensaje de error si no hay asientos disponibles
      } else {
          alert(`Asiento aleatorio disponible: ${data.id}`);  // Mostrar el asiento encontrado
          // Realizar la reserva automáticamente si se quiere
          reservarAsiento(data.id);
      }
  })
  .catch(error => {
      console.error('Error al obtener un asiento aleatorio:', error);
      alert('Hubo un problema al obtener un asiento aleatorio.');
  });
}


// Función para contar los asientos ocupados
function contarAsientosOcupados() {
  fetch('/contarAsientosOcupados')
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error);  // Mostrar mensaje de error si ocurre algún problema
      } else {
          alert(`Número de asientos ocupados: ${data.ocupados}`);  // Mostrar el número de asientos ocupados
      }
  })
  .catch(error => {
      console.error('Error al contar los asientos ocupados:', error);
      alert('Hubo un problema al contar los asientos ocupados.');
  });
}