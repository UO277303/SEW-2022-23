<?php
class BaseDatos
{
    private $servername;
    private $username;
    private $password;
    private $base;

    public function __construct()
    {
        $this->servername = "localhost";
        $this->username = "DBUSER2022";
        $this->password = "DBPSWD2022";
        $this->base = "baseDatos";
    }

    public function crearBase()
    {
        $db = new mysqli($this->servername, $this->username, $this->password);

        $consulta = "CREATE DATABASE IF NOT EXISTS baseDatos COLLATE utf8_spanish_ci";

        if ($db->query($consulta) === TRUE) {
            echo "<p>La base de datos se creó correctamente</p>";
        } else {
            echo "<p>ERROR: No se ha podido crear la base de datos</p>";
        }

        $db->close();
    }

    public function crearTabla()
    {
        $db = new mysqli($this->servername, $this->username, $this->password);

        $db->select_db($this->base);

        $consulta = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
            dni VARCHAR(9) NOT NULL,
            nombre VARCHAR(24), 
            apellidos VARCHAR(30), 
            email VARCHAR(20), 
            telefono VARCHAR(9), 
            edad INT, 
            sexo VARCHAR(10), 
            nivelInformatico INT, 
            tiempo INT, 
            tareaCorrecta VARCHAR(2), 
            comentarios VARCHAR(255), 
            propuestasMejora VARCHAR(255), 
            valoracion INT,
            PRIMARY KEY (dni), 
            CHECK (valoracion BETWEEN 0 AND 10), 
            CHECK (nivelInformatico BETWEEN 0 AND 10))";

        if ($db->query($consulta) === TRUE) {
            echo "<p>Tabla creada correctamente</p>";
        } else {
            echo "<p>ERROR: No se ha podido crear la tabla</p>";
        }

        $db->close();
    }

    public function insertar()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("INSERT INTO PruebasUsabilidad (dni, nombre, apellidos, email, telefono, edad, sexo, nivelInformatico,
            tiempo, tareaCorrecta, comentarios, propuestasMejora, valoracion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $dni = $_POST["dni"];
        $nombre = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $email = $_POST["mail"];
        $telefono = $_POST["telefono"];
        $edad = $_POST["edad"];
        $sexo = $_POST["sexo"];
        $nivelInf = $_POST["nvinf"];
        $tiempo = $_POST["tiempo"];
        $tareaCorr = $_POST["tareaCorr"];
        $comentarios = $_POST["comentarios"];
        $mejora = $_POST["propuestasMejora"];
        $valoracion = $_POST["valoracion"];

        if (!empty($dni) && !empty($nombre) && !empty($apellidos) && !empty($email) && !empty($telefono) && !empty($edad)
            && !empty($sexo) && !empty($nivelInf) && !empty($tiempo) && !empty($tareaCorr) && !empty($comentarios)
            && !empty($mejora) && !empty($valoracion) && !empty($dni)) {

            $consulta->bind_param("sssssisiisssi", $dni, $nombre, $apellidos, $email, $telefono, $edad, $sexo, $nivelInf,
                $tiempo, $tareaCorr, $comentarios, $mejora, $valoracion);
            $consulta->execute();
            echo "<p>Datos insertados correctamente</p>";
            $consulta->close();
        } else {
            echo "<p>No se han podido insertar los datos en la base de datos</p>";
        }

        $db->close();
    }

    public function buscar()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("SELECT * FROM PruebasUsabilidad WHERE dni = ?");

        $consulta->bind_param('s', $_POST["dni"]);
        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h2>Datos del usuario con dni " . $_POST["dni"] . "</h2><ul>";
            while ($row = $result->fetch_assoc()) {
                echo "<li> Nombre y apellidos: " . $row["nombre"] . " " . $row["apellidos"] . "</li>
                    <li> Correo electrónico: " . $row["email"] . "</li>
                    <li> Teléfono de contacto: " . $row["telefono"] . "</li>
                    <li> Edad: " . $row["edad"] . "</li>
                    <li> Sexo: " . $row["sexo"] . "</li>
                    <li> Nivel informático: " . $row["nivelInformatico"] . "</li>
                    <li> Tiempo empleado en la prueba: " . $row["tiempo"] . "</li>
                    <li> ¿La prueba se realizó de forma correcta?: " . $row["tareaCorrecta"] . "</li>
                    <li> Comentarios: " . $row["comentarios"] . "</li>
                    <li> Propuestas de mejora: " . $row["propuestasMejora"] . "</li>
                    <li> Valoración: " . $row["valoracion"] . "</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>Búsqueda sin resultados</p>";
        }

        $consulta->close();
        $db->close();
    }

    public function modificar()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("UPDATE PruebasUsabilidad SET nombre = ?, apellidos = ?, email = ?, telefono = ?, edad = ?,
            sexo = ?, nivelInformatico = ?, tiempo = ?, tareaCorrecta = ?, comentarios = ?, propuestasMejora = ?, valoracion = ?
            WHERE dni = ?");

        $nombre = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $email = $_POST["mail"];
        $telefono = $_POST["telefono"];
        $edad = $_POST["edad"];
        $sexo = $_POST["sexo"];
        $nivelInf = $_POST["nvinf"];
        $tiempo = $_POST["tiempo"];
        $tareaCorr = $_POST["tareaCorr"];
        $comentarios = $_POST["comentarios"];
        $mejora = $_POST["propuestasMejora"];
        $valoracion = $_POST["valoracion"];

        if (!empty($nombre) && !empty($apellidos) && !empty($email) && !empty($telefono) && !empty($edad)
            && !empty($sexo) && !empty($nivelInf) && !empty($tiempo) && !empty($tareaCorr) && !empty($comentarios)
            && !empty($mejora) && !empty($valoracion)) {

            $consulta->bind_param("ssssisiisssis", $nombre, $apellidos, $email, $telefono, $edad, $sexo, $nivelInf,
                $tiempo, $tareaCorr, $comentarios, $mejora, $valoracion, $_POST["dni"]);
            $consulta->execute();
            echo "<p>Datos modificados correctamente</p>";
            $consulta->close();
        } else {
            echo "<p>No se han podido modificar los datos</p>";
        }

        $db->close();
    }

    public function eliminar()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("DELETE FROM PruebasUsabilidad WHERE dni = ?");

        $consulta->bind_param('s', $_POST["dni"]);
        $consulta->execute();
        $consulta->close();

        $datos = $db->query("SELECT * FROM PruebasUsabilidad");

        if ($datos->num_rows > 0) {
            echo "<p>Los datos de la tabla PruebasUsabilidad son:</p>";
            while ($row = $datos->fetch_assoc()) {
                echo "<p>".$row['dni']." - ".$row['nombre']." ".$row['apellidos']." - ".
                    $row['email']." - ".$row['telefono']."</p>";
            }
        } else {
            echo "<p>No hay datos en la tabla</p>";
        }

        $db->close();
    }

    public function generarInforme()
    {
        $total = $this->contar('');

        $mediaEdad = $this->media('edad');
        $hombres = $this->contar('WHERE sexo="Masculino"') / $total * 100;
        $mujeres = $this->contar('WHERE sexo="Femenino"') / $total * 100;
        $mediaNvlInf = $this->media('nivelInformatico');
        $mediaTiempo = $this->media('tiempo');
        $tareasCorrectas = $this->contar('WHERE tareaCorrecta="Si"') / $total * 100;
        $mediaValoracion = $this->media('valoracion');

        echo "<p>Edad media: ". $mediaEdad ."</p>
        <p>Porcentaje de hombres: ". $hombres ."</p>
        <p>Porcentaje de mujeres: ". $mujeres ."</p>
        <p>Media del nivel informático: ". $mediaNvlInf ."</p>
        <p>Media de tiempo: ". $mediaTiempo ."</p>
        <p>Porcentaje de usuarios que solucionaron tareas correctamente: ". $tareasCorrectas ."</p>
        <p>Media de las valoraciones: ". $mediaValoracion ."</p>
        ";
    }

    private function contar($where)
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->query("SELECT COUNT(*) AS cont FROM PruebasUsabilidad " . $where);

        $total = null;
        if ($consulta->num_rows > 0) {
            while ($row = $consulta->fetch_assoc()) {
                $total = $row["cont"];
            }
        }

        $db->close();
        return $total;
    }

    private function media($dato)
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->query("SELECT AVG(". $dato .") AS media FROM PruebasUsabilidad");

        $total = null;
        if ($consulta->num_rows > 0) {
            while ($row = $consulta->fetch_assoc()) {
                $total = $row["media"];
            }
        }

        $db->close();
        return $total;
    }

    public function cargarCSV()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $archivoCSV = fopen($_FILES['archivo']['tmp_name'], 'rb');

        while ($csv = fgetcsv($archivoCSV)) {
            $consulta = $db->prepare("INSERT INTO PruebasUsabilidad VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $consulta->bind_param("sssssisiisssi", $csv[0], $csv[1], $csv[2], $csv[3], $csv[4], $csv[5], $csv[6], $csv[7], 
                $csv[8], $csv[9], $csv[10], $csv[11], $csv[12]);

            $consulta->execute();
        }

        $consulta->close();
        $db->close();
        echo "<p>Los datos del fichero se han cargado correctamente</p>";
    }

    public function exportarCSV()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->query("SELECT * FROM PruebasUsabilidad");

        $datosCSV = '';

        if ($consulta->num_rows > 0) {
            while ($row = $consulta->fetch_assoc()) {
                $datosCSV .= $row["dni"] . "," . $row["nombre"] . "," . $row["apellidos"] . "," . $row["email"] . "," . 
                    $row["telefono"] . "," . $row["edad"] . "," . $row["sexo"] . "," . $row["nivelInformatico"] . "," . 
                    $row["tiempo"] . "," . $row["tareaCorrecta"] . "," . $row["comentarios"] . "," . $row["propuestasMejora"]
                     . "," . $row["valoracion"] . "\n";
            }
        }
        $consulta->close();

        file_put_contents("datosExportados_BD-baseDatos.csv", $datosCSV);
        echo "<p>Los datos de la base se han exportado correctamente</p>";
    }
}
?>