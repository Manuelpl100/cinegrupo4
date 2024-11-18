<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartelera de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<header class="bg-gray-900 py-4 shadow-md">
  <div class="container mx-auto flex justify-center items-center px-6">
    <h1 class="text-6xl font-bold text-white">CINE CAMPEONES</h1>
  </div>
</header>

<body class="bg-gray-800 text-white h-screen bg-cover bg-center" style="background-image: url('./imagenes/f-cartelera.png');">
  <div class="text-center py-8">

  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-12 mb-24">
  
    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Spiderman</h2>
        <img class="h-72 w-auto mx-auto mt-6" src="{{ asset('imagenes/spidermancartlera.png') }}" alt="Spiderman">
        <h5 class="text-2l font-semibold">Mordido por una araña genéticamente modificada, un estudiante de secundaria tímido y torpe obtiene increíbles capacidades como arácnido. Pronto comprenderá que su cometido es utilizarlas para luchar contra el mal y defender a sus vecinos.</h5>
        <button onclick="window.location.href='./sala/1'" class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
          Ver peli
        </button>
      </div>
    </div>


    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Batman</h2>
        <img class="h-72 w-auto mx-auto mt-6 " src="{{ asset('imagenes/batmancartelera.png') }}" alt="BATMAN">
        <h5 class="text-2l font-semibold">En su segundo año luchando contra el crimen, Batman explora la corrupción existente en la ciudad de Gotham y el vínculo de esta con su propia familia. Además, entrará en conflicto con un asesino en serie conocido como el Acertijo</h5>
        <button onclick="window.location.href='./sala/2'" class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
          Ver peli
        </button>
      </div>
    </div>
  </div>

  <footer class="bg-gray-900 py-8 text-white">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ml-10">
 
      <div>
        <h2 class="text-2xl font-bold mb-4">Cine Campeones</h2>
        <p class="text-gray-400">El mejor cine para disfrutar de tus películas favoritas.</p>
        <p class="mt-2 text-gray-400">Horario del cine: <span class="text-white">Lunes a Domingo: 10:00 AM - 11:00 PM</span></p>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-4">Contacto</h2>
        <p class="text-gray-400">Teléfono: <span class="text-white">+34 666 66 66</span></p>
        <p class="text-gray-400">Correo: <a href="mailto:info@cinecampeones.com" class="text-blue-400 hover:underline">info@cinecampeones.com</a></p>
      </div>

    
      <div>
       
        <h2 class="text-2xl font-bold mb-4">Sobre Nosotros</h2>
        <p><span>Alberto Mariscal</span></p>
        <p><span>Alejandro Serrano</span></p>
        <p><span>Diego Jurado</span></p>
        <p><span>Manuel Perea</span></p>
        </div>
      </div>
    </div>

  
    <div class="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
      Cine Campeones
    </div>
  </footer>
</body>
</html>
