/* CalculadoraRPNEspecializada.js */

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
        if (!this.pantalla.includes('x')) {
            this.pantalla += n;
        }
    }

    punto() {
        if (!this.puntoUtilizado && this.pantalla.length > 0) {
            this.puntoUtilizado = true;
            this.pantalla += '.';
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
        if (this.comprobarPila(1)) {
            this.pantalla = '';
            this.pila.vaciar();

            this.imprimirPila();
        }
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
        document.querySelector('textarea').textContent = this.pila.print();
    }

}

class CalculadoraRPNEspecializada extends CalculadoraRPN {

    constructor() {
        super();

        this.incUsada = false;
        this.resultLim = 0;
    }

    tecla(key, altPr) {
        super.tecla(key, altPr);

        switch(key) {
            case 'x':
            case 'X':
                this.inc();
                break;
            case 'd':
            case 'D':
                this.derivada();
                break;
            case 'i':
            case 'I':
                this.integral();
                break;
            case 'y':
            case 'Y':
                this.limite();
                break;
        }
    }

    inc() {
        this.incUsada = true;
        this.pantalla = 'x';
    }

    derivada() {
        var pol = this.pila.pop();

        this.pila.push(this.derivar(pol));

        this.imprimirPila();
    }

    integral() {
        var pol = this.pila.pop();

        this.pila.push(this.integrar(pol));

        this.imprimirPila();
    }

    limite() {
        if (this.comprobarPila(2)) {
            var lim = this.pila.pop();
            var pol = this.pila.pop();
    
            this.resultLim = 0;
            var sol = '';
            if (pol.includes('x') && !lim.includes('x')) {
                sol = this.reemplazar(pol, 'x', lim);
                sol = Number(this.resolver(sol));
            } else if (!pol.includes('x') && !lim.includes('x')) {
                sol = pol;
            }
    
            this.pila.push(sol);
    
            this.incUsada = false;
    
            this.imprimirPila();
        }
    }

    // Métodos redefinidos

    digitos(n) {
        super.digitos(n);
    }

    punto() {
        if (!this.pantalla.includes('x')) {
            super.punto();
        }
    }

    suma() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.suma();
        } else {
            if (this.comprobarPila(2)) {
                var x = this.pila.pop();
                var y = this.pila.pop();
    
                this.pila.push(y + '+' + x);
    
                this.puntoUtilizado = false;
    
                this.imprimirPila();
            }
        }
    }

    resta() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.resta();
        } else {
            if (this.comprobarPila(2)) {
                var x = this.pila.pop();
                var y = this.pila.pop();
    
                this.pila.push(y + '-' + x);
    
                this.puntoUtilizado = false;
    
                this.imprimirPila();
            }
        }
    }

    multiplicacion() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.multiplicacion();
        } else {
            if (this.comprobarPila(2)) {
                var x = this.pila.pop();
                var y = this.pila.pop();
    
                this.pila.push(y + '*' + x);
    
                this.puntoUtilizado = false;
    
                this.imprimirPila();
            }
        }
    }

    division() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.division();
        } else {
            if (this.comprobarPila(2)) {
                var x = this.pila.pop();
                var y = this.pila.pop();
    
                this.pila.push(y + '/' + x);
    
                this.puntoUtilizado = false;
    
                this.imprimirPila();
            }
        }
    }

    potencia() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.potencia();
        } else {
            if (this.comprobarPila(2)) {
                var x = this.pila.pop();
                var y = this.pila.pop();
    
                this.pila.push(y + '^' + x);
    
                this.puntoUtilizado = false;
    
                this.imprimirPila();
            }
        }
    }

    raiz() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.raiz();
        }
    }

    potenciaDiez() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.potenciaDiez();
        }
    }

    modulo() {
        var x = this.pila.pop();
        var y = this.pila.pop();

        this.pila.push(y);
        this.pila.push(x);

        if (!x.toString().includes('x') && !y.toString().includes('x')) {
            super.modulo();
        }
    }

    logaritmo() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.logaritmo();
        }
    }

    seno() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.seno();
        }
    }

    arcseno() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.arcseno();
        }
    }

    coseno() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.coseno();
        }
    }

    arccoseno() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.arccoseno();
        }
    }

    tangente() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.tangente();
        }
    }

    arctangente() {
        var x = this.pila.pop();

        this.pila.push(x);
        
        if (!x.toString().includes('x')) {
            super.arctangente();
        }
    }

    // Otros métodos

    derivar(polinomio) {
        var elemento = '';
        var result = '';

        if (polinomio.includes('+') || polinomio.includes('-')) {
            for (var i in polinomio) {
                if (polinomio[i] != '+' && polinomio[i] != '-') {
                    elemento += polinomio[i];
                } else {
                    var elDeriv = this.derivarElemento(elemento);
                    if (elDeriv != '0') {
                        result += elDeriv + polinomio[i];
                    }
                    elemento = '';
                }
            }
            result += this.derivarElemento(elemento);
            while (result.charAt(result.length-1) === '0' ||
                result.charAt(result.length-1) === '+' 
                || result.charAt(result.length-1) === '-') {

                    result = result.substring(0, result.length-1);
            }
        } else {
            result = this.derivarElemento(polinomio);
        }
        return result;
    }

    derivarElemento(e) {
        if (e.includes('x')) { // si contiene incógnita
            var eAux = e;
            if (!e.includes('*')) { // si no está multiplicado por un número, se modifica para que multiplique por 1
                eAux = '1*' + e;
            }
            var aux = eAux.split('*');
            if (e.includes('^')) { // si está elevada a algún número
                var i = aux[1].includes('^') ? 1 : 0;
                var j = i==1 ? 0 : 1;

                var exp = Number(aux[i].split('^')[1]);

                var result = '';
                var mult = Number(aux[j]);
                if (exp == 2) {
                    result = Number(exp * mult) + '*x';
                } else {
                    result = Number(exp * mult) + '*x^' + (exp-1);
                }
                return result;
            } else {
                var i = aux[1] === 'x' ? 1 : 0;
                var j = i==1 ? 0 : 1;

                return aux[j];
            }
        } else { // si no hay incógnita, solo es un número
            return '0';
        }
    }

    integrar(polinomio) {
        var elemento = '';
        var result = '';

        if (polinomio.includes('+') || polinomio.includes('-')) {
            for (var i in polinomio) {
                if (polinomio[i] != '+' && polinomio[i] != '-') {
                    elemento += polinomio[i];
                } else {
                    var elInt = this.integrarElemento(elemento);
                    if (elInt != '0') {
                        result += elInt + polinomio[i];
                    }
                    elemento = '';
                }
            }
            result += this.integrarElemento(elemento);
            while (result.charAt(result.length-1) === '0' ||
                result.charAt(result.length-1) === '+' 
                || result.charAt(result.length-1) === '-') {

                    result = result.substring(0, result.length-1);
            }
        } else {
            result = this.integrarElemento(polinomio);
        }
        return result;
    }

    integrarElemento(e) {
        if (e.includes('x')) {
            var eAux = e;
            if (!e.includes('*')) { // si es solo x, añadir que multiplique por 1
                eAux = '1*' + e;
            }
            var aux = eAux.split('*');
            if (e.includes('^')) {
                var i = aux[1].includes('^') ? 1 : 0;
                var j = i==1 ? 0 : 1;

                var exp = Number(aux[i].split('^')[1]);

                var result = '';
                var mult = Number(aux[j]);
                if (mult == 1) { // si el multiplicador es 1, no lo añade
                    result = 'x^' + (exp+1) + '/' + (exp+1);
                } else {
                    result = mult + '*x^' + (exp+1) + '/' + (exp+1);
                }
                return result;
            } else {
                var i = aux[1] === 'x' ? 1 : 0;
                var j = i==1 ? 0 : 1;

                var result = '';
                if (aux[j] === '1') { // si el multiplicador es 1 no lo añade
                    result = 'x^2/2';
                } else {
                    result = aux[j] + '*x^2/2';
                }
                return result;
            }
        } else {
            if (e === '0') { // integral de 0 se interpreta como 0 (sería cualquier valor num)
                return '0';
            } else if (e === '1') { // integral de 1 = x
                return 'x';
            }
            return e + '*x';
        }
    }

    reemplazar(str, oldV, newV) { // reemplaza los caracteres de un string por otro caracter
        var aux = '';
        for (var ch in str) {
            if (str[ch] === oldV) {
                aux += newV;
            } else {
                aux += str[ch];
            }
        }
        return aux;
    }

    resolver(op) {
        return this.calcularRec(op, 0);
    }

    calcularRec(op, res) {
        if (op.includes('+')) {

            var suma = op.split('+');
            var auxSuma = 0;
            for (var i=0; i < suma.length; i++) {
                auxSuma = auxSuma + this.calcularRec(suma[i], res);
            }
            res = auxSuma;

        } else if (op.includes('-')) {

            var resta = op.split('-');
            var auxResta = this.calcularRec(resta[0], res);
            for (var i=1; i < resta.length; i++) {
                auxResta = auxResta - this.calcularRec(resta[i], res);
            }
            res = auxResta;

        } else if (op.includes('/')) {

            var div = op.split('/');
            var auxDiv = this.calcularRec(div[0], res);
            if (res == 0) {  res = 1;  }
            for (var i=1; i < div.length; i++) {
                auxDiv = auxDiv / this.calcularRec(div[i], res);
            }
            res = auxDiv;

        } else if (op.includes('*')) {

            var mult = op.split('*');
            var auxMult = 1;
            if (res == 0) {  res = 1;  }
            for (var i=0; i < mult.length; i++) {
                auxMult = auxMult * this.calcularRec(mult[i], res);
            }
            res = auxMult;

        } else if (op.includes('^')) {

            var pot = op.split('^');
            res = Number(pot[0]) ** Number(pot[1]);

        } else {
            
            res = Number(op);
        }
        return res;
    }

}

var calc = new CalculadoraRPNEspecializada();
