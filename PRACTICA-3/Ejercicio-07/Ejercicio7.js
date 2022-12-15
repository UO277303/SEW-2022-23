/* Ejercicio7.js */

class Ejercicio7 {

    constructor() {
        this.mod = false;
    }

    ocultar() {
        $('aside > p').hide();
    }

    mostrar() {
        $('aside > p').show();
    }

    modificar() {
        console.log('soy concha, entro');
        if (this.mod) {
            $('main h1').text('Entorno Node.js');
            $('section h2').text('Versiones');
            $('section p:nth-child(2)').text('Estas son algunas de las versiones más importantes de Node.js:');
            this.mod = false;
        } else {
            $('main h1').text('Node.js Enviroment');
            $('section h2').text('Versions');
            $('section p:nth-child(2)').text('These are some of Node.js versions:');
            this.mod = true;
        }
    }

    añadir() {
        $('main section table').after('<p>Párrafo añadido con el botón "Añadir"</p>')
    }

    eliminar() {
        $('main section p:last-child()').remove();
    }

    recorrerElementos() {
        $('footer').after('<article><h2>Elementos del árbol DOM</h2></article>');
        $('*', document.body).each(function () {
            var padre = $(this).parent().get(0).tagName;
            $('article :last-child').after('<p> Elemento padre: ' + padre +
                ' Elemento actual: ' + $(this).get(0).tagName + ' Valor: ' + $(this).get(0).value + '</p>');
        });
    }

    sumarFilasColumnas() {
        var tabla = document.querySelector('table');
        var nFilas = document.querySelectorAll('tr').length;
        var nColumnas = document.querySelectorAll('tr:first-child th').length;

        tabla.querySelector('thead tr:first-child').innerHTML += '<th>Total</th>';

        var filas = tabla.querySelectorAll('tr');
        for (let i=1; i<nFilas; i++) {
            console.log(filas[i]);
            var total = filas[i].innerText.replace('\t', ' ');
            filas[i].innerHTML += '<td>' + total + '</td>';
        }

        var ultimaFila = '';
        for (let c=0; c<nColumnas; c++) {
            var total = '';
            for (let f=1; f<nFilas; f++) {
                total += filas[f].children[c].innerText + ' ';
            }
            if (c == nColumnas-1) {
                ultimaFila += total;
            } else {
                ultimaFila += total + '|sep|';
            }
        }
        var totalCols = ultimaFila.split('|sep|');
        var htmlUltFila = '<tr>';
        for (let i=0; i<totalCols.length; i++) {
            htmlUltFila += '<td>' + totalCols[i] + '</td>';
        }
        htmlUltFila += '<td>0</td></tr>';

        tabla.querySelector('tbody').innerHTML += htmlUltFila;

        $('table').after('<p>La tabla tiene ' + nFilas + ' filas y ' + nColumnas + ' columnas</p>')
    }
}

var ej = new Ejercicio7();
