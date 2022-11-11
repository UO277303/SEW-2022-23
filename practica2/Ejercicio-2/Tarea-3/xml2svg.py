# xml2html.py
# -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

archivoSVG = open("redSocial.svg", "w", encoding="utf-8")

# Dimensiones de los nodos
ancho = 375
alto = 190
# Espacio entre los textos de un nodo
espacioTexto = 20
# Espacio entre los nodos
espacioRX = 90
espacioRY2 = 550
espacioRY3 = 50
# Posicion del texto respecto al nodo
textoX = 15
textoY = 25
# Espacio entre los textos (mult)
esp1 = 5.75
esp2 = 6.5
esp3 = 7.25

def dibujarLineas(padreX, padreY, level):
    espacio = (espacioRY2 if level==1 else espacioRY3)

    archivoSVG.write('\n\t<polyline points="'+str(padreX+ancho)+','+
        str(padreY+(alto/2))+' '+str(padreX+ancho+espacioRX)+','+
        str(padreY+(alto/2))+' '+str(padreX+ancho+(espacioRX/2))+','+
        str(padreY+(alto/2))+' '+str(padreX+ancho+(espacioRX/2))+','+
        str(padreY+(alto/2)+espacio*2+alto*2)+' '+str(padreX+ancho+espacioRX)+
        ','+str(padreY+alto*2.5+espacio*2)+'" stroke="black" stroke-width="2"'+
        ' fill="none"/>')
    archivoSVG.write('\n\t<line x1="'+str(padreX+ancho+(espacioRX/2))+'" '+
        'y1="'+str(padreY+(alto*1.5)+espacio)+'" x2="'
        +str(padreX+ancho+espacioRX)+'" y2="'+str(padreY+(alto*1.5)+espacio)+
        '" stroke="black" stroke-width="2" />')

def crearRectangulo(posX, posY, level):
    color = "#c3f4f1"
    borde = "#22bfdc"
    if (level==1):
        color = "#d7fccd"
        borde = "#0c761a"
    elif (level==2):
        color = "#d7bef3"
        borde = "#541896"

    archivoSVG.write('\n\t<rect x="'+str(posX)+'" y="'+str(posY)+'" width="'
        +str(ancho)+'" height="'+str(alto)+'" fill="'+color+'" '
        +'stroke-width="4" stroke="'+borde+'"/>')

def escribirDatos(posX, posY, nombre, apellidos, fechaNac, lugarNac, latNac,
        longNac, altNac, lugarRes, latRes, longRes, altRes):
    posTextoX = posX
    posTextoY = posY
    archivoSVG.write('\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'" font-weight="bold">'+nombre+' '+apellidos+'</text>')
    posTextoY += espacioTexto
    archivoSVG.write('\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'">Fecha nacimiento: '+fechaNac+'</text>')
    posTextoY += espacioTexto
    archivoSVG.write('\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'">Lugar nacimiento: '+lugarNac+'</text>')
    posTextoY += espacioTexto
    archivoSVG.write('"\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'">Coordenadas nacimiento: '+latNac+',\n\t'+
        longNac+', '+altNac+'</text>')
    posTextoY += espacioTexto
    archivoSVG.write('\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'">Lugar residencia: '+lugarRes+'</text>')
    posTextoY += espacioTexto
    archivoSVG.write('"\n\t<text x="'+str(posTextoX)+'" y="'
        +str(posTextoY)+'">Coordenadas residencia: '+latRes+',\n\t'+
        longRes+', '+altRes+'</text>')

def escribirDatoEspecifico(posX, posY, etiqueta, valor):
    archivoSVG.write('\n\t<text x="'+str(posX)+'" y="'+str(posY)+'">'
        +etiqueta+': '+valor+'</text>')

def leerXML():

    archivoXML = "redSocial.xml"

    try:
        arbol = ET.parse(archivoXML)

    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()

    # NODO RAÍZ
    nivel1X = 25
    nivel1Y = 25
    crearRectangulo(nivel1X, nivel1Y, 1)
    # texto
    escribirDatos(nivel1X+textoX, nivel1Y+textoY, raiz.get('nombre'),
        raiz.get('apellidos'),raiz[0][0].text, raiz[0][1].text, raiz[0][2][0].text,
            raiz[0][2][1].text, raiz[0][2][2].text, raiz[0][3].text, raiz[0][4][0].text,
            raiz[0][4][1].text, raiz[0][4][2].text)

    for comentario in raiz.findall('{http://tempuri.org/redSocial}comentario'):
        escribirDatoEspecifico(nivel1X+textoX, nivel1Y+textoY*esp1,"Comentario",
            comentario.text)

    for foto in raiz.findall('{http://tempuri.org/redSocial}foto'):
        escribirDatoEspecifico(nivel1X+textoX, nivel1Y+textoY*esp2, "Foto",
            foto.text)

    for video in raiz.findall('{http://tempuri.org/redSocial}video'):
        escribirDatoEspecifico(nivel1X+textoX, nivel1Y+textoY*esp3, "Vídeo",
            video.text)

    # Nodos segundo nivel
    nivel2X = nivel1X + ancho + espacioRX
    nivel2Y = nivel1Y
    for hijo in raiz.findall('{http://tempuri.org/redSocial}persona'):
        crearRectangulo(nivel2X, nivel2Y, 2)
        escribirDatos(nivel2X+textoX, nivel2Y+textoY, hijo.get('nombre'),
            hijo.get('apellidos'), hijo[0][0].text, hijo[0][1].text, hijo[0][2][0].text,
            hijo[0][2][1].text, hijo[0][2][2].text, hijo[0][3].text, hijo[0][4][0].text,
            hijo[0][4][1].text, hijo[0][4][2].text)

        for comentario in hijo.findall('{http://tempuri.org/redSocial}comentario'):
            escribirDatoEspecifico(nivel2X+textoX, nivel2Y+textoY*esp1,"Comentario",
                comentario.text)

        for foto in hijo.findall('{http://tempuri.org/redSocial}foto'):
            escribirDatoEspecifico(nivel2X+textoX, nivel2Y+textoY*esp2, "Foto: ",
                foto.text)

        for video in hijo.findall('{http://tempuri.org/redSocial}video'):
            escribirDatoEspecifico(nivel2X+textoX, nivel2Y+textoY*esp3, "Vídeo: ",
                video.text)

        nivel3X = nivel2X + ancho + espacioRX
        nivel3Y = nivel2Y

        for nieto in hijo.findall('{http://tempuri.org/redSocial}persona'):
            crearRectangulo(nivel3X, nivel3Y, 3)
            escribirDatos(nivel3X+textoX, nivel3Y+textoY, nieto.get('nombre'),
                nieto.get('apellidos'), nieto[0][0].text, nieto[0][1].text,
                nieto[0][2][0].text, nieto[0][2][1].text, nieto[0][2][2].text,
                nieto[0][3].text, nieto[0][4][0].text, nieto[0][4][1].text,
                nieto[0][4][2].text)

            for comentario in nieto.findall('{http://tempuri.org/redSocial}comentario'):
                escribirDatoEspecifico(nivel3X+textoX, nivel3Y+textoY*esp1,"Comentario",
                    comentario.text)

            for foto in nieto.findall('{http://tempuri.org/redSocial}foto'):
                escribirDatoEspecifico(nivel3X+textoX, nivel3Y+textoY*esp2, "Foto: ",
                    foto.text)

            for video in nieto.findall('{http://tempuri.org/redSocial}video'):
                escribirDatoEspecifico(nivel3X+textoX, nivel3Y+textoY*esp3, "Vídeo: ",
                    video.text)

            nivel3Y += alto + espacioRY3

        dibujarLineas(nivel2X, nivel2Y, 2)

        nivel2Y += alto + espacioRY2

        dibujarLineas(nivel1X, nivel1Y, 1)

    archivoSVG.write("\n</svg>")

def prepararSVG():
    archivoSVG.write('''<?xml version="1.0" encoding="UTF-8"?>
<svg width="auto" height="2304" xmlns="http://www.w3.org/2000/svg" version="2.0">
    ''')

def main():

    prepararSVG()

    leerXML()

    archivoSVG.close()

if __name__ == '__main__':
    main()
