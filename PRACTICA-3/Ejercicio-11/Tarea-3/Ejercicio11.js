/* Ejercicio11.js */

"use strict"

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(posicion){
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;      
    }

    getMapaEstatico(){
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var apiKey = "&key=AIzaSyDeHrSfqHSvLB0BdJk8pnlIHeZed69XrUc";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";
        
        this.mapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        $('main input').remove();
        $('main').html('<img src="' + this.mapa + '" alt="Mapa estático" />');
        $('main').before('<h1>Mapa estático con la ubicación actual</h1>');
    }

}

var geo = new GeoLocalizacion();