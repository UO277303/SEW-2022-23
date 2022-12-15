/* Ejercicio10.js */

class PrecioOro {

    constructor() {
        this.moneda = '';
        this.apikey = '09774704b31e432b1f1dd09e4aaf8f90';
        this.concurrency = 'XAU';
    }

    consultar(moneda) {
        if (moneda != '') {
            this.moneda = moneda;
            var url = 'https://api.metalpriceapi.com/v1/2021-03-24?api_key=' + this.apikey +
                '&base=' + this.moneda + '&currencies=' + this.concurrency;
            
            $.ajax({
                dataType: 'json',
                url: url,
                method: 'GET',
                success: function(datos) {
                    $('p').remove();

                    var xau = Number(datos.rates.XAU);
                    var precio = Number(1 / xau);
                    $('h1').after('<p>Una onza de oro cuesta ' + precio + ' ' + datos.base + '</p>');
                },
                error: function() {
                    $('p').remove();
            
                    $('h1').after('<p>No ha sido posible obtener los datos</p>');
                }
            });
        }
    }

}

var po = new PrecioOro();