/* Ejercicio11.js */

"use strict"

class MapaDinamico {

    initMap(){
        var pos = {lat: 40.203056, lng: -8.381667};
        var mapa = new google.maps.Map(document.querySelector('main'),{zoom: 8, center: pos, mapTypeId: google.maps.MapTypeId.ROADMAP});
        
        var infoWindow = new google.maps.InfoWindow;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {lat: position.coords.latitude, lng: position.coords.longitude};
                infoWindow.setPosition(pos);
                infoWindow.setContent('Ubicación actual');
                infoWindow.open(mapa);
                mapa.setCenter(pos);
            }, function() {
                infoWindow.setPosition(mapa.getCenter());
                infoWindow.setContent('Error: Fallo de geolocalización');
                infoWindow.open(mapa);
            });
        } else {
            infoWindow.setPosition(mapa.getCenter());
            infoWindow.setContent('Error: El navegador no soporta geolocalización');
            infoWindow.open(mapa);
        }
    }

}

var mapa = new MapaDinamico();