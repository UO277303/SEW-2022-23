<?php
class BaseDatosCine
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
        $this->base = "cine";
    }

    public function crearBase()
    {
        $db = new mysqli($this->servername, $this->username, $this->password);

        $consulta = "CREATE DATABASE IF NOT EXISTS cine COLLATE utf8_spanish_ci";
        $db->query($consulta);

        $db->close();
    }

    public function buscarPeliculaPorAño()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("SELECT * FROM Pelicula WHERE añoEstreno = ?");

        $consulta->bind_param('i', $_POST["estreno"]);
        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>Películas estrenadas en ". $_POST["estreno"] ."</h3><ul>";
            while ($row = $result->fetch_assoc()) {
                // Consulta para el género
                $subconsulta = $db->query("SELECT nombre FROM Genero WHERE id_gen = " . $row["id_gen"]);
                $resultCons = $subconsulta->fetch_assoc();
                $genero = $resultCons["nombre"];
                // Consulta para el director
                $subconsulta = $db->query("SELECT nombre, apellido FROM Director WHERE id_dir = " . $row["id_dir"]);
                $resultCons = $subconsulta->fetch_assoc();
                $director = $resultCons["nombre"] . " " . $resultCons["apellido"];
                // Consulta para los actores
                $subconsulta = $db->query("SELECT a.nombre, a.apellido FROM Personaje p, Actor a WHERE p.id_peli = " . $row["id_peli"] .
                    " AND p.id_act = a.id_act");

                echo "<li>" . $row["titulo"] . "
                <ul>
                <li>Duración: " . $row["duracion"] . " minutos</li>
                <li>Puntuación: " . $row["puntuacion"] . "/10</li>
                <li>Género: " . $genero . "</li>
                <li>Director: " . $director . "</li>
                <li>Actores:<ul>";
                while ($actor = $subconsulta->fetch_assoc()) {
                    echo "<li>". $actor["nombre"] . " " . $actor["apellido"] ."</li>";
                }
                echo "</ul></li></ul></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No hay películas estrenadas en ese año.</p>";
        }

        $consulta->close();
        $db->close();
    }

    public function buscarPeliculaPorTitulo()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("SELECT * FROM Pelicula WHERE titulo LIKE ?");

        $consulta->bind_param('s', $_POST["titulo"]);
        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>Información sobre la película</h3><ul>";
            while ($row = $result->fetch_assoc()) {
                // Consulta para el género
                $subconsulta = $db->query("SELECT nombre FROM Genero WHERE id_gen = " . $row["id_gen"]);
                $resultCons = $subconsulta->fetch_assoc();
                $genero = $resultCons["nombre"];
                // Consulta para el director
                $subconsulta = $db->query("SELECT nombre, apellido FROM Director WHERE id_dir = " . $row["id_dir"]);
                $resultCons = $subconsulta->fetch_assoc();
                $director = $resultCons["nombre"] . " " . $resultCons["apellido"];
                // Consulta para los actores
                $subconsulta = $db->query("SELECT a.nombre, a.apellido FROM Personaje p, Actor a WHERE p.id_peli = " . $row["id_peli"] .
                    " AND p.id_act = a.id_act");

                echo "<li>" . $row["titulo"] . "
                <ul>
                <li>Duración: " . $row["duracion"] . " minutos</li>
                <li>Puntuación: " . $row["puntuacion"] . "/10</li>
                <li>Género: " . $genero . "</li>
                <li>Director: " . $director . "</li>
                <li>Actores:<ul>";
                while ($actor = $subconsulta->fetch_assoc()) {
                    echo "<li>". $actor["nombre"] . " " . $actor["apellido"] ."</li>";
                }
                echo "</ul></li></ul></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No hay películas estrenadas en ese año.</p>";
        }

        $consulta->close();
        $db->close();
    }

    public function todasPeliculas()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        $consulta = $db->prepare("SELECT * FROM Pelicula");
        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>Ningún filtro utilizado, se mostrarán todas las películas:</h3><ul>";
            while ($row = $result->fetch_assoc()) {
                // Consulta para el género
                $subconsulta = $db->query("SELECT nombre FROM Genero WHERE id_gen = " . $row["id_gen"]);
                $resultCons = $subconsulta->fetch_assoc();
                $genero = $resultCons["nombre"];
                // Consulta para el director
                $subconsulta = $db->query("SELECT nombre, apellido FROM Director WHERE id_dir = " . $row["id_dir"]);
                $resultCons = $subconsulta->fetch_assoc();
                $director = $resultCons["nombre"] . " " . $resultCons["apellido"];
                // Consulta para los actores
                $subconsulta = $db->query("SELECT a.nombre, a.apellido FROM Personaje p, Actor a WHERE p.id_peli = " . $row["id_peli"] .
                    " AND p.id_act = a.id_act");

                echo "<li>" . $row["titulo"] . "
                <ul>
                <li>Duración: " . $row["duracion"] . " minutos</li>
                <li>Puntuación: " . $row["puntuacion"] . "/10</li>
                <li>Género: " . $genero . "</li>
                <li>Director: " . $director . "</li>
                <li>Actores:<ul>";
                while ($actor = $subconsulta->fetch_assoc()) {
                    echo "<li>". $actor["nombre"] . " " . $actor["apellido"] ."</li>";
                }
                echo "</ul></li></ul></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No hay películas para mostrar.</p>";
        }

        $consulta->close();
        $db->close();
    }

    public function buscarActor()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        if (empty($_POST["nombre"]) && empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Actor");
            $stringDatos = "Ningún filtro utilizado, se mostrarán todos los actores:";
        } 
        else if (empty($_POST["nombre"]) && !empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Actor WHERE apellido LIKE ?");
            $consulta->bind_param('s', $_POST["apellido"]);
            $stringDatos = "Actores cuyo apellido es ". $_POST["apellido"] .":";
        } 
        else if (!empty($_POST["nombre"]) && empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Actor WHERE nombre LIKE ?");
            $consulta->bind_param('s', $_POST["nombre"]);
            $stringDatos = "Actores llamados ". $_POST["nombre"] .":";
        } 
        else 
        {
            $consulta = $db->prepare("SELECT * FROM Actor WHERE nombre LIKE ? AND apellido LIKE ?");
            $consulta->bind_param('ss', $_POST["nombre"], $_POST["apellido"]);
            $stringDatos = "Actores llamados ". $_POST["nombre"] . " " . $_POST["apellido"] .":";
        }

        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>$stringDatos</h3><ul>";
            $añoActual = date("Y");
            while ($row = $result->fetch_assoc()) {
                // Consulta para los personajes
                $subconsulta = $db->query("SELECT p.nombre AS nombre, p.protagonista AS prota, e.titulo AS pelicula
                    FROM Personaje p, Pelicula e WHERE p.id_act = " . $row["id_act"] .
                    " AND p.id_peli = e.id_peli");

                echo "<li>" . $row["nombre"] . " " . $row["apellido"] . "<ul>
                <li>Año de nacimiento: " . $row["añoNacimiento"] . " (" . ($añoActual-$row["añoNacimiento"]) . " años)</li>
                <li>Comenzó a actuar en: " . $row["añoInicio"] . "</li>
                <li>Sexo: " . $row["sexo"] . "</li>
                <li>Nacionalidad: " . $row["nacionalidad"] . "</li>
                <li>Roles:<ul>";
                while ($rol = $subconsulta->fetch_assoc()) {
                    echo "<li>'". $rol["nombre"] . "' en " . $rol["pelicula"];
                    if ($rol["prota"] === "Si") {
                        echo " (protagonista)</li>";
                    } else {
                        echo "</li>";
                    }
                }
                echo "</ul></li></ul></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No hay actores con el nombre o apellido indicado.</p>";
        }

        $consulta->close();
        $db->close();
    }

    public function buscarDirector()
    {
        $db = new mysqli($this->servername, $this->username, $this->password, $this->base);

        if (empty($_POST["nombre"]) && empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Director");
            $stringDatos = "Ningún filtro utilizado, se mostrarán todos los directores:";
        } 
        else if (empty($_POST["nombre"]) && !empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Director WHERE apellido LIKE ?");
            $consulta->bind_param('s', $_POST["apellido"]);
            $stringDatos = "Directores cuyo apellido es ". $_POST["apellido"] .":";
        } 
        else if (!empty($_POST["nombre"]) && empty($_POST["apellido"])) 
        {
            $consulta = $db->prepare("SELECT * FROM Director WHERE nombre LIKE ?");
            $consulta->bind_param('s', $_POST["nombre"]);
            $stringDatos = "Directores llamados ". $_POST["nombre"] .":";
        } 
        else 
        {
            $consulta = $db->prepare("SELECT * FROM Director WHERE nombre LIKE ? AND apellido LIKE ?");
            $consulta->bind_param('ss', $_POST["nombre"], $_POST["apellido"]);
            $stringDatos = "Directores llamados ". $_POST["nombre"] . " " . $_POST["apellido"] .":";
        }

        $consulta->execute();
        $result = $consulta->get_result();

        if ($result->num_rows > 0) {
            echo "<h3>$stringDatos</h3><ul>";
            $añoActual = date("Y");
            while ($row = $result->fetch_assoc()) {
                // Consulta para las películas
                $subconsulta = $db->query("SELECT titulo, añoEstreno FROM Pelicula WHERE id_dir = " . $row["id_dir"]);

                echo "<li>" . $row["nombre"] . " " . $row["apellido"] . "<ul>
                <li>Año de nacimiento: " . $row["añoNacimiento"] . " (" . ($añoActual-$row["añoNacimiento"]) . " años)</li>
                <li>Sexo: " . $row["sexo"] . "</li>";
                $ocupaciones = "";
                if ($row["productor"] === "Si") {
                    if ($row["guionista"] === "Si") {
                        $ocupaciones = "<li>Otras ocupaciones: Productor, guionista</li>";
                    } else {
                        $ocupaciones = "<li>Otras ocupaciones: Productor</li>";
                    }
                } else {
                    if ($row["guionista"] === "Si") {
                        $ocupaciones = "<li>Otras ocupaciones: Guionista</li>";
                    }
                }
                echo"$ocupaciones<li>Películas dirigidas:<ul>";
                while ($peli = $subconsulta->fetch_assoc()) {
                    echo "<li>'". $peli["titulo"] . "', " . $peli["añoEstreno"];
                }
                echo "</ul></li></ul></li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No hay actores con el nombre o apellido indicado.</p>";
        }

        $consulta->close();
        $db->close();
    }
}
?>