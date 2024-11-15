<?php

namespace Database\Seeders;

use App\Models\sala;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\asientos;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
            for ($i=0; $i<2; $i++) {
                sala::factory()->create([
                    'nombre' => "sala",
                ]);
            }

            $salas = Sala::all();

            foreach ($salas as $sala) {
                for ($i = 0; $i < 10; $i++) {
                    for ($j = 0; $j < 7; $j++) {
                        asientos::create([
                            'fila' => $i,
                            'columna' => $j,
                            'disponibilidad' => fake()->numberBetween(0, 1),
                            'id_sala' => $sala->id
                        ]);
                    }
                }
            }


}
}

