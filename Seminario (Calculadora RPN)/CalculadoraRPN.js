/* CalculadoraRPN.js */

"use strict"

class Pila {

    constructor() {
        this.pila = new Array();
    }

    push(e) {
        this.pila.push(e);
    }

    pop() {
        return this.pila.pop();
    }

    size() {
        return this.pila.length;
    }

    print() {
        var result = '';
        var index = 1;

        for (var e in this.pila) {
            result = index + '.\t\t\t\t' + this.pila[e] + '\n' + result;
            index++;
        }

        return result;
    }

    vaciar() {
        var tam = this.size();
        while (tam > 0) {
            this.pop();
            tam--;
        }
    }

}

class CalculadoraRPN {

    constructor() {
        this.pila = new Pila();
        this.puntoUtilizado = false;
        this.pantalla = '';

        document.addEventListener('keydown', (event) => {

            this.tecla(event.key, event.altKey);
        
        });
    }

    tecla(key, altPr) {
        switch(key) {
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
            case 'C':
            case 'c':
            case 'Delete':
            case 'Backspace':
                this.borrar();
                break;
            case 'Enter':
                this.enter();
                break;
            case 'P':
            case 'p':
                this.potencia();
                break;
            case '.':
            case ',':
                this.punto();
                break;
            case 's':
            case 'S':
                this.seno();
                break;
            case 'a':
            case 'A':
                this.arcseno();
                break;
            case 'O':
            case 'o':
                this.coseno();
                break;
            case 'K':
            case 'k':
                this.arccoseno();
                break;
            case 'T':
            case 't':
                this.tangente();
                break;
            case 'N':
            case 'n':
                this.arctangente();
                break;
            case 'M':
            case 'm':
                this.modulo();
                break;
            case 'r':
            case 'R':
                this.raiz();
                break;
            case 'l':
            case 'L':
                this.logaritmo();
                break;
            case 'z':
            case 'Z':
                this.potenciaDiez();
                break;              
        }

        if ('0123456789'.includes(key)) {
            this.digitos(key);
        }
    }

    digitos(n) {
        this.pantalla += n;
        this.imprimirPila();
    }

    punto() {
        if (!this.puntoUtilizado && this.pantalla.length > 0) {
            this.puntoUtilizado = true;
            this.pantalla += '.';
            this.imprimirPila();
        }
    }

    enter() {
        if (this.pantalla.length > 0) {
            var num = this.pantalla;
            this.pantalla = '';

            this.pila.push(num);

            this.puntoUtilizado = false;

            this.imprimirPila();
        }
    }

    suma() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x + y);

            this.puntoUtilizado = false;

            this.imprimirPila();
        }
    }

    resta() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x - y);

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    multiplicacion() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x * y);

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    division() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x / y);

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    borrar() {
        this.pantalla = '';
        this.pila.vaciar();

        this.imprimirPila();
    }

    potencia() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x ** y);

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    raiz() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.sqrt(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    potenciaDiez() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.pow(10, x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    logaritmo() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.log(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    modulo() {
        if (this.comprobarPila(2)) {
            var y = Number(this.pila.pop());
            var x = Number(this.pila.pop());

            this.pila.push(x % y);

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    seno() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.sin(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    arcseno() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.asin(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    coseno() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.cos(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    arccoseno() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.acos(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    tangente() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.tan(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    arctangente() {
        if (this.comprobarPila(1)) {
            var x = Number(this.pila.pop());

            this.pila.push(Math.atan(x));

            this.puntoUtilizado = false;
            
            this.imprimirPila();
        }
    }

    // Otros métodos

    comprobarPila(tam) {
        return this.pila.size() >= tam;
    }

    imprimirPila() {
        document.querySelector('textarea').textContent = this.pila.print() + '\n' + this.pantalla;
    }

}

var calc = new CalculadoraRPN();
