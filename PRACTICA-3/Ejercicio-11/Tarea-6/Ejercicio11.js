/* Ejercicio11.js */

"use strict"

class MapaDinamico {

    constructor () {
        this.transporte = 'DRIVING';
    }

    initMap(){
        var pos = {lat: 40.203056, lng: -8.381667};
        var mapa = new google.maps.Map(document.querySelector('section'),{zoom: 8});
        
        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.open(mapa);
        mapa.setCenter(pos);

        var destino = document.querySelector('input[type="text"]').value;

        var transp = this.transporte;

        if (navigator.geolocation && destino != '') {

            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {lat: position.coords.latitude, lng: position.coords.longitude};

                const dirService = new google.maps.DirectionsService();
                const dirRenderer = new google.maps.DirectionsRenderer();
                dirRenderer.setMap(mapa);
                

                var destinoQuery = {
                    query: destino,
                    fields: ['name','geometry']
                };

                var placeService = new google.maps.places.PlacesService(mapa);

                var destinoCoords = '';

                placeService.findPlaceFromQuery(destinoQuery, function(result, status) {
                    destinoCoords = {lat: result[0].geometry.location.lat(), lng: result[0].geometry.location.lng()};
                    console.log(destinoCoords);
                    const ruta = {
                        origin: new google.maps.LatLng(pos.lat, pos.lng),
                        destination: new google.maps.LatLng(destinoCoords.lat, destinoCoords.lng),
                        travelMode: transp
                    };

                    dirService.route(ruta, response => {
                        dirRenderer.setDirections(response);
                    });
                });

                

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

    setTransporte(num) {
        switch (num) {
            case 1:
                this.transporte = 'DRIVING';
                break;
            case 2:
                this.transporte = 'BICYCLING';
                break;
            case 3:
                this.transporte = 'TRANSIT';
                break;
            case 4:
                this.transporte = 'WALKING';
                break;
        }
    }

}

var mapa = new MapaDinamico();