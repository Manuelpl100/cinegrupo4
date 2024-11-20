// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/js/cineprueba.js'], // Asegúrate de incluir tu archivo aquí
//             refresh: true,
//         }),
//     ],
// });

import { defineConfig } from 'vite';

export default defineConfig({
  root: './api/index.php', // Asegúrate de que este valor apunta al directorio donde está `index.html`
  build: {
    outDir: 'dist', // Directorio de salida
  },
});