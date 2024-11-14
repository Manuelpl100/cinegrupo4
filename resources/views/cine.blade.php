<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sala de Cine</title>
  
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="text-center bg-gray-900 text-white">
  
  <div class="text-center mx-auto max-w-screen-lg">
    <h1 class="text-4xl font-bold mb-8">Sala de Cine</h1>

    <div class="w-full h-40 bg-cover bg-center mt-6 mx-auto max-w-screen-md p-4" style="background-image: url('resources/imagenes/spiderman.png')">
      </div>
    
    Pantalla
  </div>
  
  <div class="grid grid-cols-7 gap-2 mt-24 ml-6 mr-6">
    @for ($i = 0; $i < 70; $i++)
  
      @if ($i % 7 === 3)
        <div class="bg-transparent"></div>
      @else
        <div class="bg-gray-500 rounded-full ">Disponible</div>
      @endif
    @endfor
  </div>

</body>
</html>