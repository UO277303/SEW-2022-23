/* Ejercicio14.js */

class Reproductor {

    constructor() {
        this.idVideo = 0;
        this.videoCargado = false;
    }

    cargarVideo(archivos) {
        var video = archivos[0];
        const nombre = video.name;
        if (nombre.includes('MiMoto')) {
            this.idVideo = 1;
        } else if (nombre.includes('Feliz')) {
            this.idVideo = 2;
        } else if (nombre.includes('Cigalo')) {
            this.idVideo = 3;
        }
        
        var sect = document.querySelector('section');
        sect.innerHTML = '<h2>Vídeo ' + nombre + ' cargado correctamente</h2>';
        sect.innerHTML += '<video controls > <source src="' + nombre + '"></video>';
        this.videoCargado = true;
    }

    dropHandler(event) {
        event.preventDefault();
        var archivos = event.dataTransfer.files;
        this.cargarVideo(archivos);
    }

    dragOverHandler(event) {
        event.preventDefault();
    }

    subtitulos() {
        if (this.videoCargado) {
            let video = document.querySelector('video');
            let track = video.addTextTrack('subtitles', 'subtitulos', 'es');
            track.mode = 'showing';

            switch(this.idVideo) {
                case 1:
                    track.addCue(new VTTCue(0.5, 2.73, 'Ven perico, que te digo un secretito'));
                    track.addCue(new VTTCue(3.7, 4.35, 'Cuéntemelo'));
                    track.addCue(new VTTCue(4.5, 7.3, 'Mi moto no hace BIP, mi moto hace'));
                    track.addCue(new VTTCue(7.8, 9.1, 'BRRRRRRRRRRRRR'));
                    track.addCue(new VTTCue(10.0, 12.06, "Y e' la mejó' que hay, ¿te entera' peluca?"));
                    track.addCue(new VTTCue(13.14, 17.9, '*se pone a cantar*'));
                    break;
                case 2:
                    track.addCue(new VTTCue(0.2, 0.7, 'A mí'));
                    track.addCue(new VTTCue(0.71, 2.59, 'A mí ya me da igual todo'));
                    track.addCue(new VTTCue(3.75, 5.85, 'Yo pensaba ser feliz y ya está'));
                    track.addCue(new VTTCue(6.01, 7.57, 'Me da igual todo'));
                    track.addCue(new VTTCue(8.1, 9.0, '*no se le entiende nada*'));
                    track.addCue(new VTTCue(9.01, 10.8, '...me da igual la gente, que me da igual todo'));
                    break;
                case 3:
                    track.addCue(new VTTCue(6.29, 8.49, "Había niños y he tirao' el cigarro"));
                    track.addCue(new VTTCue(8.85, 11.29, '(De fondo) ¡Ostlas! ¡Un cigalo!'));
                    track.addCue(new VTTCue(11.3, 12.83, '*risas*'));
                    track.addCue(new VTTCue(12.91, 14.23, '(De fondo) ¡Un cigalo!'));
                    track.addCue(new VTTCue(14.33, 15.89, '*gritos de niños de fondo*'));
                    break;
            }
        }
    }
}

var rep = new Reproductor();