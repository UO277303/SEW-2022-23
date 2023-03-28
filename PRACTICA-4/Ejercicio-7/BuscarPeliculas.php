<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Películas</title>
    
    <link rel="stylesheet" type="text/css" href="Ejercicio7.css" />
</head>

<body>
    <h1>Base de datos: Cine</h1>

    <nav>
        <a href="BuscarPeliculas.php">PELÍCULAS</a>
        <a href="BuscarActores.php">ACTORES</a>
        <a href="BuscarDirectores.php">DIRECTORES</a>
    </nav>
    
    <h2>Buscar películas:</h2>
    <form action='#' method='post'>
        <label for='titulo'>Introduce un título:</label>
        <input type='text' id='titulo' name='titulo'/>
        <label for='estreno'>Introduce un año de estreno:</label>
        <input type='number' id='estreno' name='estreno'/>

        <input type='submit' name='porAño' value='Buscar por año'/>
        <input type='submit' name='porTitulo' value='Buscar por título'/>
        <input type='submit' name='todas' value='Mostrar todas'/>
    </form>

    <?php
	require('BaseDatosCine.php');
	$bd = new BaseDatosCine();

	if (count($_POST) > 0) {
		if (isset($_POST['porAño'])) {
			$bd->buscarPeliculaPorAño();
        }
        if (isset($_POST['porTitulo'])) {
            $bd->buscarPeliculaPorTitulo();
        }
        if (isset($_POST['todas'])) {
            $bd->todasPeliculas();
        }
    }
	?>
</body>
</html>