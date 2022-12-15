/* MapaGeoJSON.js */

class MapaGeoJSON {

    constructor() {
        this.puntosStr = '';
    }

    cargarMapa(files) {
        var geojson = files[0];
        
        var lector = new FileReader();
        lector.onload = function() {
            var puntos = JSON.parse(lector.result)['features'];

            for (let i=0; i<puntos.length; i++) {
                var punto = puntos[i];
                this.puntosStr += punto['geometry']['coordinates'][0] + ',' + punto['geometry']['coordinates'][1] 
                    + ';' + punto['properties'].Name;
                if (i != puntos.length-1) {
                    this.puntosStr += ' ';
                }
            }

            this.puntosStr = this.puntosStr.replace('undefined', '');

            var pos = {lat: 42.534167, lng: -6.537778};
            var mapa = new google.maps.Map(document.querySelector('section'),
                {zoom: 8, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP});

            var todosPuntos = this.puntosStr.split(' ');
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
        }
        lector.readAsText(geojson);
    }
    
}

var geoj = new MapaGeoJSON();