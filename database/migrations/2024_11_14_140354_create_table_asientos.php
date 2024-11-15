<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_asientos', function (Blueprint $table) {
            $table->id();  // No es necesario usar ->primary() ya que Laravel ya lo hace automáticamente
            $table->bigInteger('fila');
            $table->bigInteger('columna');
            $table->boolean('disponibilidad');
            $table->unsignedBigInteger('id_sala');
            $table->foreign('id_sala')->references('id')->on('sala');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_asientos');
    }
};
