# xml2html.py
# -*- coding: utf-8 -*-

import xml.etree.ElementTree as ET

archivoHTML = open("redSocial.html", "w", encoding="utf-8")

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

    # Nodo raíz
    archivoHTML.write("<section>\n\t\t<h2>"+raiz.get('nombre')+" "+
        raiz.get('apellidos')+"</h2>")
    archivoHTML.write("\n\t\t<p>Fecha de nacimiento: "+raiz[0][0].text+"</p>")
    archivoHTML.write("\n\t\t<p>Lugar de nacimiento: "+raiz[0][1].text+"</p>")
    archivoHTML.write("\n\t\t<p>Coordenadas de nacimiento: "+raiz[0][2][0].text+
        " "+raiz[0][2][1].text+" "+raiz[0][2][2].text+"</p>")
    archivoHTML.write("\n\t\t<p>Lugar de residencia: "+raiz[0][3].text+"</p>")
    archivoHTML.write("\n\t\t<p>Coordenadas de residencia: "+raiz[0][4][0].text+
        " "+raiz[0][4][1].text+" "+raiz[0][4][2].text+"</p>")

    for datos in raiz.findall('./{http://tempuri.org/redSocial}foto'):
        archivoHTML.write("\n\t\t<img src=\""+datos.text+"\" alt=\"Foto de "+
            raiz.get('nombre')+"\" />")

    for datos in raiz.findall('./{http://tempuri.org/redSocial}video'):
        archivoHTML.write("\n\t\t<video src=\""+datos.text+"\" controls> </video>")

    for datos in raiz.findall('./{http://tempuri.org/redSocial}comentario'):
        archivoHTML.write("\n\t\t<p>Comentario: "+datos.text+"</p>")

    archivoHTML.write("\n\t</section>")


    # Cada uno de los hijos
    for hijo in raiz.findall('.//{http://tempuri.org/redSocial}persona'):
        archivoHTML.write("\n\t<section>\n\t\t<h2>" + hijo.get('nombre')+" "+
        hijo.get('apellidos') + "</h2>\n\t\t")

        archivoHTML.write("<p>Fecha de nacimiento: "+hijo[0][0].text+"</p>")
        archivoHTML.write("\n\t\t<p>Lugar de nacimiento: "+hijo[0][1].text+"</p>")
        archivoHTML.write("\n\t\t<p>Coordenadas de nacimiento: "+hijo[0][2][0].text+
            " "+hijo[0][2][1].text+" "+hijo[0][2][2].text+"</p>")
        archivoHTML.write("\n\t\t<p>Lugar de residencia: "+hijo[0][3].text+"</p>")
        archivoHTML.write("\n\t\t<p>Coordenadas de residencia: "+hijo[0][4][0].text+
            " "+hijo[0][4][1].text+" "+hijo[0][4][2].text+"</p>")

        for datos in hijo.findall('./{http://tempuri.org/redSocial}foto'):
                archivoHTML.write("\n\t\t<img src=\""+datos.text+"\" alt=\"Foto de "+
                    hijo.get('nombre')+"\" />")

        for datos in hijo.findall('./{http://tempuri.org/redSocial}video'):
            archivoHTML.write("\n\t\t<video src=\""+datos.text+"\" controls> </video>")

        for datos in hijo.findall('./{http://tempuri.org/redSocial}comentario'):
            archivoHTML.write("\n\t\t<p>Comentario: "+datos.text+"</p>")

        archivoHTML.write("\n\t</section>")

    archivoHTML.write('''
</body>
</html>''')


def prepararHTML():
    archivoHTML.write('''<!DOCTYPE HTML>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="author" content="Héctor Lavandeira Fernández" />
    <title>Red social con XML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="estilo.css" />
</head>
<body>
    <h1>Red Social XML</h1>
    ''')

def main():

    prepararHTML()

    leerXML()

    archivoHTML.close()

if __name__ == "__main__":
    main()
