<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Importar datos a la BD</title>
    
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

    <h2>Importar datos con un fichero .csv</h2>
    <form action='#' method='post' enctype='multipart/form-data'>
        <label for='archivo'>Selecciona el archivo CSV</label>
        <input type='file' id='archivo' name='archivo'/>
		<input type='submit' name='cargar' value='Cargar CSV'/>
	</form>

	<?php
	require('BaseDatos.php');

	$bd = new BaseDatos();

	if (count($_POST) > 0) {
		if (isset($_POST['cargar'])) {
			$bd->cargarCSV();
        }
    }
	?>
</body>
</html>