/* Ejercicio11.js */

"use strict"

class MapaDinamico {

    initMap(){
        var pos = {lat: 40.203056, lng: -8.381667};
        var mapa = new google.maps.Map(document.querySelector('main'),{zoom: 8, center:pos});
        var marcador = new google.maps.Marker({position:pos, map:mapa});
    }

}

var mapa = new MapaDinamico();