<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sala de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="text-center bg-gray-800 text-white bg-cover bg-center" style="background-image: url('{{ asset('imagenes/f-batman.png') }}')">

  <header class="bg-gray-900 py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center px-6">
      <h1 class="text-xl font-bold text-white">Sala de Cine</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><li><a href="{{ url('cartelera') }}" class="text-gray-300 hover:text-white">Cartelera</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="text-center mx-auto max-w-screen-lg">
    <img class="h-72 w-auto mx-auto mt-6 rounded-3xl" src="{{ asset('./imagenes/batman.png') }}" alt="">
  </div>

  <div id="guardar" class="grid grid-cols-11 gap-2 mt-12 mx-auto max-w-2xl">
    @for ($row = 0; $row < 7; $row++)
      @for ($col = 0; $col < 5; $col++)
        <div class="w-10 h-10 bg-transparent flex items-center justify-center rounded cursor-pointer hover:bg-transparent">
          <img src="{{ asset(App\Models\asientos::where('id_sala', 1)->where('id', $row * 10 + $col + 1)->first()->disponibilidad ? './imagenes/asientodisponible.png' : './imagenes/asientoocupado.png') }}" alt="Asiento" class="w-full h-full object-contain">
          {{ $row * 10 + $col + 1 }}
        </div>
      @endfor
      <div class="col-span-1"></div>
      @for ($col = 5; $col < 10; $col++)
        <div class="w-10 h-10 bg-transparent flex items-center justify-center rounded cursor-pointer hover:bg-transparent">
          <img src="{{ asset(App\Models\asientos::where('id_sala', 1)->where('id', $row * 10 + $col + 1)->first()->disponibilidad ? './imagenes/asientodisponible.png' : './imagenes/asientoocupado.png') }}" alt="Asiento" class="w-full h-full object-contain">
          {{ $row * 10 + $col + 1 }}
        </div>
      @endfor
    @endfor
  </div>

  <div class="mt-12 mx-auto max-w-lg flex justify-center items-center">
    <div class="flex space-x-4 justify-center">
      <button id="reservar" class="py-2 px-6 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
        Reservar
      </button>
     
    </div>
  </div>
  

  <script src="{{ asset('js/cineprueba.js') }}"></script>


  <footer class="bg-gray-900 py-8 text-white mt-10">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ml-10">
      <div>
        <h2 class="text-2xl font-bold mb-4">Cine Campeones</h2>
        <p class="text-gray-400">El mejor cine para disfrutar de tus películas favoritas.</p>
        <p class="mt-2 text-gray-400">Horario del cine: <span class="text-white">Lunes a Domingo: 10:00 AM - 11:00 PM</span></p>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4">Contacto</h2>
        <p class="text-gray-400"> Teléfono: <span class="text-white">+34 645 56 45 23</span></p>
        <p class="text-gray-400"> Correo: <a href="mailto:info@cinecampeones.com" class="text-blue-400 hover:underline">info@cinecampeones.com</a></p>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4">Sobre Nosotros</h2>
        <p><span>Alberto Mariscal</span></p>
        <p><span>Alejandro Serrano</span></p>
        <p><span>Diego Jurado</span></p>
        <p><span>Manuel Perea</span></p>
      </div>
    </div>
    <div class="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
      Cine Campeones
    </div>
  </footer>

</body>
</html>

