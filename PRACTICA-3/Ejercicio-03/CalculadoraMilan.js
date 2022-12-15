/* CalculadoraMilan.js */

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

var calc = new Calculadora();
