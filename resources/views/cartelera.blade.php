<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartelera de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<header class="bg-gray-900 py-4 shadow-md">
  <div class="container mx-auto flex justify-between items-center px-6">
    <h1 class="text-xl font-bold text-white">Sala de Cine</h1>
    <nav>
      <ul class="flex space-x-4">
        <li><a href="#home" class="text-gray-300 hover:text-white">Inicio</a></li>
        <li><a href="#movies" class="text-gray-300 hover:text-white">Películas</a></li>
        <li><a href="#contact" class="text-gray-300 hover:text-white">Contacto</a></li>
      </ul>
    </nav>
  </div>
</header>

<body class="bg-gray-800 text-white h-screen bg-cover bg-center" style="background-image: url('./imagenes/f-cartelera.png');>
 

  <div class="text-center py-8">
   
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-12">
    
    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Spiderman</h2>
        <img class="h-72 w-auto mx-auto mt-6" src="{{ asset('imagenes/spidermancartlera.png') }}" alt="Spiderman">
        <h5 class="text-2l font-semibold">En su segundo año luchando contra el crimen, Batman explora la corrupción existente en la ciudad de Gotham y el vínculo de esta con su propia familia. Además, entrará en conflicto con un asesino en serie conocido como el Acertijo</h5>
        <button class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Ver peli</button>
      </div>
    </div>

    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Batman</h2>
        <img class="h-72 w-auto mx-auto mt-6 " src="{{ asset('imagenes/batmancartelera.png') }}" alt="BATMAN">
        <h5 class="text-2l font-semibold">En su segundo año luchando contra el crimen, Batman explora la corrupción existente en la ciudad de Gotham y el vínculo de esta con su propia familia. Además, entrará en conflicto con un asesino en serie conocido como el Acertijo</h5>
        <button class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Ver peli</button>
      </div>
    </div>
  </div>

</body>
</html>
