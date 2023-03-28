<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Calculadora básica MILAN</title>
    
    <link rel="stylesheet" type="text/css" href="CalculadoraMilan.css" />
</head>

<body>

    <h1>Calculadora básica</h1>

    <?php
    class CalculadoraMilan
    {
        private $operador;
        private $num1;
        private $num2;
        protected $puntoUsado;
        private $comienzo;
        private $primerOp;
        private $operadorUsado;
        protected $solucionado;
        private $porcUsado;
        private $raizUsada;
        protected $memoria;
        public $pantalla;

        public function __construct() 
        {
            $this->pantalla = '';
            $this->operador = '';
            $this->num1 = '';
            $this->num2 = '';

            $this->puntoUsado = False;
            $this->comienzo = True;
            $this->primerOp = True;
            $this->operadorUsado = False;
            $this->solucionado = False;

            $this->porcUsado = 0;
            $this->raizUsada = 0;

            $this->memoria = '';
        }

        public function digitos($dig)
        {
            $this->comprobarComienzo();

            if ($this->solucionado) {
                $this->num1 = '';
                $this->num2 = '';
                $this->operador = '';
                $this->primerOp = True;
                $this->solucionado = False;
            }

            if ($this->primerOp) {
                if ($this->num1 === '0') {
                    $this->num1 = $dig;
                } else {
                    $this->num1 .= $dig;
                }
                eval("return $this->num1;");
            } else {
                if ($this->num2 === '0') {
                    $this->num2 = $dig;
                } else {
                    $this->num2 .= $dig;
                }
                if ($this->operador === '') {
                    $this->operador = '*';
                }
                eval("return $this->num2;");
            }

            $this->updatePantalla();
        }

        public function punto() 
        {
            if(!$this->puntoUsado && !$this->solucionado) {
                $this->puntoUsado = True;

                if ($this->primerOp) {
                    if ($this->num1 === '') {
                        $this->num1 = '0.';
                    } else {
                        $this->num1 .= '.';
                    }
                } else {
                    if ($this->num2 === '') {
                        $this->num2 = '0.';
                    } else {
                        $this->num2 .= '.';
                    }
                }

                $this->updatePantalla();
            }
        }

        public function operadores($op) 
        {
            $this->comprobarComienzo();
            $this->comprobarPrimerOp();
            $this->comprobarSolucionado();
            $this->comprobarNuevoCalculo();

            $this->operador = $op;
            $this->primerOp = False;
            $this->operadorUsado = True;
            $this->puntoUsado = False;
        }

        public function porcentaje() 
        {
            $this->comprobarComienzo();

            if ($this->primerOp) {
                $this->porcUsado = 1;
            } else {
                $this->porcUsado = 2;
            }
        }

        public function cambiarSigno() 
        {
            $this->comprobarComienzo();

            if (!$this->solucionado) {
                if ($this->primerOp) {
                    if ($this->num1 != '') {
                        if ($this->num1[0] === '-') {
                            $this->num1 = substr($this->num1, 1);
                        } else {
                            $this->num1 = '-' . $this->num1;
                        }
                    }
                } else {
                    if ($this->num2 != '') {
                        if ($this->num2[0] === '-') {
                            $this->num2 = substr($this->num2, 1);
                        } else {
                            $this->num2 = '-' . $this->num2;
                        }
                    }
                }
            }

            $this->updatePantalla();
        }

        public function raiz() 
        {
            $this->comprobarComienzo();

            if ($this->primerOp) {
                $this->num1 = sqrt(floatval($this->num1));
                $this->primerOp = False;
            } else {
                $this->num2 = sqrt(floatval($this->num2));
            }

            $this->updatePantalla();
        }

        public function mrc()
        {
            $this->comprobarMemoria();

            $this->pantalla = $this->memoria;

            if ($this->primerOp) {
                $this->num1 = $this->memoria;
                $this->primerOp = False;
            } else {
                $this->num2 = $this->memoria;
            }

            $this->updatePantalla();
        }

        public function mMenos()
        {
            $this->comprobarComienzo();
            $this->comprobarPrimerOp();
            $this->comprobarMemoria();

            if ($this->primerOp) {
                $this->memoria = $this->memoria - eval("return $this->num1;");
            } else {
                $this->memoria = $this->memoria - eval("return $this->num2;");
            }
        }

        public function mMas() 
        {
            $this->comprobarComienzo();
            $this->comprobarPrimerOp();
            $this->comprobarMemoria();

            if ($this->primerOp) {
                $this->memoria = $this->memoria + eval("return $this->num1;");
            } else {
                $this->memoria = $this->memoria + eval("return $this->num2;");
            }
        }

        public function borrar()
        {
            if (!$this->solucionado) {
                if ($this->primerOp) {
                    $this->num1 = '';
                } else {
                    if ($this->num2 === '' && $this->operadorUsado) {
                        $this->operadorUsado = False;
                        $this->operador = '';
                    } else {
                        $this->num2 = '';
                    }
                }
                $this->updatePantalla();
            }
        }

        public function borrarCalculo()
        {
            $this->operador = '';
            $this->num1 = '';
            $this->num2 = '';
            $this->memoria = '';

            $this->puntoUsado = False;
            $this->comienzo = True;
            $this->primerOp = True;
            $this->operador = False;

            $this->updatePantalla();
        }

        public function igual()
        {
            if ($this->num1 != '') {
                $calculo = '';

                if ($this->porcUsado === 0) {
                    if ($this->num2 === '') {
                        if ($this->operador === '*') {
                            $this->num2 = $this->num1;
                        } else if ($this->operador === '+' | $this->operador === '-') {
                            $this->num2 = '0';
                        } else if ($this->operador === '/') {
                            $this->num2 = $this->num1;
                            $this->num1 = '1';
                        }
                    }

                    if ($this->raizUsada != 0) {
                        if ($this->num2 === '') {
                            $calculo = sqrt(floatval($this->num1));
                        } else {
                            if ($this->raizUsada === 1) {
                                $calculo = sqrt(floatval($this->num1)) . $this->operador . $this->num2;
                            } else {
                                $calculo = sqrt(floatval($this->num2)) . $this->operador . $this->num1;
                            }
                        }

                        $this->num1 = eval("return $calculo;");
                        $this->solucionado = True;
                        $this->raizUsada = 0;
                        $this->pantalla = $this->num1;
                    } else {
                        $this->solucionado = True;
                        $calculo = $this->num1 . $this->operador . $this->num2;
                        $this->num1 = eval("return $calculo;");
                        $this->pantalla = $this->num1;
                    }
                } else {
                    $n1 = 0;
                    $n2 = 0;

                    if ($this->porcUsado === 2) {
                        $n1 = $this->num1;
                        $n2 = $this->num2;
                    } else {
                        $n1 = $this->num2;
                        $n2 = $this->num1;
                    }

                    if ($this->solucionado | $this->operador === '' && $this->num2 === '') {
                        $calculo = eval("return $this->num1 / 100;");
                    } else {
                        if ($this->operador === '+') {
                            $calculo = eval("return $n1 + (($n1 * $n2) / 100);");
                        } else if ($this->operador === '-') {
                            $calculo = eval("return $n1 - (($n1 * $n2) / 100);");
                        } else if ($this->operador === '*') {
                            $calculo = eval("return $n1 * $n2 / 100;");
                        } else if ($this->operador === '/') {
                            $calculo = eval("return $n1 / $n2 * 100;");
                        }
                    }

                    $this->num2 = '';
                    $this->operador = '';
                    $this->porcUsado = 0;
                    $this->solucionado = True;
                    $this->num1 = eval("return $calculo;");
                    $this->pantalla = $this->num1;
                }
            }
        }

        // Otros métodos

        private function comprobarComienzo() 
        {
            if ($this->comienzo) {
                $this->num1 = '';
                $this->num2 = '';
                $this->operador = '';
                $this->comienzo = False;
                $this->primerOp = True;
                $this->puntoUsado = False;
                $this->operadorUsado = False;
            }
        }

        private function comprobarPrimerOp() 
        {
            if ($this->solucionado) {
                $this->operador = '';
                $this->num2 = '';
                $this->solucionado = False;
            }
        }

        private function comprobarSolucionado() 
        {
            if ($this->num1 === '' && $this->primerOp) {
                $this->num1 = '0';
                $this->primerOp = False;
            }
        }

        private function comprobarNuevoCalculo() 
        {
            if (!$this->solucionado && $this->num1 != '' && $this->num2 != '' && $this->operador != '') {
                $calculo = $this->num1 . $this->operador . $this->num2;
                $this->num1 = eval("return $calculo;");
                $this->operador = '';
                $this->num2 = '';
                $this->primerOp = False;
                $this->puntoUsado = False;
                $this->operadorUsado = False;
            }
        }

        private function comprobarMemoria() 
        {
            if ($this->memoria === '') {
                $this->memoria = '0';
            }
        }

        public function updatePantalla() 
        {
            if ($this->primerOp) {
                $this->pantalla = $this->num1;
            } else {
                $this->pantalla = $this->num2;
            }
        }

    };

        if (!isset($_SESSION['milan'])) {
            $_SESSION['milan'] = new CalculadoraMilan();
        }
        $milan = $_SESSION['milan'];

        if (count($_POST) > 0) {
            if (isset($_POST['c'])) {
                $milan->borrarCalculo();
            } elseif (isset($_POST['ce'])) {
                $milan->borrar();
            } elseif (isset($_POST['signo'])) {
                $milan->cambiarSigno();
            } elseif (isset($_POST['sqrt'])) {
                $milan->raiz();
            } elseif (isset($_POST['%'])) {
                $milan->porcentaje();
            } elseif (isset($_POST['7'])) {
                $milan->digitos('7');
            } elseif (isset($_POST['8'])) {
                $milan->digitos('8');
            } elseif (isset($_POST['9'])) {
                $milan->digitos('9');
            } elseif (isset($_POST['x'])) {
                $milan->operadores('*');
            } elseif (isset($_POST['/'])) {
                $milan->operadores('/');
            } elseif (isset($_POST['4'])) {
                $milan->digitos('4');
            } elseif (isset($_POST['5'])) {
                $milan->digitos('5');
            } elseif (isset($_POST['6'])) {
                $milan->digitos('6');
            } elseif (isset($_POST['-'])) {
                $milan->operadores('-');
            } elseif (isset($_POST['mrc'])) {
                $milan->mrc();
            } elseif (isset($_POST['1'])) {
                $milan->digitos('1');
            } elseif (isset($_POST['2'])) {
                $milan->digitos(('2'));
            } elseif (isset($_POST['3'])) {
                $milan->digitos(('3'));
            } elseif (isset($_POST['+'])) {
                $milan->operadores('+');
            } elseif (isset($_POST['M-'])) {
                $milan->mMenos();
            } elseif (isset($_POST['0'])) {
                $milan->digitos('0');
            } elseif (isset($_POST[','])) {
                $milan->punto();
            } elseif (isset($_POST['='])) {
                $milan->igual();
            } elseif (isset($_POST['M+'])) {
                $milan->mMas(); 
            }
        }

        echo "<form action='CalculadoraMilan.php' method='post' name='Calculadora'>
            <label for='pantalla'>nata by MILAN</label>
            <input type='text' id='pantalla' value='$milan->pantalla' readonly />
            <button type='submit' name='c'>C</button>
            <button type='submit' name='ce'>CE</button>
            <button type='submit' name='signo'>+/-</button>
            <button type='submit' name='sqrt'>V</button>
            <button type='submit' name='%'>%</button>
            <button type='submit' name='7'>7</button>
            <button type='submit' name='8'>8</button>
            <button type='submit' name='9'>9</button>
            <button type='submit' name='x'>x</button>
            <button type='submit' name='/'>/</button>
            <button type='submit' name='4'>4</button>
            <button type='submit' name='5'>5</button>
            <button type='submit' name='6'>6</button>
            <button type='submit' name='-'>-</button>
            <button type='submit' name='mrc'>Mrc</button>
            <button type='submit' name='1'>1</button>
            <button type='submit' name='2'>2</button>
            <button type='submit' name='3'>3</button>
            <button type='submit' name='+'>+</button>
            <button type='submit' name='M-'>M-</button>
            <button type='submit' name='0'>0</button>
            <button type='submit' name=','>.</button>
            <button type='submit' name='='>=</button>
            <button type='submit' name='M+'>M+</button>
            </form>";
    ?>

</body>
</html>