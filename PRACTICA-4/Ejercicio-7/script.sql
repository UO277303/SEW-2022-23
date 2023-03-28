
CREATE TABLE IF NOT EXISTS Director (
    id_dir INT NOT NULL,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    sexo VARCHAR(10) CHECK (sexo IN ('Masculino', 'Femenino')),
    añoNacimiento INT,
    productor VARCHAR(2) CHECK (productor IN ('Si', 'No')),
    guionista VARCHAR(2) CHECK (guionista IN ('Si', 'No')),
    PRIMARY KEY (id_dir)
);

CREATE TABLE IF NOT EXISTS Genero (
    id_gen INT NOT NULL,
    nombre VARCHAR(30),
    PRIMARY KEY (id_gen)
);

CREATE TABLE IF NOT EXISTS Pelicula (
    id_peli INT NOT NULL,
    titulo VARCHAR(30),
    duracion INT CHECK (duracion > 0),
    añoEstreno INT,
    puntuacion INT CHECK (puntuacion BETWEEN 0 AND 10),
    id_dir INT NOT NULL,
    FOREIGN KEY (id_dir) REFERENCES Director (id_dir),
    id_gen INT NOT NULL,
    FOREIGN KEY (id_gen) REFERENCES Genero (id_gen),
    PRIMARY KEY (id_peli)
);

CREATE TABLE IF NOT EXISTS Actor (
    id_act INT NOT NULL,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    sexo VARCHAR(10),
    añoNacimiento INT,
    añoInicio INT CHECK (añoNacimiento < añoInicio),
    nacionalidad VARCHAR(30),
    PRIMARY KEY (id_act)
);

CREATE TABLE IF NOT EXISTS Personaje (
    id_per INT NOT NULL,
    nombre VARCHAR(30),
    protagonista VARCHAR(2) CHECK (protagonista IN ('Si', 'No')),
    id_peli INT NOT NULL,
    FOREIGN KEY (id_peli) REFERENCES Pelicula (id_peli),
    id_act INT NOT NULL,
    FOREIGN KEY (id_act) REFERENCES Actor (id_act),
    PRIMARY KEY (id_per)
);



INSERT INTO Director (id_dir, nombre, apellido, sexo, añoNacimiento, productor, guionista) VALUES
(1, 'Andrew', 'Adamson', 'Masculino', 1966, 'Si', 'Si'),
(2, 'Chuck', 'Russel', 'Masculino', 1958, 'Si', 'Si'),
(3, 'Steve', 'Carr', 'Masculino', 1965, 'Si', 'No'),
(4, 'David', 'Leitch', 'Masculino', 1975, 'Si', 'No'),
(5, 'Martin', 'Campbell', 'Masculino', 1944, 'Si', 'No'),
(6, 'Anthony', 'Russo', 'Masculino', 1970, 'Si', 'Si'),
(7, 'Joe', 'Russo', 'Masculino', 1971, 'Si', 'Si'),
(8, 'David', 'Fernández', 'Masculino', 1980, 'No', 'Si');

INSERT INTO Genero (id_gen, nombre) VALUES
(1, 'Animacion'),
(2, 'Fantasia'),
(3, 'Comedia'),
(4, 'Accion'),
(5, 'Drama');

INSERT INTO Pelicula (id_peli, titulo, duracion, añoEstreno, puntuacion, id_dir, id_gen) VALUES
(1, 'Shrek', 92, 2001, 10, 1, 1),
(2, 'Las cronicas de Narnia', 143, 2005, 8, 1, 2),
(3, 'La mascara', 101, 1994, 9, 2, 3),
(4, 'Dr Dolittle 2', 97, 2001, 6, 3, 3),
(5, 'Deadpool 2', 180, 2018, 7, 4, 4),
(6, 'Linterna verde', 123, 2011, 6, 5, 4),
(7, 'Avengers: Endgame', 181, 2019, 8, 7, 4),
(8, 'El soldado de invierno', 136, 2014, 9, 6, 4),
(9, 'Los juegos del hambre', 142, 2012, 7, 4, 4),
(10, 'Frozen', 102, 2013, 6, 5, 1),
(11, 'Frozen', 94, 2010, 4, 8, 5);

INSERT INTO Actor (id_act, nombre, apellido, sexo, añoNacimiento, añoInicio, nacionalidad) VALUES
(1, 'Eddie', 'Murphy', 'Masculino', 1961, 1976, 'Estadounidense'),
(2, 'Cameron', 'Diaz', 'Femenino', 1972, 1990, 'Estadounidense'),
(3, 'James', 'McAvoy', 'Masculino', 1979, 1995, 'Escoces'),
(4, 'Ryan', 'Reynolds', 'Masculino', 1976, 1991, 'Canadiense'),
(5, 'Brad', 'Pitt', 'Masculino', 1963, 1987, 'Estadounidense'),
(6, 'Blake', 'Lively', 'Femenino', 1987, 1998, 'Estadounidense'),
(7, 'Chris', 'Evans', 'Masculino', 1981, 1997, 'Estadounidense'),
(8, 'Chris', 'Hemsworth', 'Masculino', 1983, 2002, 'Australiano'),
(9, 'Liam', 'Hemsworth', 'Masculino', 1990, 2007, 'Australiano'),
(10, 'Jennifer', 'Lawrence', 'Femenino', 1990, 2006, 'Estadounidense'),
(11, 'Shawn', 'Ashmore', 'Masculino', 1979, 1991, 'Canadiense'),
(12, 'Kristen', 'Bell', 'Femenino', 1980, 1992, 'Estadounidense');

INSERT INTO Personaje (id_per, nombre, protagonista, id_peli, id_act) VALUES
(1, 'Asno', 'No', 1, 1),
(2, 'Fiona', 'No', 1, 2),
(3, 'Tina Carlyle', 'No', 3, 2),
(4, 'Dr John Dolittle', 'Si', 4, 1),
(5, 'Sr Tummnus', 'No', 2, 3),
(6, 'Deadpool', 'Si', 5, 4),
(7, 'Vanisher', 'No', 5, 5),
(8, 'Linterna verde', 'Si', 6, 4),
(9, 'Carol Ferris', 'No', 6, 6),
(10, 'Capitán América', 'Si', 8, 7),
(11, 'Thor', 'Si', 7, 8),
(12, 'Capitán América', 'Si', 7, 7),
(13, 'Gale Hawthrone', 'No', 9, 9),
(14, 'Katniss Everdeen', 'Si', 9, 10),
(15, 'Joe Lynch', 'Si', 11, 11),
(16, 'Anna', 'No', 10, 12);