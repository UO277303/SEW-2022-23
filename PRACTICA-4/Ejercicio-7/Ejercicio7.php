<?php
    session_start();
    require('BaseDatosCine.php');
	$bd = new BaseDatosCine();
    $bd->crearBase();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Base de datos de Cine</title>
    
    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />
</head>

<body>
    <h1>Base de datos: Cine</h1>

    <nav>
        <a href="BuscarPeliculas.php">PELÍCULAS</a>
        <a href="BuscarActores.php">ACTORES</a>
        <a href="BuscarDirectores.php">DIRECTORES</a>
    </nav>

</body>
</html>