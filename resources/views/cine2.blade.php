<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sala de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="text-center bg-gray-800 text-white bg-cover bg-center" style="background-image: url('/imagenes/fondo1.png');">

  <!-- Header -->
  <header class="bg-gray-900 py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center px-6">
      <h1 class="text-xl font-bold text-white">Sala de Cine</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#home" class="text-gray-300 hover:text-white">Cartelera</a></li>
          <li><a href="#movies" class="text-gray-300 hover:text-white">Spiderman</a></li>
          <li><a href="#movies" class="text-gray-300 hover:text-white">Batman</a></li>
          
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <div class="text-center mx-auto max-w-screen-lg">
    <h1 class="text-2xl font-extrabold mt-8">BATMAN</h1>
    <img class="h-72 w-auto mx-auto mt-6" src="{{ asset('imagenes/batman.png') }}" alt="BATMAN">
  </div>

  <div class="grid grid-cols-11 gap-2 mt-12 mx-auto max-w-2xl">
    @for ($i = 0; $i < 77; $i++)
      @if ($i % 11 == 5)
        <div class="col-span-1"></div> 
      @else
        <div class="w-8 h-8 bg-blue-500 flex items-center justify-center rounded cursor-pointer hover:bg-green-700">
       
        </div>
      @endif
    @endfor
  </div>

  <div class="mt-12 mx-auto max-w-lg">
    <button class="w-full py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
      Reservar
    </button>
  </div>
 

  <footer class="bg-gray-900 py-4 mt-12">
    <div class="container mx-auto text-center">
      <p class="text-gray-400 text-sm"> Cine Campeones</p>
      </div>
    </div>

  </footer>

</body>
</html>
