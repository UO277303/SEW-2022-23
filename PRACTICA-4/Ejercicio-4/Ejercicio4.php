<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Ejercicio 4 PHP</title>
    
    <link rel="stylesheet" type="text/css" href="Ejercicio4.css" />
</head>

<body>
    <h1>Consultar el precio del cobre</h1>

    <?php
    $endpoint = 'latest';
    $apikey = '372186tq4v05t83bc1e3c9ozg0qx70h74r2hp22bet678ft513ls5k5e9mp4';
    $base = '&base=XCU';

    $url = 'https://commodities-api.com/api/' . $endpoint . '?access_key=' . $apikey . $base;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $json = curl_exec($ch);
    curl_close($ch);

    $datos = json_decode($json, true);

    $eur = $datos['data']['rates']['EUR'];
    $usd = $datos['data']['rates']['USD'];
    $gbp = $datos['data']['rates']['GBP'];
    $jpy = $datos['data']['rates']['JPY'];
    $inr = $datos['data']['rates']['INR'];
    $ars = $datos['data']['rates']['ARS'];

    echo "<main><h2>Precios en distintas monedas:</h2><ul>
    <li>Euros: $eur €</li>
    <li>Dólares: $usd $</li>
    <li>Libras esterlinas: $gbp £</li>
    <li>Yenes: $jpy ¥</li>
    <li>Rupias indias: $inr ₹</li>
    <li>Pesos argentinos: $ars $</li>
    </ul>
    </main>
    ";
    ?>
</body>
</html>