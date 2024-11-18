<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartelera de Cine</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-800 text-white">

  
  <div class="text-center py-8">
    <h1 class="text-4xl font-bold">Cartelera de Cine</h1>
    <p class="mt-2 text-xl">Disfruta de las mejores películas</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-12">
    
    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <img src="https://via.placeholder.com/400x600?text=Película+1" alt="Película 1" class="w-full h-80 object-cover">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Spiderman</h2>
        
        <button class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Ver peli</button>
      </div>
    </div>

    <div class="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <img src="./imagenes/spidermancartelera.png" alt="" srcset="">
      <div class="p-4">
        <h2 class="text-2xl font-semibold">Batman</h2>
        <button class="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">Ver peli</button>
      </div>
    </div>
  </div>

</body>
</html>
