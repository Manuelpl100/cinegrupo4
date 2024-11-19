import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/cineprueba.js'], // Asegúrate de incluir tu archivo aquí
            refresh: true,
        }),
    ],
});