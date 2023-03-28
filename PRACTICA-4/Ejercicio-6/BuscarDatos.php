<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Buscar datos en la BD</title>
    
    <link rel="stylesheet" type="text/css" href="Ejercicio6.css" />
</head>

<body>
    <h1>Creación y gestión de una base de datos</h1>

    <nav>
        <a href="CrearBD.php">Crear BD</a>
        <a href="CrearTabla.php">Crear tabla</a>
        <a href="InsertarDatos.php">Insertar datos</a>
        <a href="BuscarDatos.php">Buscar datos</a>
        <a href="ModificarDatos.php">Modificar datos</a>
        <a href="EliminarDatos.php">Eliminar datos</a>
        <a href="GenerarInforme.php">Generar informe</a>
        <a href="ImportarCSV.php">Importar CSV</a>
        <a href="ExportarCSV.php">Exportar CSV</a>
    </nav>

    <h2>Buscar en la base de datos</h2>
    <form action='#' method='post'>
        <label for='dni'>Introduce un DNI:</label>
        <input type='text' id='dni' name='dni'/>
		<input type='submit' name='buscar' value='Buscar por DNI'/>
	</form>

	<?php
	require('BaseDatos.php');

	$bd = new BaseDatos();

	if (count($_POST) > 0) {
		if (isset($_POST['buscar'])) {
			$bd->buscar();
        }
    }
	?>
</body>
</html>