/* CalculadoraCientifica.js */

"use strict"

class Calculadora {

    constructor() {
        this.operador = '';         // Operador que se va a utilizar
        this.num1 = '';             // Primer operando
        this.num2 = '';             // Segundo operando

        this.puntoUsado = false;    // Punto utilizado en el número
        this.comienzo = true;       // Indica si empieza un cálculo nuevo
        this.primerOp = true;       // true = 1ºop, false = 2ºop
        this.operadorUsado = false; // Indica si se ha pulsado un operador
        this.solucionado = false;   // Indica si se ha resuelto un cálculo

        this.porcUsado = 0;         // 0->no se calcula, 1->en num1, 2->en num2
        this.raizUsada = 0;         // 0->no se calcula, 1->en num1, 2->en num2

        this.memoria = '';          // Valor en memoria

        document.addEventListener('keydown', (event) => {

            this.tecla(event.key, event.altKey);
        
        });

    }

    tecla(key, altPr) {
        switch (key) {
            case '+':
                this.suma();
                break;
            case '-':
                this.resta();
                break;
            case '*':
                this.multiplicacion();
                break;
            case '/':
                if (altPr) {
                    this.division();
                }
                break;
            case 'Delete':
            case 'Backspace':
                this.borrar();
                break;
            case 'c':
            case 'C':
                if (altPr) {
                    this.mrc();
                } else {
                    this.borrarCalculo();
                }
                break;
            case '=':
            case 'Enter':
                this.igual();
                break;
            case ',':
            case '.':
                this.punto();
                break;
            case 'p':
            case 'P':
                this.porcentaje();
                break;
            case 'r':
            case 'R':
                this.raiz();
                break;
            case 's':
            case 'S':
                this.cambiarSigno();
                break;
            case 'n':
            case 'N':
                if (altPr) {
                    this.mMas();
                }
                break;
            case 'b':
            case 'B':
                if (altPr) {
                    this.mMenos();
                }
                break;
        }
    
        if ('0123456789'.includes(key)) {
            this.digitos(key);
        }
    }

    digitos(n) {
        this.comprobarComienzo();

        if (this.solucionado) {
            this.num1 = '';
            this.operador = '';
            this.num2 = '';
            this.primerOp = true;
            this.solucionado = false;
        }
        
        if (this.primerOp) {
            if (this.num1 === '0') {
                this.num1 = n;
            } else {
                this.num1 += n;
            }
            document.querySelector('input[type="text"]').value = this.num1;
        } else {
            if (this.num2 === '0') {
                this.num2 = n;
            } else {
                this.num2 += n;
            }

            if (this.operador === '') {
                this.operador = '*';
            }

            document.querySelector('input[type="text"]').value = this.num2;
        }
    }

    punto() {
        if (!this.puntoUsado && !this.solucionado) {
            this.puntoUsado = true;

            if (this.primerOp) {
                if (this.num1 === '') {
                    this.num1 = '0.';
                } else {
                    this.num1 += '.';
                }
                document.querySelector('input[type="text"]').value = this.num1;
            } else {
                if (this.operadorUsado && this.num2 === '') {
                    this.num2 = '0.';
                } else {
                    this.num2 += '.';
                }
                document.querySelector('input[type="text"]').value = this.num2;
            }
        }
    }

    suma() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarSolucionado();
        this.comprobarNuevoCalculo();

        this.operador = '+';
        this.primerOp = false;
        this.operadorUsado = true;
        this.puntoUsado = false;
    }

    resta() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarSolucionado();
        this.comprobarNuevoCalculo();

        this.operador = '-';
        this.primerOp = false;
        this.operadorUsado = true;
        this.puntoUsado = false;
    }

    multiplicacion() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarSolucionado();
        this.comprobarNuevoCalculo();

        this.operador = '*';
        this.primerOp = false;
        this.operadorUsado = true;
        this.puntoUsado = false;
    }

    division() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarSolucionado();
        this.comprobarNuevoCalculo();

        this.operador = '/';
        this.primerOp = false;
        this.operadorUsado = true;
        this.puntoUsado = false;
    }

    porcentaje() {
        this.comprobarComienzo();

        if (this.primerOp) {
            this.porcUsado = 1;
        } else {
            this.porcUsado = 2;
        }
    }

    cambiarSigno() {
        this.comprobarComienzo();
        
        if (!this.solucionado) {
            if (this.primerOp) {
                if (this.num1 != '') {
                    if (this.num1.charAt(0) === '-') {
                        this.num1 = '' + Number(this.num1) * -1;
                    } else {
                        this.num1 = '-' + this.num1;
                    }
                    document.querySelector('input[type="text"]').value = this.num1;
                }
            } else {
                if (this.num2 != '') {
                    if (this.num2.charAt(0) === '-') {
                        this.num2 = '' + Number(this.num2) * -1;
                    } else {
                        this.num2 = '-' + this.num2;
                    }
                    document.querySelector('input[type="text"]').value = this.num2;
                }
            }
        }
    }

    raiz() {
        this.comprobarComienzo();

        if (this.primerOp) {
            this.num1 = '' + Number(Number(this.num1) ** (1/2));
            this.primerOp = false;
        } else {
            this.num2 = '' + Number(Number(this.num2) ** (1/2));
        }
    }

    mrc() {
        this.comprobarMemoria();

        document.querySelector('input[type="text"]').value = this.memoria;
    }

    mMenos() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarMemoria();

        var result = 0;
        if (this.solucionado) {
            result = eval(Number(this.memoria) - Number(document.querySelector('input[type="text"]').value));
        } else {
            if (this.primerOp) {
                result = eval(Number(this.memoria) - Number(this.num1));
            } else {
                result = eval(Number(this.memoria) - Number(this.num2));
            }
        }
        this.memoria = result;
    }

    mMas() {
        this.comprobarComienzo();
        this.comprobarPrimerOp();
        this.comprobarMemoria();

        var result = 0;
        if (this.solucionado) {
            result = eval(Number(this.memoria) + Number(document.querySelector('input[type="text"]').value));
        } else {
            if (this.primerOp) {
                result = eval(Number(this.memoria) + Number(this.num1));
            } else {
                result = eval(Number(this.memoria) + Number(this.num2));
            }
        }
        this.memoria = result;
    }

    borrar() {
        if (!this.solucionado) {
            if (this.primerOp) {
                this.num1 = '';
                document.querySelector('input[type="text"]').value = this.num1;
            } else {
                if (this.num2 === '' && this.operadorUsado) {
                    this.operadorUsado = false;
                    this.operador = '';
                } else {
                    this.num2 = '';
                    document.querySelector('input[type="text"]').value = this.num2;
                }
            }
        }

        this.puntoUsado = false;
    }

    borrarCalculo() {
        this.operador = '';
        this.num1 = '';
        this.num2 = '';
        this.memoria = '';

        this.puntoUsado = false;
        this.comienzo = true;
        this.primerOp = true;
        this.operadorUsado = false;
        
        document.querySelector('input[type="text"]').value = '0';
    }

    igual() {
        if (this.num1 != '') {

            var calculo = '';

            if (this.porcUsado === 0) {
                if (this.num2 === '') {
                    if (this.operador === '*') {
                        this.num2 = Number(this.num1);
                    } else if (this.operador === '+' || this.operador === '-') {
                        this.num2 = '0';
                    } else if (this.operador === '/') {
                        this.num2 = Number(this.num1);
                        this.num1 = 1;
                    }
                }

                if (this.raizUsada != 0) {

                    if (this.num2 === '') {
                        calculo = eval(Number(Number(this.num1) ** (1/2)));
                    } else {
                        if (this.raizUsada === 1) {
                            calculo = Number(Number(this.num1) ** (1/2)) + this.operador + Number(this.num2);
                        } else if (this.raizUsada === 2) {
                            calculo = Number(Number(this.num2) ** (1/2)) + this.operador + Number(this.num1);
                        }
                    }

                    this.num1 = Number(eval(calculo));
                    this.solucionado = true;
                    this.raizUsada = 0;
                    document.querySelector('input[type="text"]').value = this.num1;

                } else {

                    this.solucionado = true;
                    calculo = this.num1 + this.operador + this.num2;
                    this.num1 = Number(eval(calculo));
                    document.querySelector('input[type="text"]').value = this.num1;
                }

            } else {
                var n1 = 0;
                var n2 = 0;
                if (this.porcUsado === 2) {
                    n1 = Number(this.num1);
                    n2 = Number(this.num2);
                } else {
                    n1 = Number(this.num2);
                    n2 = Number(this.num1);
                }

                if (this.solucionado || this.operador === '' && this.num2 === '') {
                    calculo = Number(this.num1 / 100);
                } else {

                    switch (this.operador) {
                        case '+':
                            calculo = n1 + ((n1 * n2) / 100);
                            break;
                        case '-':
                            calculo = n1 - ((n1 * n2) / 100);
                            break;
                        case '*':
                            calculo = n1 * n2 / 100;
                            break;
                        case '/':
                            calculo = n1 * 100 / n2;
                            break;
                    }

                }

                this.num1 = Number(eval(calculo));
                document.querySelector('input[type="text"]').value = this.num1;

                this.solucionado = true;
                this.num2 = '';
                this.operador = '';
                this.porcUsado = 0;
            }
        }
    }

    // Otros métodos

    comprobarComienzo() {
        if (this.comienzo) {
            document.querySelector('input[type="text"]').value = '';
            this.comienzo = false;
            this.primerOp = true;
            this.puntoUsado = false;
            this.operadorUsado = false;
        }
    }

    comprobarSolucionado() {
        if (this.solucionado) {
            this.operador = '';
            this.num2 = '';
            this.solucionado = false;
        }
    }

    comprobarPrimerOp() {
        if (this.num1 === '' && this.primerOp) {
            this.num1 = '0';
            this.primerOp = false;
        }
    }

    comprobarNuevoCalculo() {
        if (!this.solucionado && this.num1 != '' && this.num2 != '' && this.operador != '') {
            var calculo = Number(this.num1) + this.operador + Number(this.num2);
            this.num1 = eval(calculo);
            this.operador = '';
            this.num2 = '';
            this.primerOp = false;
            this.puntoUsado = false;
            this.operadorUsado = false;
        }
    }

    comprobarMemoria() {
        if (this.memoria === '') {
            this.memoria = '0';
        }
    }

}

class CalculadoraCientifica extends Calculadora {

    constructor() {
        super();

        this.shiftPresionado = false;
        this.hypPres = false;
        this.notCient = false;
        
        this.calculoMostrar = '';
        this.calculo = '';
        this.ultOperador = '';
        this.ultNumero = '';

        this.DRG = 0; // 0=deg, 1=rad, 2=grad
    }

    tecla(key, altPr) {
        super.tecla(key, altPr);
        
        switch (key) {
            case 'd':
            case 'D':
                this.borrarDigito();
                break;
            case 'g':
            case 'G':
                this.deg();
                break;
            case 'h':
            case 'H':
                if (altPr) {
                    this.hyp();
                }
                break;
            case 'f':
            case 'F':
                this.factorial();
                break;
            case 'j':
            case 'J':
                this.fe();
                break;
            case 'r':
            case 'R':
                if (altPr) {
                    this.mR();
                } else {
                    this.raiz();
                }
                break;
            case 'a':
            case 'A':
                this.mC();
                break;
            case 'n':
            case 'N':
                if (altPr) {
                    this.mMas();
                }
                break;
            case 'b':
            case 'B':
                if (altPr) {
                    this.mMenos();
                } else {
                    this.mS();
                }
                break;
            case 'e':
            case 'E':
                this.seno();
                break;
            case 'i':
            case 'I':
                this.pi();
                break;
            case 'l':
            case 'L':
                this.logaritmo();
                break;
            case 'm':
            case 'M':
                this.modulo();
                break;
            case 'o':
            case 'O':
                this.coseno();
                break;
            case 'k':
            case 'K':
                this.potencia();
                break;
            case 'q':
            case 'Q':
                this.parentesis('i');
                break;
            case 't':
            case 'T':
                this.tangente();
                break;
            case 'u':
            case 'U':
                this.cuadrado();
                break;
            case 'w':
            case 'W':
                this.parentesis('d');
                break;
            case 'x':
            case 'X':
                this.exponencial();
                break;
            case 'z':
            case 'Z':
                this.potenciaDiez();
                break;
            case 'Shift':
                this.shift();
                break;
        }
    }

    deg() {
        switch(this.DRG) {
            case 0:
                this.DRG = 1;
                document.querySelector('input[value="DEG"]').value = 'RAD';
                break;
            case 1:
                this.DRG = 2;
                document.querySelector('input[value="RAD"]').value = 'GRAD';
                break;
            case 2:
                this.DRG = 0;
                document.querySelector('input[value="GRAD"]').value = 'DEG';
                break;
        }
    }

    hyp() {
        if (!this.shiftPresionado) {
            if (this.hypPres) { // hyp
                this.hypPres = false;
                document.querySelector('input[value="sinh"]').value = 'sin';
                document.querySelector('input[value="cosh"]').value = 'cos';
                document.querySelector('input[value="tanh"]').value = 'tan';
            } else { // nada
                this.hypPres = true;
                document.querySelector('input[value="sin"]').value = 'sinh';
                document.querySelector('input[value="cos"]').value = 'cosh';
                document.querySelector('input[value="tan"]').value = 'tanh';
            }
        } else {
            if (this.hypPres) { // hyp shift
                this.hypPres = false;
                document.querySelector('input[value="arcsinh"]').value = 'arcsin';
                document.querySelector('input[value="arccosh"]').value = 'arccos';
                document.querySelector('input[value="arctanh"]').value = 'arctan';
            } else { //shift
                this.hypPres = true;
                document.querySelector('input[value="arcsin"]').value = 'arcsinh';
                document.querySelector('input[value="arccos"]').value = 'arccosh';
                document.querySelector('input[value="arctan"]').value = 'arctanh';
            }
        }
    }

    fe() {
        var aux = document.querySelector('input[type="text"]').value;
        var cond = true;

        for (var ch in aux) {
            if (!'1234567890.-'.includes(aux[ch])) {
                cond = false;
            }
        }

        if (cond) {
            var numeroNC = Number(aux).toExponential();
            document.querySelector('input[type="text"]').value = numeroNC;
        } else {
            if (this.ultNumero.length > 0) {
                if (!this.notCient) {
                    var numeroNC = Number(this.ultNumero).toExponential();
                    document.querySelector('input[type="text"]').value = numeroNC;
                    this.notCient = true;
                } else {
                    document.querySelector('input[type="text"]').value = this.ultNumero;
                    this.notCient = false;
                }
                this.solucionado = true;
                this.puntoUsado = false;
            }
        }
    }

    mC() {
        this.memoria = '';
    }

    mR() {
        if (this.memoria.length > 0) {
            this.ultNumero = this.memoria;
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    mS() {
        this.memoria = Number(this.ultNumero);
    }

    cuadrado() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;
        
            this.ultNumero = Number(Math.pow(Number(this.ultNumero), 2));
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    potencia() {
        this.prepOperacion();
        this.calculo += '**';
        this.calculoMostrar += '**';
        this.ultOperador = '**';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    seno() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;

            var value = '';
            if (this.DRG == 0) {
                value = Number(eval(Number(this.ultNumero) / 180 * Math.PI));
            } else if (this.DRG == 1) {
                value = Number(this.ultNumero);
            } else {
                value = Number(eval(Number(this.ultNumero) / 200 * Math.PI));
            }
        
            if (this.shiftPresionado) {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.asinh(value));
                } else {
                    this.ultNumero = Number(Math.asin(value));
                }
            } else {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.sinh(value));
                } else {
                    this.ultNumero = Number(Math.sin(value));
                }
            }

            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    coseno() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;

            var value = '';
            if (this.DRG == 0) {
                value = Number(eval(Number(this.ultNumero) / 180 * Math.PI));
            } else if (this.DRG == 1) {
                value = Number(this.ultNumero);
            } else {
                value = Number(eval(Number(this.ultNumero) / 200 * Math.PI));
            }
        
            if (this.shiftPresionado) {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.acosh(value));
                } else {
                    this.ultNumero = Number(Math.acos(value));
                }
            } else {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.cosh(value));
                } else {
                    this.ultNumero = Number(Math.cos(value));
                }
            }

            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    tangente() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;

            var value = '';
            if (this.DRG == 0) {
                value = Number(eval(Number(this.ultNumero) / 180 * Math.PI));
            } else if (this.DRG == 1) {
                value = Number(this.ultNumero);
            } else {
                value = Number(eval(Number(this.ultNumero) / 200 * Math.PI));
            }
        
            if (this.shiftPresionado) {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.atanh(value));
                } else {
                    this.ultNumero = Number(Math.atan(value));
                }
            } else {
                if (this.hypPres) {
                    this.ultNumero = Number(Math.tanh(value));
                } else {
                    this.ultNumero = Number(Math.tan(value));
                }
            }

            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    potenciaDiez() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;
        
            this.ultNumero = Number(Math.pow(10, Number(this.ultNumero)));
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    logaritmo() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;
        
            this.ultNumero = Number(Math.log(Number(this.ultNumero)));
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    exponencial() {
        this.prepOperacion();
        this.calculo += '*10**';
        this.calculoMostrar += ',e+';
        this.ultOperador = ',e+';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    modulo() {
        this.prepOperacion();
        this.calculo += '%';
        this.calculoMostrar += '%';
        this.ultOperador = '%';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    shift() {
        if (!this.hypPres) {
            if (this.shiftPresionado) { // shift
                this.shiftPresionado = false;
                document.querySelector('input[value="arcsin"]').value = 'sin';
                document.querySelector('input[value="arccos"]').value = 'cos';
                document.querySelector('input[value="arctan"]').value = 'tan';
            } else { // nada
                this.shiftPresionado = true;
                document.querySelector('input[value="sin"]').value = 'arcsin';
                document.querySelector('input[value="cos"]').value = 'arccos';
                document.querySelector('input[value="tan"]').value = 'arctan';
            }
        } else {
            if (this.shiftPresionado) { // shift hyp
                this.shiftPresionado = false;
                document.querySelector('input[value="arcsinh"]').value = 'sinh';
                document.querySelector('input[value="arccosh"]').value = 'cosh';
                document.querySelector('input[value="arctanh"]').value = 'tanh';
            } else { // hyp
                this.shiftPresionado = true;
                document.querySelector('input[value="sinh"]').value = 'arcsinh';
                document.querySelector('input[value="cosh"]').value = 'arccosh';
                document.querySelector('input[value="tanh"]').value = 'arctanh';
            }
        }
    }

    borrarDigito() {
        var dig = '';
        if (this.ultNumero.length >= 1) {
            dig = this.ultNumero.charAt(this.ultNumero.length-1);
            this.ultNumero = this.ultNumero.substring(0, this.ultNumero.length-1);
        } else {
            if (!this.calculoMostrar.includes('(') && !this.calculoMostrar.includes(')')) {
                dig = this.calculoMostrar.charAt(this.calculoMostrar.length-1);
                this.calculoMostrar = this.calculoMostrar.substring(0, this.ultNumero.length-1);
            }
        }
        if (dig === '.') {
            this.puntoUsado = false;
        }
        document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
    }

    pi() {
        this.ultNumero = Math.PI;
        document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
    }

    factorial() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;
        
            this.ultNumero = this.algFact(Number(this.ultNumero));
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    parentesis(lado) {
        if (lado === 'i') {
            this.calculo += '(';
            this.calculoMostrar += '(';
        } else {
            this.ultNumero += ')';
        }
        document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
    }

    // Métodos redefinidos

    digitos(n) {
        if (this.solucionado) {
            this.calculo = '';
            this.calculoMostrar = '';
            this.ultNumero = '';
            this.solucionado = false;
            document.querySelector('input[type="text"]').value = '';
        }
        this.ultNumero += n;
        document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
    }

    punto() {
        if (!this.puntoUsado) {
            this.puntoUsado = true;
            this.ultNumero += '.';
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    suma() {
        this.prepOperacion();
        this.calculo += '+';
        this.calculoMostrar += '+';
        this.ultOperador = '+';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    resta() {
        this.prepOperacion();
        this.calculo += '-';
        this.calculoMostrar += '-';
        this.ultOperador = '-';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    multiplicacion() {
        this.prepOperacion();
        this.calculo += '*';
        this.calculoMostrar += '*';
        this.ultOperador = '*';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    division() {
        this.prepOperacion();
        this.calculo += '/';
        this.calculoMostrar += '/';
        this.ultOperador = '/';
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    cambiarSigno() {
        if (this.ultNumero != '' && !this.solucionado) {
            if (this.ultNumero.charAt(0) === '-') {
                this.ultNumero = '' + Number(this.ultNumero) * -1;
            } else {
                this.ultNumero = '-' + this.ultNumero;
            }
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    raiz() {
        if (this.ultNumero.length > 0) {
            this.puntoUsado = false;

            this.ultNumero = Number(Math.sqrt(Number(this.ultNumero)));
            document.querySelector('input[type="text"]').value = this.calculoMostrar + this.ultNumero;
        }
    }

    mMas() {
        if (this.memoria.length == 0) {
            this.mS();
        } else {
            this.memoria = Number(eval(Number(this.memoria) + Number(this.ultNumero)));
        }
        this.solucionado = true;
    }

    mMenos() {
        if (this.memoria.length == 0) {
            this.ultNumero = Number(eval(Number(this.ultNumero) * -1));
            this.mS();
        } else {
            this.memoria = Number(eval(Number(this.memoria) - Number(this.ultNumero)));
        }
        this.solucionado = true;
    }

    borrar() {
        this.ultNumero = '';
        this.puntoUsado = false;
        document.querySelector('input[type="text"]').value = this.calculoMostrar;
    }

    borrarCalculo() {
        this.calculo = '';
        this.calculoMostrar = '';
        this.ultNumero = '';
        this.ultOperador = '';
        this.puntoUsado = false;
        document.querySelector('input[type="text"]').value = '';
    }

    igual() {
        if (this.calculo.length > 0 && this.calculoMostrar.length > 0 || this.solucionado) {
            try {
                if (this.solucionado && this.ultOperador != ',e+') {
                    this.calculo += this.ultOperador + Number(this.ultNumero);
                } else {
                    this.calculo += Number(this.ultNumero);
                }
                this.calculoMostrar = eval(this.calculo);
                document.querySelector('input[type="text"]').value = this.calculoMostrar;
                this.solucionado = true;
                this.puntoUsado = false;
            } catch (e) {
                this.borrarCalculo();
                document.querySelector('input[type="text"]').value = 'Syntax ERROR';
            }
        }
    }

    // Otros métodos

    prepOperacion() {
        if (!this.solucionado) {
            this.calculo += Number(this.ultNumero);
            this.calculoMostrar += Number(this.ultNumero);
        }
        this.ultNumero = '';
        this.puntoUsado = false;
        this.solucionado = false;
    }

    algFact(n) {
        if(n === 0 || n === 1){
            return 1;
        } else {
            return n * this.algFact(n - 1);
        }
    }

}

var calc = new CalculadoraCientifica();
