<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sala de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="text-center bg-gray-800 text-white bg-cover bg-center" style="background-image: url('/imagenes/fondo1.png');">
  
 
  <div class="text-center mx-auto max-w-screen-lg">
    <h1 class="text-5xl font-extrabold mt-8">SPIDERMAN</h1>
    <img class="h-72 w-auto mx-auto mt-6" src="{{ asset('imagenes/spiderman.png') }}" alt="Spiderman">
  </div>

  
  <div class="grid grid-cols-11 gap-2 mt-12 mx-auto max-w-2xl">
    @for ($i = 0; $i < 77; $i++)
      @if ($i % 11 == 5) 
        <div class="bg-transparent"></div> 
      @else
      <div class="w-8 h-8 bg-blue-500 flex items-center justify-center rounded cursor-pointer hover:bg-green-700">
       
        </div>
      @endif
    @endfor
  </div>


  <div class="mt-12 mx-auto max-w-lg">
    <h2 class="text-2xl font-semibold mb-6">Reservar tu asiento</h2>
    <div class="flex flex-col space-y-4">
      <div class="flex items-center">
        <label for="nombre" class="text-xl font-bold mr-4 w-28 text-right">Nombre</label>
        <input id="nombre" type="text" placeholder="Escribe aquí..."
               class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"/>
      </div>
      <div class="flex items-center">
        <label for="correo" class="text-xl font-bold mr-4 w-28 text-right">Correo</label>
        <input id="correo" type="text" placeholder="Escribe aquí..."
               class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"/>
      </div>
      <div class="flex items-center justify-center">
        <button class="w-full py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Reservar
        </button>
      </div>
    </div>
  </div>

</body>
</html>
