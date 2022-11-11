# xml2html.py
# -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

archivoKML = open("redSocial.kml", "w", encoding="utf-8")

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

    # Nodo raíz: nacimiento
    archivoKML.write("\n<Placemark>\n\t<name>Nacimiento: "+raiz.get('nombre')+" "
        +raiz.get('apellidos')+"</name>")
    archivoKML.write("\n\t<description>"+raiz[0][1].text+"</description>")
    archivoKML.write("\n\t<Point>\n\t\t<coordinates>")
    archivoKML.write(raiz[0][2][0].text+","+raiz[0][2][1].text+","+
        raiz[0][2][2].text+"</coordinates>\n\t</Point>\n</Placemark>")
    # Nodo raíz: residencia
    archivoKML.write("\n<Placemark>\n\t<name>Residencia: "+raiz.get('nombre')+" "
        +raiz.get('apellidos')+"</name>")
    archivoKML.write("\n\t<description>"+raiz[0][3].text+"</description>")
    archivoKML.write("\n\t<Point>\n\t\t<coordinates>")
    archivoKML.write(raiz[0][4][0].text+","+raiz[0][4][1].text+","+
        raiz[0][4][2].text+"</coordinates>\n\t</Point>\n</Placemark>")


    # Cada uno de los hijos
    for hijo in raiz.findall('.//{http://tempuri.org/redSocial}persona'):
        # Nacimiento
        archivoKML.write("\n<Placemark>\n\t<name>Nacimiento: "+hijo.get('nombre')+" "
            +hijo.get('apellidos')+"</name>")
        archivoKML.write("\n\t<description>"+hijo[0][1].text+"</description>")
        archivoKML.write("\n\t<Point>\n\t\t<coordinates>")
        archivoKML.write(hijo[0][2][0].text+","+hijo[0][2][1].text+","+
            hijo[0][2][2].text+"</coordinates>\n\t</Point>\n</Placemark>")
        # Residencia
        archivoKML.write("\n<Placemark>\n\t<name>Residencia: "+hijo.get('nombre')+" "
            +hijo.get('apellidos')+"</name>")
        archivoKML.write("\n\t<description>"+hijo[0][3].text+"</description>")
        archivoKML.write("\n\t<Point>\n\t\t<coordinates>")
        archivoKML.write(hijo[0][4][0].text+","+hijo[0][4][1].text+","+
            hijo[0][4][2].text+"</coordinates>\n\t</Point>\n</Placemark>")

    archivoKML.write('\n</Document>\n</kml>')


def prepararKML():
    archivoKML.write('''<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<name>Red Social: Coordenadas</name>''')

def main():

    prepararKML()

    leerXML()

    archivoKML.close()

if __name__ == "__main__":
    main()
