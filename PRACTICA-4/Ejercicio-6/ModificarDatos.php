<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Modificar datos de la BD</title>
    
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

    <h2>Modificar datos de la base de datos</h2>
    <form action='#' method='post'>
        <label for='dni'>Introduce un DNI:</label>
        <input type='text' id='dni' name='dni'/>

        <label for='nombre'>Nombre: </label>
        <input type='text' id='nombre' name='nombre' required/>
        <label for='apellidos'>Apellidos: </label>
        <input type='text' id='apellidos' name='apellidos' required/>
        <label for='mail'>Email: </label>
        <input type='email' id='mail' name='mail' required/>
        <label for='telefono'>Teléfono: </label>
        <input type='tel' id='telefono' name='telefono' required/>
        <label for='edad'>Edad: </label>
        <input type='number' id='edad' name='edad' required/>
        <fieldset>
            <legend>Sexo</legend>
            <label for='m'>Masculino</label>
            <input type='radio' id='m' name='sexo' value='Masculino'/>
            <label for='f'>Femenino</label>
            <input type='radio' id='f' name='sexo' value='Femenino'/>
        </fieldset>
        <label for='nvinf'>Nivel informático: </label>
        <input type='number' id='nvinf' name='nvinf' required/>
        <label for='tiempo'>Tiempo en realizar la tarea: </label>
        <input type='number' id='tiempo' name='tiempo' required/>
        <fieldset>
            <legend>¿Tarea realizada correctamente?</legend>
            <label for='s'>Sí</label>
            <input type='radio' id='s' name='tareaCorr' value='Si'/>
            <label for='n'>No</label>
            <input type='radio' id='n' name='tareaCorr' value='No'/>
        </fieldset>
        <label for='comentarios'>Comentarios:</label>
        <textarea id='comentarios' name='comentarios'></textarea>
        <label for='propuestasMejora'>Propuestas de mejora:</label>
        <textarea id='propuestasMejora' name='propuestasMejora'></textarea>
        <label for='valoracion'>Valoración: </label>
        <input type='number' id='valoracion' name='valoracion' required/>

        <input type='submit' name='modificar' value='Modificar datos'/>
	</form>

	<?php
	require('BaseDatos.php');

	$bd = new BaseDatos();

	if (count($_POST) > 0) {
		if (isset($_POST['modificar'])) {
			$bd->modificar();
        }
    }
	?>
</body>
</html>