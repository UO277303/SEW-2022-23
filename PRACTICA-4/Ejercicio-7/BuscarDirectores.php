<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Directores</title>
    
    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />
</head>

<body>
    <h1>Base de datos: Cine</h1>

    <nav>
        <a href="BuscarPeliculas.php">PELÍCULAS</a>
        <a href="BuscarActores.php">ACTORES</a>
        <a href="BuscarDirectores.php">DIRECTORES</a>
    </nav>
    
    <h2>Buscar directores:</h2>
    <form action='#' method='post'>
        <label for='nombre'>Introduce un nombre:</label>
        <input type='text' id='nombre' name='nombre'/>
        <label for='apellido'>Introduce un apellido:</label>
        <input type='text' id='apellido' name='apellido'/>

        <input type='submit' name='buscar' value='Buscar directores'/>
    </form>

    <?php
	require('BaseDatosCine.php');
	$bd = new BaseDatosCine();

	if (count($_POST) > 0) {
		if (isset($_POST['buscar'])) {
			$bd->buscarDirector();
        }
    }
	?>
</body>
</html>