<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Calculadora RPN</title>
    
    <link rel="stylesheet" type="text/css" href="CalculadoraRPN.css" />
</head>

<body>

    <h1>Calculadora RPN</h1>

    <?php
    class Pila 
    {
        protected $pila;

        public function __construct()
        {
            $this->pila = array();
        }

        public function push($e)
        {
            array_unshift($this->pila, $e);
        }

        public function pop() 
        {
            return array_shift($this->pila);
        }

        public function size() 
        {
            return count($this->pila);
        }

        public function print()
        {
            $result = '';
            for ($i = ($this->size() - 1); $i >= 0; $i--) {
                $result = ($i+1) . ".\t\t\t\t" . $this->pila[$i] . "\n" . $result;
            }
            return $result;
        }

        public function vaciar()
        {
            $this->pila = array();
        }

    }

    class CalculadoraRPN
    {
        private $pantalla;
        public $contenidoPila;
        private $pila;
        private $puntoUsado;

        public function __construct()
        {
            $this->pantalla = '';
            $this->pila = new Pila();
            $this->contenidoPila = '';
            $this->puntoUsado = False;
        }

        public function digitos($dig)
        {
            $this->pantalla .= $dig;
        }

        public function punto()
        {
            if (!$this->puntoUsado && strlen($this->pantalla) > 0) {
                $this->puntoUsado = True;
                $this->pantalla .= '.';
            }
        }

        public function enter()
        {
            if (strlen($this->pantalla) > 0) {
                $num = $this->pantalla;
                $this->pantalla = '';

                $this->pila->push($num);

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function operadores($op)
        {
            if ($this->pila->size() >= 2) {
                $y = $this->pila->pop();
                $x = $this->pila->pop();

                $calculo = $x . $op . $y;
                $this->pila->push(eval("return $calculo;"));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function borrar()
        {
            $this->pila->vaciar();
            $this->pantalla = '';
            $this->puntoUsado = False;
            $this->imprimirPila();
        }

        public function sin()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(sin(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function cos()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(cos(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function tan()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(tan(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function asin()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(asin(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function acos()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(acos(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function atan()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(atan(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function potencia()
        {
            if ($this->pila->size() >= 2) {
                $y = $this->pila->pop();
                $x = $this->pila->pop();

                $this->pila->push(pow($x, $y));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function raiz()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(sqrt(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function potDiez()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(pow(10, $x));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function logaritmo()
        {
            if ($this->pila->size() >= 1) {
                $x = $this->pila->pop();

                $this->pila->push(log(floatval($x)));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        public function modulo() 
        {
            if ($this->pila->size() >= 2) {
                $y = $this->pila->pop();
                $x = $this->pila->pop();

                $this->pila->push(eval("return $x%$y;"));

                $this->puntoUsado = False;

                $this->imprimirPila();
            }
        }

        // Otros métodos

        private function imprimirPila()
        {
            $this->contenidoPila = $this->pila->print();
        }

    };

    if (!isset($_SESSION['calcRPN'])) {
        $_SESSION['calcRPN'] = new CalculadoraRPN();
    }
    $calcRPN = $_SESSION['calcRPN'];

    if (count($_POST) > 0) {
        if (isset($_POST['asin'])) {
            $calcRPN->asin();
        } elseif (isset($_POST['acos'])) {
            $calcRPN->acos();
        } elseif (isset($_POST['atan'])) {
            $calcRPN->atan();
        } elseif (isset($_POST['c'])) {
            $calcRPN->borrar();
        } elseif (isset($_POST['potencia'])) {
            $calcRPN->potencia();
        } elseif (isset($_POST['sqrt'])) {
            $calcRPN->raiz();
        } elseif (isset($_POST['potDiez'])) {
            $calcRPN->potDiez();
        } elseif (isset($_POST['log'])) {
            $calcRPN->logaritmo();
        } elseif (isset($_POST['mod'])) {
            $calcRPN->modulo();
        } elseif (isset($_POST['mult'])) {
            $calcRPN->operadores('*');
        } elseif (isset($_POST['/'])) {
            $calcRPN->operadores('/');
        } elseif (isset($_POST['+'])) {
            $calcRPN->operadores('+');
        } elseif (isset($_POST['-'])) {
            $calcRPN->operadores('-');
        } elseif (isset($_POST['1'])) {
            $calcRPN->digitos('1');
        } elseif (isset($_POST['2'])) {
            $calcRPN->digitos('2');
        } elseif (isset($_POST['3'])) {
            $calcRPN->digitos('3');
        } elseif (isset($_POST['4'])) {
            $calcRPN->digitos('4');
        } elseif (isset($_POST['5'])) {
            $calcRPN->digitos('5');
        } elseif (isset($_POST['6'])) {
            $calcRPN->digitos('6');
        } elseif (isset($_POST['7'])) {
            $calcRPN->digitos('7');
        } elseif (isset($_POST['8'])) {
            $calcRPN->digitos('8');
        } elseif (isset($_POST['9'])) {
            $calcRPN->digitos('9');
        } elseif (isset($_POST['0'])) {
            $calcRPN->digitos('0');
        } elseif (isset($_POST[','])) {
            $calcRPN->punto();
        } elseif (isset($_POST['enter'])) {
            $calcRPN->enter();
        } elseif (isset($_POST['sin'])) {
            $calcRPN->sin();
        } elseif (isset($_POST['cos'])) {
            $calcRPN->cos();
        } elseif (isset($_POST['tan'])) {
            $calcRPN->tan();
        }
    }

    echo "<form action='CalculadoraRPN.php' method='post' name='Calculadora'>
        <label for='pantalla'>Calculadora RPN</label>
        <textarea id='pantalla' disabled >$calcRPN->contenidoPila</textarea>
        <button type='submit' name='asin'>asin</button>
        <button type='submit' name='acos'>acos</button>
        <button type='submit' name='atan'>atan</button>
        <button type='submit' name='c'>C</button>
        <button type='submit' name='sin'>sin</button>
        <button type='submit' name='cos'>cos</button>
        <button type='submit' name='tan'>tan</button>
        <button type='submit' name='potencia'>^</button>
        <button type='submit' name='sqrt'>V</button>
        <button type='submit' name='potDiez'>10^</button>
        <button type='submit' name='log'>log</button>
        <button type='submit' name='mod'>mod</button>
        <button type='submit' name='7'>7</button>
        <button type='submit' name='8'>8</button>
        <button type='submit' name='9'>9</button>
        <button type='submit' name='mult'>*</button>
        <button type='submit' name='4'>4</button>
        <button type='submit' name='5'>5</button>
        <button type='submit' name='6'>6</button>
        <button type='submit' name='/'>/</button>
        <button type='submit' name='1'>1</button>
        <button type='submit' name='2'>2</button>
        <button type='submit' name='3'>3</button>
        <button type='submit' name='-'>-</button>
        <button type='submit' name=','>.</button>
        <button type='submit' name='0'>0</button>
        <button type='submit' name='enter'>Enter</button>
        <button type='submit' name='+'>+</button>
    </form>";
    ?>

</body>
</html>