/* MapaKML.js */

class MapaKML {

    constructor() {
        this.puntos = '';
    }

    cargarMapa(files) {
        var kml = files[0];
        
        var lector = new FileReader();
        lector.onload = function() {

            $.ajax({
                dataType: 'xml',
                url: kml.name,
                mathod: 'GET',
                success: function(datos) {
                    var pos = {lat: 42.534167, lng: -6.537778};
                    var mapa = new google.maps.Map(document.querySelector('section'),
                        {zoom: 8, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP});
                    
                    var nombres = $('name', datos);
                    var coordenadas = $('coordinates', datos);

                    for (let i=0; i<coordenadas.length; i++) {
                        var c = coordenadas[i].textContent.split(',');
                        this.puntos += c[0] + ',' + c[1] + ';' + nombres[i+1].textContent;
                        if (i != coordenadas.length-1) {
                            this.puntos += ' ';
                        }
                    }

                    var todosPuntos = this.puntos.split(' ');
                    for (let i=0; i<todosPuntos.length; i++) {
                        var punto = todosPuntos[i].split(';');
                        var nombre = punto[1];
                        var coords = punto[0].split(',');
        
                        var marcador = new google.maps.Marker({
                            position: { lat: Number(coords[1]), lng: Number(coords[0]) },
                            title: nombre,
                            map: mapa
                        });
                    }

                    $('section :last-child()').before('<h2>Mapa a partir del KML</h2>');
                },
                error: function() {
                    $('section').remove();
                    $('body :last-child()').after('<p>Ha ocurrido un problema</p>');
                }
            });
        }
        lector.readAsText(kml);
    }
    
}

var kml = new MapaKML();