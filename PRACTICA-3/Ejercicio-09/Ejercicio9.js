/* Ejercicio9.js */

class Tiempo {

    constructor() {
        this.ciudad = '';
        this.apikey = '8dde43a772823554c3eb207b2615158a';
    }

    cargar(ciudad) {
        this.ciudad = ciudad;

        if (this.ciudad != '') {
            var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.ciudad + 
                '&mode=xml&lang=es&units=metric&APPID=' + this.apikey;
            $.ajax({
                dataType: 'xml',
                url: url,
                method: 'GET',
                success: function(datos) {
                    $('main section h2').text('Datos');
                    $('main section p').remove();
                    $('main aside img').remove();

                    $('main section h2').text('Datos de ' + $('city',datos).attr("name"));

                    var minutosZonaHoraria = new Date().getTimezoneOffset();
                    var amanecer = $('sun',datos).attr("rise");
                    var amanecerMiliSeg1970 = Date.parse(amanecer);
                    amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970 = Date.parse(oscurecer);
                    oscurecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerLocal = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var horaMedida = $('lastupdate',datos).attr("value");
                    var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;

                    $('section :last-child()').after('<p>País: ' + $('country',datos).text() +'</p>');
                    $('section :last-child()').after('<p>Latitud: ' + $('coord',datos).attr("lat") +'</p>');
                    $('section :last-child()').after('<p>Longitud: ' + $('coord',datos).attr("lon") +'</p>');
                    $('section :last-child()').after('<p>Tiempo: ' + $('weather',datos).attr("value") +'</p>');
                    $('section :last-child()').after('<p>Temperatura: ' + $('temperature',datos).attr("value") 
                        + ' ' + $('temperature',datos).attr("unit") + '</p>');
                    $('section :last-child()').after('<p>Tª máxima: ' + $('temperature',datos).attr("max") 
                        + ' ' + $('temperature',datos).attr("unit") + '</p>');
                    $('section :last-child()').after('<p>Tª mínima: ' + $('temperature',datos).attr("min") 
                        + ' ' + $('temperature',datos).attr("unit") + '</p>');
                    $('section :last-child()').after('<p>Presión: ' + $('pressure',datos).attr("value") 
                        + ' ' + $('pressure',datos).attr("unit") +'</p>');
                    $('section :last-child()').after('<p>Humedad: ' + $('humidity',datos).attr("value") 
                        + $('humidity',datos).attr("unit") +'</p>');
                    $('section :last-child()').after('<p>Velocidad del viento: ' + $('speed',datos).attr("value") +'m/s</p>');
                    $('section :last-child()').after('<p>Nombre del viento: ' + $('speed',datos).attr("name") +'</p>');
                    $('section :last-child()').after('<p>Código del viento: ' + $('direction',datos).attr("code") +'</p>');
                    $('section :last-child()').after('<p>Dirección del viento: ' + $('direction',datos).attr("value") +'</p>');
                    $('section :last-child()').after('<p>Nombre de la dirección del viento: ' + $('direction',datos).attr("name") +'</p>');
                    $('section :last-child()').after('<p>Visibilidad: ' + $('visibility',datos).attr("value") +'</p>');
                    $('section :last-child()').after('<p>Nubosidad: ' + $('clouds',datos).attr("value") +'</p>');
                    $('section :last-child()').after('<p>Nombre nubosidad: ' + $('clouds',datos).attr("name") +'</p>');
                    $('section :last-child()').after('<p>Precipitación: ' + $('precipitation',datos).attr("value") +'</p>');
                    $('section :last-child()').after('<p>Modo precipitación: ' + $('precipitation',datos).attr("mode") +'</p>');
                    $('section :last-child()').after('<p>Hora amanecer: ' + amanecerLocal +'</p>');
                    $('section :last-child()').after('<p>Hora atardecer: ' + oscurecerLocal +'</p>');
                    $('section :last-child()').after('<p>Hora de la medida: ' 
                        + (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES") +'</p>');
                    $('section :last-child()').after('<p>Fecha de la medida: ' 
                        + (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES") +'</p>');
                
                    $('aside h2').after('<img src=https://openweathermap.org/img/w/' + $('weather',datos).attr("icon") + '.png />');
                },
                error: function() {
                    $('main section h2').text('Datos');
                    $('main section p').remove();
                    $('main aside img').remove();
            
                    $('section h2').after('<p>No ha sido posible obtener los datos</p>');
                }
            });
        }

    }

}

var tiempo = new Tiempo();