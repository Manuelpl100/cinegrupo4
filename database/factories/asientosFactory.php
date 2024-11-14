<?php

namespace Database\Factories;

use App\Models\asientos;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class asientosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $asiento = asientos::all();
        return [

            'fila' => fake()->name(),
            'columna' => fake()->lastName(),
            'disponibilidad' => fake()->lastName(),

            //
        ];
    }
}
