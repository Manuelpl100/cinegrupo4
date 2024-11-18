// //Cargar los datos de la API
// fetch('/api/salas/1') // Realiza una petición a la API para obtener datos de la sala con ID 1.
//   .then(response => response.json()) // Convierte la respuesta de la API en formato JSON.
//   .then(data => {
//     // Renderizar datos en la cuadrícula
//     const grid = document.querySelector('.grid'); // Selecciona el contenedor de la cuadrícula de asientos.
//     grid.innerHTML = ''; // Limpia cualquier contenido previo en el contenedor.

//     // Recorre la lista de asientos recibidos desde la API
//     data.asientos.forEach(asiento => {
//       const seat = document.createElement('div'); // Crea un div para cada asiento.

//       // Asigna clases CSS dependiendo del estado del asiento (ocupado o libre).
//       seat.className = `w-8 h-8 flex items-center justify-center rounded cursor-pointer ${
//         asiento.estado === 'ocupado' ? 'bg-red-500' : 'bg-blue-500 hover:bg-green-700'
//       }`;

//       seat.textContent = asiento.id; // Muestra el número o ID del asiento dentro del div.
//       seat.dataset.id = asiento.id; // Almacena el ID del asiento como atributo de datos.
//       seat.dataset.estado = asiento.estado; // Almacena el estado del asiento (ocupado o libre).

//       grid.appendChild(seat); // Añade el asiento al contenedor de la cuadrícula.
//     });
//   })
//   .catch(error => console.error('Error al cargar los asientos:', error)); // Muestra un error en caso de que falle la petición.


// //----------------------------------------------------------------------------------------------------
// //Detectar el click en los asientos


//   document.querySelector('#asientos').addEventListener('click', event => {
//     const target = event.target; // Obtiene el elemento que fue clickeado.
  
//     if (target.dataset.estado === 'libre') { 
//       // Si el asiento está libre, permite seleccionarlo.
//       target.classList.remove('bg-blue-500', 'hover:bg-green-700'); // Quita las clases de "libre".
//       target.classList.add('bg-yellow-500'); // Añade la clase de "seleccionado".
//       target.dataset.estado = 'seleccionado'; // Actualiza el estado del asiento.
//     }
//   });


// //----------------------------------------------------------------------------------------------------

//         //Enviar cuando hacemos la reserva de asientos

//   document.querySelector('button').addEventListener('click', () => {
//     const nombre = document.getElementById('nombre').value; // Obtiene el valor del campo "Nombre".
//     const correo = document.getElementById('correo').value; // Obtiene el valor del campo "Correo".
//     const seleccionado = document.querySelector('[data-estado="seleccionado"]'); // Busca el asiento que está seleccionado.
  
//     if (!nombre || !correo || !seleccionado) { 
//       // Si falta algún dato o no se ha seleccionado un asiento, muestra una alerta.
//       alert('Por favor completa todos los campos y selecciona un asiento.');
//       return; // Detiene la ejecución del código si hay algún error.
//     }
  
//     const data = {
//       nombre, // Nombre del usuario.
//       correo, // Correo del usuario.
//       asiento_id: seleccionado.dataset.id, // ID del asiento seleccionado.
//     };
  
//     fetch('/api/reservar', { // Envía los datos al endpoint de reserva.
//       method: 'POST', // Define el método HTTP como POST.
//       headers: {
//         'Content-Type': 'application/json', // Indica que los datos están en formato JSON.
//       },
//       body: JSON.stringify(data), // Convierte el objeto `data` en una cadena JSON para enviarlo.
//     })
//       .then(response => response.json()) // Convierte la respuesta de la API en formato JSON.
//       .then(res => {
//         if (res.success) { 
//           // Si la reserva fue exitosa:
//           alert('Reserva exitosa'); // Muestra una alerta de éxito.
//           seleccionado.classList.remove('bg-yellow-500'); // Quita la clase de "seleccionado".
//           seleccionado.classList.add('bg-red-500'); // Cambia el color a "ocupado".
//           seleccionado.dataset.estado = 'ocupado'; // Actualiza el estado a "ocupado".
//         } else {
//           alert('Error al realizar la reserva'); // Muestra un mensaje de error si falla.
//         }
//       })
//       .catch(error => console.error('Error al enviar la reserva:', error)); // Maneja errores en la petición.
//   });
