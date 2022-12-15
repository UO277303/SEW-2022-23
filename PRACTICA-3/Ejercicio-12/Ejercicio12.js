/* Ejercicio12.js */

class Archivos {

    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            $('h1').after('<p>Este navegador soporta API File</p>');
        } else {
            $('h1').after('<p>ERROR: Este navegador no soporta API File</p>');
        }
    }

    mostrarPropiedades(archivos) {
        var n = archivos.length;

        for (var i=n-1; i >= 0; i--) {
            var nombre = archivos[i].name;
            var tipo = archivos[i].type;
            var size = archivos[i].size;
            var date = new Date(archivos[i].lastModified *1000).toLocaleTimeString();

            var datos = '<section><h2>Propiedades del archivo ' + (i+1) + '</h2><p>Nombre: ' + nombre + '</p><p>Tipo de archivo: ' 
                + tipo + '</p><p> Tamaño: ' + size + ' bytes</p><p>Última modificación: ' + date + '</p></section>';

            $('form').after(datos);
        }
    }

    mostrarContenido(archivos) {
        var archivo = archivos[0];
        
        var nombre = archivo.name;
        var tipo = archivo.type;
        var size = archivo.size;
        var date = new Date(archivo.lastModified *1000).toLocaleTimeString();

        var lector = new FileReader();
        lector.onload = function() {
            $('section:last-child() p:last-child()').text('Contenido: ' + lector.result);
        }
        lector.readAsText(archivo);

        $('section:last-child() p:last-child()').before('<h2>Contenido de ' + nombre + '</h2>');
        $('section:last-child() p:last-child()').before('<p>Tipo: ' + tipo + '</p>');
        $('section:last-child() p:last-child()').before('<p>Tamaño: ' + size + ' bytes</p>');
        $('section:last-child() p:last-child()').before('<p>Última modificación: ' + date + '</p>');
    }
}

var arc = new Archivos();