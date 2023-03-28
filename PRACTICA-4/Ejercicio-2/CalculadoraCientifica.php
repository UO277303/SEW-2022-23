<?php
    session_start();
?>

<!DOCTYPE HTML>

<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Calculadora científica</title>
    
    <link rel="stylesheet" type="text/css" href="CalculadoraCientifica.css" />
</head>

<body>

    <h1>Calculadora científica</h1>

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

    class CalculadoraCientifica extends CalculadoraMilan {

        public $vSeno; //sin, asin, sinh, asinh
        public $vCoseno; //cos, acos, cosh, acosh
        public $vTangente; //tan, atan, tanh, atanh
        public $DRG; //DEG, RAD, GRAD
        private $shiftPres;
        private $hypPres;
        private $notCient;

        private $calculoMostrar;
        private $calculo;
        private $ultOperador;
        private $ultNumero;

        public function __construct() {
            parent::__construct();

            $this->solucionado = False;
            $this->pantalla = '';
            $this->memoria = '';
            $this->puntoUsado = False;

            $this->vSeno = 'sin';
            $this->vCoseno = 'cos';
            $this->vTangente = 'tan';
            $this->DRG = 'DEG';

            $this->shiftPres = False;
            $this->hypPres = False;
            $this->notCient = False;

            $this->calculoMostrar = '';
            $this->calculo = '';
            $this->ultOperador = '';
            $this->ultNumero = '';
        }

        public function deg()
        {
            if ($this->DRG === 'DEG') {
                $this->DRG = 'RAD';
            } elseif ($this->DRG === 'RAD') {
                $this->DRG = 'GRAD';
            } elseif ($this->DRG === 'GRAD') {
                $this->DRG = 'DEG';
            }
        }

        public function hyp()
        {
            if (!$this->shiftPres) {
                if ($this->hypPres) {
                    $this->hypPres = False;
                    $this->vSeno = 'sin';
                    $this->vCoseno = 'cos';
                    $this->vTangente = 'tan';
                } else {
                    $this->hypPres = True;
                    $this->vSeno = 'sinh';
                    $this->vCoseno = 'cosh';
                    $this->vTangente = 'tanh';
                }
            } else {
                if ($this->hypPres) {
                    $this->hypPres = False;
                    $this->vSeno = 'asin';
                    $this->vCoseno = 'acos';
                    $this->vTangente = 'atan';
                } else {
                    $this->hypPres = True;
                    $this->vSeno = 'asinh';
                    $this->vCoseno = 'acosh';
                    $this->vTangente = 'atanh';
                }
            }
        }

        public function fe()
        {
            if ($this->notCient) {
                $this->ultNumero = floatval($this->ultNumero);
                $this->notCient = False;
            } else {
                $this->ultNumero = number_format($this->ultNumero, 2, '.', '');
                $this->notCient = True;
            }
        }

        public function mC()
        {
            $this->memoria = '';
        }

        public function mR()
        {
            if (strlen($this->memoria) > 0) {
                $this->ultNumero = $this->memoria;
                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            } else {
                $this->pantalla = $this->calculoMostrar . '0';
            }
        }

        public function mS()
        {
            $this->memoria = $this->ultNumero;
        }

        public function cuadrado()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $this->ultNumero = pow($this->ultNumero, 2);

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function potencia()
        {
            $this->prepOperacion();

            $this->calculo .= '**';
            $this->calculoMostrar .= '**';
            $this->ultOperador = '**';

            $this->pantalla = $this->calculoMostrar;
        }

        public function seno()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $value = 0;
                $pi = pi();
                if ($this->DRG === 'DEG') {
                    $value = eval("return $this->ultNumero / 180 * $pi;");
                } elseif ($this->DRG === 'RAD') {
                    $value = $this->ultNumero;
                } elseif ($this->DRG === 'GRAD') {
                    $value = eval("return $this->ultNumero / 200 * $pi;");
                }

                if ($this->shiftPres) {
                    if ($this->hypPres) {
                        $this->ultNumero = asinh(floatval($value));
                    } else {
                        $this->ultNumero = asin(floatval($value));
                    }
                } else {
                    if ($this->hypPres) {
                        $this->ultNumero = sinh(floatval($value));
                    } else {
                        $this->ultNumero = sin(floatval($value));
                    }
                }

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function coseno()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $value = 0;
                $pi = pi();
                if ($this->DRG === 'DEG') {
                    $value = eval("return $this->ultNumero / 180 * $pi;");
                } elseif ($this->DRG === 'RAD') {
                    $value = $this->ultNumero;
                } elseif ($this->DRG === 'GRAD') {
                    $value = eval("return $this->ultNumero / 200 * $pi;");
                }

                if ($this->shiftPres) {
                    if ($this->hypPres) {
                        $this->ultNumero = acosh(floatval($value));
                    } else {
                        $this->ultNumero = acos(floatval($value));
                    }
                } else {
                    if ($this->hypPres) {
                        $this->ultNumero = cosh(floatval($value));
                    } else {
                        $this->ultNumero = cos(floatval($value));
                    }
                }

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function tangente()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $value = 0;
                $pi = pi();
                if ($this->DRG === 'DEG') {
                    $value = eval("return $this->ultNumero / 180 * $pi;");
                } elseif ($this->DRG === 'RAD') {
                    $value = $this->ultNumero;
                } elseif ($this->DRG === 'GRAD') {
                    $value = eval("return $this->ultNumero / 200 * $pi;");
                }

                if ($this->shiftPres) {
                    if ($this->hypPres) {
                        $this->ultNumero = atanh(floatval($value));
                    } else {
                        $this->ultNumero = atan(floatval($value));
                    }
                } else {
                    if ($this->hypPres) {
                        $this->ultNumero = tanh(floatval($value));
                    } else {
                        $this->ultNumero = tan(floatval($value));
                    }
                }

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function potDiez()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;
                
                $this->ultNumero = pow(10, $this->ultNumero);

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function logaritmo()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;
                
                $this->ultNumero = log($this->ultNumero);

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function exponencial()
        {
            $this->prepOperacion();
            
            $this->calculo .= '*10**';
            $this->calculoMostrar .= ',e+';
            $this->ultOperador = ',e+';

            $this->pantalla = $this->calculoMostrar;
        }

        public function modulo()
        {
            $this->prepOperacion();
            
            $this->calculo .= '%';
            $this->calculoMostrar .= '%';
            $this->ultOperador = '%';

            $this->pantalla = $this->calculoMostrar;
        }

        public function shift()
        {
            if (!$this->hypPres) {
                if ($this->shiftPres) {
                    $this->shiftPres = False;
                    $this->vSeno = 'sin';
                    $this->vCoseno = 'cos';
                    $this->vTangente = 'tan';
                } else {
                    $this->shiftPres = True;
                    $this->vSeno = 'asin';
                    $this->vCoseno = 'acos';
                    $this->vTangente = 'atan';
                }
            } else {
                if ($this->shiftPres) {
                    $this->shiftPres = False;
                    $this->vSeno = 'sinh';
                    $this->vCoseno = 'cosh';
                    $this->vTangente = 'tanh';
                } else {
                    $this->shiftPres = True;
                    $this->vSeno = 'asinh';
                    $this->vCoseno = 'acosh';
                    $this->vTangente = 'atanh';
                }
            }
        }

        public function borrarDig()
        {
            $dig = '';

            if (strlen($this->ultNumero) >= 1) {
                $dig = $this->ultNumero[strlen($this->ultNumero)-1];
                $this->ultNumero = substr($this->ultNumero, 0, -1);
            } else {
                if (!str_contains($this->ultNumero, '(') && !str_contains($this->ultNumero, ')')) {
                    $dig = $this->calculoMostrar[strlen($this->calculoMostrar)-1];
                    $this->calculoMostrar = substr($this->calculoMostrar, 0, -1);
                }
            }

            if ($dig === '.') {
                $this->puntoUsado = False;
            }
        }

        public function pi()
        {
            $this->ultNumero = pi();
            $this->pantalla = $this->calculoMostrar . $this->ultNumero;
        }

        public function factorial()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $this->ultNumero = $this->algFact();

                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function parentesis($lado) 
        {
            if ($lado === 'i') {
                $this->calculo .= '(';
                $this->calculoMostrar .= '(';
            } else {
                $this->ultNumero = ')';
            }

            $this->pantalla = $this->calculoMostrar . $this->ultNumero;
        }

        // Métodos redefinidos

        public function digitos($dig)
        {
            if ($this->solucionado) {
                $this->calculo = '';
                $this->calculoMostrar = '';
                $this->ultNumero = '';
                $this->solucionado = False;
                $this->puntoUsado = False;
            }
            $this->ultNumero .= $dig;
            $this->pantalla = $this->calculoMostrar . $this->ultNumero;
        }

        public function punto()
        {
            if (!$this->puntoUsado) {
                $this->puntoUsado = True;
                $this->ultNumero .= '.';
                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function operadores($op) 
        {
            $this->prepOperacion();

            $this->calculo .= $op;
            $this->calculoMostrar .= $op;
            $this->ultOperador = $op;

            $this->pantalla = $this->calculoMostrar;
        }

        public function cambiarSigno()
        {
            if ($this->ultNumero != '' && !$this->solucionado) {
                if ($this->ultNumero[0] === '-') {
                    $this->ultNumero = substr($this->ultNumero, 1);
                } else {
                    $this->ultNumero = '-' . $this->ultNumero;
                }
                $this->pantalla = $this->calculoMostrar . $this->ultNumero;
            }
        }

        public function raiz()
        {
            if (strlen($this->ultNumero) > 0) {
                $this->puntoUsado = False;

                $this->ultNumero = sqrt(floatval($this->ultNumero));

                $this->pantalla = $this->calculoMostrar - $this->ultNumero;
            }
        }

        public function mMenos()
        {
            if (strlen($this->memoria) > 0) {
                $this->memoria = eval("return $this->num1 * -1;");
            } else {
                $this->memoria = $this->memoria - eval("return $this->ultNumero;");
            }
        }

        public function mMas()
        {
            if (strlen($this->memoria) > 0) {
                $this->memoria = $this->ultNumero;
            } else {
                $this->memoria = $this->memoria + eval("return $this->ultNumero;");
            }
        }

        public function borrar() 
        {
            $this->ultNumero = '';
            $this->puntoUsado = False;
            $this->pantalla = $this->calculoMostrar;
        }

        public function borrarCalculo()
        {
            $this->calculo = '';
            $this->calculoMostrar = '';
            $this->ultNumero = '';
            $this->ultOperador = '';
            $this->puntoUsado = False;
            $this->solucionado = False;
            $this->pantalla = '';
        }

        public function igual()
        {
            if (strlen($this->calculo) > 0 && strlen($this->calculoMostrar) > 0 | $this->solucionado) {
                try {
                    if ($this->solucionado && $this->ultOperador != ',e+') {
                        $this->calculo .= $this->ultOperador . $this->ultNumero;
                    } else {
                        $this->calculo .= $this->ultNumero;
                    }
                    $this->calculoMostrar = eval("return $this->calculo;");
                    $this->pantalla = $this->calculoMostrar;
                    $this->solucionado = True;
                    $this->puntoUsado = False;
                } catch (Exception $e) {
                    $this->borrarCalculo();
                    $this->pantalla = 'Syntax ERROR';
                }
            }
        }

        // Otros métodos

        private function prepOperacion()
        {
            if (!$this->solucionado) {
                $this->calculo .= $this->ultNumero;
                $this->calculoMostrar .= $this->ultNumero;
            }
            $this->ultNumero = '';
            $this->puntoUsado = False;
            $this->solucionado = False;
        }

        private function algFact() 
        {
            $fact = 1;
            for ($i = 1; $i <= $this->ultNumero; $i++) {
                $fact *= $i;
            }
            return $fact;
        }

    }

    if (!isset($_SESSION['calcCient'])) {
        $_SESSION['calcCient'] = new CalculadoraCientifica();
    }
    $calcCient = $_SESSION['calcCient'];

    if (count($_POST) > 0) {
        if (isset($_POST['c'])) {
            $calcCient->borrarCalculo();
        } elseif (isset($_POST['ce'])) {
            $calcCient->borrar();
        } elseif (isset($_POST['signo'])) {
            $calcCient->cambiarSigno();
        } elseif (isset($_POST['sqrt'])) {
            $calcCient->raiz();
        } elseif (isset($_POST['7'])) {
            $calcCient->digitos('7');
        } elseif (isset($_POST['8'])) {
            $calcCient->digitos('8');
        } elseif (isset($_POST['9'])) {
            $calcCient->digitos('9');
        } elseif (isset($_POST['x'])) {
            $calcCient->operadores('*');
        } elseif (isset($_POST['/'])) {
            $calcCient->operadores('/');
        } elseif (isset($_POST['4'])) {
            $calcCient->digitos('4');
        } elseif (isset($_POST['5'])) {
            $calcCient->digitos('5');
        } elseif (isset($_POST['6'])) {
            $calcCient->digitos('6');
        } elseif (isset($_POST['-'])) {
            $calcCient->operadores('-');
        } elseif (isset($_POST['1'])) {
            $calcCient->digitos('1');
        } elseif (isset($_POST['2'])) {
            $calcCient->digitos(('2'));
        } elseif (isset($_POST['3'])) {
            $calcCient->digitos(('3'));
        } elseif (isset($_POST['+'])) {
            $calcCient->operadores('+');
        } elseif (isset($_POST['M-'])) {
            $calcCient->mMenos();
        } elseif (isset($_POST['0'])) {
            $calcCient->digitos('0');
        } elseif (isset($_POST[','])) {
            $calcCient->punto();
        } elseif (isset($_POST['='])) {
            $calcCient->igual();
        } elseif (isset($_POST['M+'])) {
            $calcCient->mMas(); 
        } elseif (isset($_POST['deg'])) {
            $calcCient->deg(); 
        } elseif (isset($_POST['hyp'])) {
            $calcCient->hyp(); 
        } elseif (isset($_POST['fe'])) {
            $calcCient->fe(); 
        } elseif (isset($_POST['mc'])) {
            $calcCient->mC(); 
        } elseif (isset($_POST['mr'])) {
            $calcCient->mR(); 
        } elseif (isset($_POST['ms'])) {
            $calcCient->mS(); 
        } elseif (isset($_POST['cuadrado'])) {
            $calcCient->cuadrado(); 
        } elseif (isset($_POST['potencia'])) {
            $calcCient->potencia(); 
        } elseif (isset($_POST['seno'])) {
            $calcCient->seno(); 
        } elseif (isset($_POST['coseno'])) {
            $calcCient->coseno(); 
        } elseif (isset($_POST['tangente'])) {
            $calcCient->tangente(); 
        } elseif (isset($_POST['potDiez'])) {
            $calcCient->potDiez(); 
        } elseif (isset($_POST['logaritmo'])) {
            $calcCient->logaritmo(); 
        } elseif (isset($_POST['exponencial'])) {
            $calcCient->exponencial(); 
        } elseif (isset($_POST['modulo'])) {
            $calcCient->modulo(); 
        } elseif (isset($_POST['shift'])) {
            $calcCient->shift(); 
        } elseif (isset($_POST['borrarDig'])) {
            $calcCient->borrarDig(); 
        } elseif (isset($_POST['pi'])) {
            $calcCient->pi(); 
        } elseif (isset($_POST['factorial'])) {
            $calcCient->factorial(); 
        } elseif (isset($_POST['parIzq'])) {
            $calcCient->parentesis('i'); 
        } elseif (isset($_POST['parDer'])) {
            $calcCient->parentesis('d'); 
        } 
    }

    echo "<form action='CalculadoraCientifica.php' method='post' name='Calculadora'>
        <label for='pantalla'>Calculadora Windows</label>
        <input type='text' id='pantalla' value='$calcCient->pantalla' readonly />
        <button type='submit' name='deg'>$calcCient->DRG</button>
        <button type='submit' name='hyp'>HYP</button>
        <button type='submit' name='fe'>F-E</button>
        <button type='submit' name='mc'>MC</button>
        <button type='submit' name='mr'>MR</button>
        <button type='submit' name='M+'>M+</button>
        <button type='submit' name='M-'>M-</button>
        <button type='submit' name='ms'>MS</button>
        <button type='submit' name='cuadrado'>^2</button>
        <button type='submit' name='potencia'>^</button>
        <button type='submit' name='seno'>$calcCient->vSeno</button>
        <button type='submit' name='coseno'>$calcCient->vCoseno</button>
        <button type='submit' name='tangente'>$calcCient->vTangente</button>
        <button type='submit' name='sqrt'>V</button>
        <button type='submit' name='potDiez'>10^</button>
        <button type='submit' name='logaritmo'>log</button>
        <button type='submit' name='exponencial'>exp</button>
        <button type='submit' name='modulo'>mod</button>
        <button type='submit' name='shift'>shift</button>
        <button type='submit' name='ce'>CE</button>
        <button type='submit' name='c'>C</button>
        <button type='submit' name='borrarDig'>del</button>
        <button type='submit' name='/'>/</button>
        <button type='submit' name='pi'>pi</button>
        <button type='submit' name='7'>7</button>
        <button type='submit' name='8'>8</button>
        <button type='submit' name='9'>9</button>
        <button type='submit' name='x'>x</button>
        <button type='submit' name='factorial'>n!</button>
        <button type='submit' name='4'>4</button>
        <button type='submit' name='5'>5</button>
        <button type='submit' name='6'>6</button>
        <button type='submit' name='-'>-</button>
        <button type='submit' name='signo'>+/-</button>
        <button type='submit' name='1'>1</button>
        <button type='submit' name='2'>2</button>
        <button type='submit' name='3'>3</button>
        <button type='submit' name='+'>+</button>
        <button type='submit' name='parIzq'>(</button>
        <button type='submit' name='parDer'>)</button>
        <button type='submit' name='0'>0</button>
        <button type='submit' name=','>.</button>
        <button type='submit' name='='>=</button>
        </form>";
    ?>

</body>
</html>