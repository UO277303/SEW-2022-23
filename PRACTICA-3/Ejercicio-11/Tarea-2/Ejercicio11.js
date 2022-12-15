/* Ejercicio11.js */

"use strict"

class GeoLocalizacion {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.getErrores.bind(this));
    }

    getPosicion(posicion){
        this.mensaje = "Petición de geolocalización realizada correctamente";
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;       
    }

    getErrores(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "Petición de geolocalización denegada por el usuario";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "Petición de geolocalización caducada";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
            }
    }

    verDatos() {
        var datos = '<p>' + this.mensaje + '</p>';
        datos += '<p>Longitud: ' + this.longitud + '° </p>';
        datos += '<p>Latitud: ' + this.latitud + '° </p>';
        datos += '<p>Altitud: ' + this.altitud + 'm </p>';
        datos += '<p>Precisión de longitud y latitud: ' + this.precision + 'm </p>';
        datos += '<p>Precisión de altitud: ' + this.precisionAltitud + 'm </p>';
        if (this.rumbo == null) {
            datos += '<p>Rumbo: No se han encontrado datos </p>';
        } else {
            datos += '<p>Rumbo: ' + this.rumbo + '° </p>';
        }
        if (this.velocidad == null) {
            datos += '<p>Velocidad: No se han encontrado datos </p>';
        } else {
            datos += '<p>Velocidad: ' + this.velocidad + 'm/s </p>';
        }

        $('main input').remove();
        $('main h1').after(datos);
    }

}

var geo = new GeoLocalizacion();