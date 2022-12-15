/* Ejercicio8.js */

class Tiempo {

    constructor() {
        this.ciudad = '';
        this.apikey = '8dde43a772823554c3eb207b2615158a';
    }

    cargar(ciudad) {
        this.ciudad = ciudad;

        if (this.ciudad != '') {
            var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.ciudad + 
                '&lang=es&units=metric&APPID=' + this.apikey;
            $.ajax({
                dataType: 'json',
                url: url,
                method: 'GET',
                success: function(datos) {
                    $('main section h2').text('Datos');
                    $('main section p').remove();
                    $('main aside img').remove();

                    $('main section h2').text('Datos de ' + datos.name);
                    
                    $('section :last-child()').after('<p>País: ' + datos.sys.country +'</p>');
                    $('section :last-child()').after('<p>Latitud: ' + datos.coord.lat +'</p>');
                    $('section :last-child()').after('<p>Longitud: ' + datos.coord.lon +'</p>');
                    $('section :last-child()').after('<p>Tiempo: ' + datos.weather[0].description +'</p>');
                    $('section :last-child()').after('<p>Temperatura: ' + datos.main.temp +'°C</p>');
                    $('section :last-child()').after('<p>Tª máxima: ' + datos.main.temp_max +'°C</p>');
                    $('section :last-child()').after('<p>Tª mínima: ' + datos.main.temp_min +'°C</p>');
                    $('section :last-child()').after('<p>Presión: ' + datos.main.pressure +'</p>');
                    $('section :last-child()').after('<p>Humedad: ' + datos.main.humidity +'%</p>');
                    $('section :last-child()').after('<p>Velocidad del viento: ' + datos.wind.speed +'m/s</p>');
                    $('section :last-child()').after('<p>Dirección del viento: ' + datos.wind.deg +'</p>');
                    $('section :last-child()').after('<p>Visibilidad: ' + datos.visibility +'</p>');
                    $('section :last-child()').after('<p>Nubosidad: ' + datos.clouds.all +'</p>');
                    $('section :last-child()').after('<p>Hora amanecer: ' + new Date(datos.sys.sunrise *1000).toLocaleTimeString() +'</p>');
                    $('section :last-child()').after('<p>Hora atardecer: ' + new Date(datos.sys.sunset *1000).toLocaleTimeString() +'</p>');
                    $('section :last-child()').after('<p>Hora de la medida: ' + new Date(datos.dt *1000).toLocaleTimeString() +'</p>');
                    $('section :last-child()').after('<p>Fecha de la medida: ' + new Date(datos.dt *1000).toLocaleDateString() +'</p>');
                
                    $('aside h2').after('<img src=https://openweathermap.org/img/w/' + datos.weather[0].icon + '.png />');
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