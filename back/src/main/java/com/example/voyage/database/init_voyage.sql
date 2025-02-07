-- 1️⃣ Nettoyer les anciennes données (supprime les données existantes)


DELETE FROM trips;
-- Supprimer les photos existantes
DELETE FROM photos;

-- Supprimer les trajets existants
DELETE FROM routes;

-- Supprimer les lieux existants
DELETE FROM places;

-- Supprimer les jours du voyage existants
DELETE FROM trip_days;

TRUNCATE places, routes, trips RESTART IDENTITY CASCADE;

-- 2️⃣ Créer les tables nécessaires

-- -- Table pour stocker les informations sur les voyages
-- CREATE TABLE trips (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     start_date DATE,
--     end_date DATE
-- );

-- -- Table pour stocker les jours du voyage
-- CREATE TABLE trip_days (
--     id SERIAL PRIMARY KEY,
--     trip_id INT REFERENCES trips(id) ON DELETE CASCADE,
--     day_number INT NOT NULL,
--     date DATE NOT NULL
-- );

-- -- Table pour stocker les informations sur les lieux (points d'intérêt)
-- CREATE TABLE places (
--     id SERIAL PRIMARY KEY,
--     trip_day_id INT REFERENCES trip_days(id) ON DELETE CASCADE,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     type VARCHAR(50), -- 'museum', 'viewpoint', etc.
--     arrival_time TIME,
--     departure_time TIME,
--     location GEOGRAPHY(Point, 4326) -- Utilisation de PostGIS pour les coordonnées géographiques
-- );

-- -- Table pour stocker les trajets entre les lieux
-- CREATE TABLE routes (
--     id SERIAL PRIMARY KEY,
--     trip_day_id INT REFERENCES trip_days(id) ON DELETE CASCADE,
--     from_place_id INT REFERENCES places(id) ON DELETE CASCADE,
--     to_place_id INT REFERENCES places(id) ON DELETE CASCADE,
--     travel_mode VARCHAR(50), -- 'walking', 'car', etc.
--     distance_km DECIMAL(5,2), -- Distance en kilomètres
--     duration_minutes INT, -- Durée en minutes
--     path GEOGRAPHY(LineString, 4326) -- Utilisation de PostGIS pour le tracé
-- );

-- -- Table pour stocker les photos des lieux
-- CREATE TABLE photos (
--     id SERIAL PRIMARY KEY,
--     place_id INT REFERENCES places(id) ON DELETE CASCADE,
--     url VARCHAR(255) NOT NULL
-- );

-- 3️⃣ Ajouter des données dans les tables

-- Ajouter le voyage "Road Trip en Italie"
INSERT INTO trips (name, description, start_date, end_date) 
VALUES 
('Road Trip en Italie', 'Un road trip de 4 jours en Italie avec des visites des principales villes et attractions', '2025-06-01', '2025-06-04');

-- Ajouter les jours du voyage
INSERT INTO trip_days (trip_id, day_number, date) 
VALUES 
(1, 1, '2025-06-01'),
(1, 2, '2025-06-02'),
(1, 3, '2025-06-03'),
(1, 4, '2025-06-04');

-- Ajouter les lieux pour chaque jour

-- Jour 1 : Rome
INSERT INTO places (trip_day_id, name, description, type, arrival_time, departure_time, location) 
VALUES 
(1, 'Colisée', 'Ancien amphithéâtre romain.', 'museum', '09:00', '10:30', ST_GeogFromText('POINT(12.4924 41.8902)')),
(1, 'Forum Romain', 'Ruines antiques de Rome.', 'museum', '10:45', '12:00', ST_GeogFromText('POINT(12.4853 41.8925)')),
(1, 'Fontaine de Trevi', 'Fontaine baroque célèbre.', 'viewpoint', '12:15', '12:45', ST_GeogFromText('POINT(12.4833 41.9009)')),

-- Jour 2 : Florence
(2, 'Cathédrale Santa Maria del Fiore', 'Cathédrale emblématique de Florence.', 'museum', '10:00', '11:30', ST_GeogFromText('POINT(11.2558 43.7734)')),
(2, 'Piazza della Signoria', 'Place centrale de Florence.', 'viewpoint', '11:45', '12:30', ST_GeogFromText('POINT(11.2550 43.7696)')),
(2, 'Ponte Vecchio', 'Pont médiéval avec des boutiques.', 'viewpoint', '12:45', '13:15', ST_GeogFromText('POINT(11.2531 43.7687)')),

-- Jour 3 : Venise
(3, 'Place Saint-Marc', 'Place principale de Venise.', 'viewpoint', '09:00', '10:00', ST_GeogFromText('POINT(12.3370 45.4342)')),
(3, 'Basilique Saint-Marc', 'Église célèbre de Venise.', 'museum', '10:15', '11:15', ST_GeogFromText('POINT(12.3363 45.4344)')),
(3, 'Pont des Soupirs', 'Pont historique reliant le palais des Doges.', 'viewpoint', '11:30', '12:00', ST_GeogFromText('POINT(12.3401 45.4339)')),

-- Jour 4 : Milan
(4, 'Cathédrale de Milan', 'Grande cathédrale gothique de Milan.', 'museum', '10:00', '11:30', ST_GeogFromText('POINT(9.1919 45.4641)')),
(4, 'Théâtre de La Scala', 'Théâtre d’opéra célèbre.', 'museum', '11:45', '12:30', ST_GeogFromText('POINT(9.1889 45.4660)')),
(4, 'Galerie Vittorio Emanuele II', 'Centre commercial historique.', 'viewpoint', '12:45', '13:15', ST_GeogFromText('POINT(9.1934 45.4644)'));

-- Ajouter les trajets entre les lieux (en marche à pied)

-- Jour 1 : Rome
INSERT INTO routes (trip_day_id, from_place_id, to_place_id, travel_mode, distance_km, duration_minutes, path) 
VALUES
(1, 1, 2, 'walking', 0.5, 10, ST_GeogFromText('LINESTRING(12.4924 41.8902, 12.4853 41.8925)')),
(1, 2, 3, 'walking', 1.0, 15, ST_GeogFromText('LINESTRING(12.4853 41.8925, 12.4833 41.9009)')),

-- Jour 2 : Florence
(2, 4, 5, 'walking', 0.4, 5, ST_GeogFromText('LINESTRING(11.2558 43.7734, 11.2550 43.7696)')),
(2, 5, 6, 'walking', 0.3, 5, ST_GeogFromText('LINESTRING(11.2550 43.7696, 11.2531 43.7687)')),

-- Jour 3 : Venise
(3, 7, 8, 'walking', 0.2, 5, ST_GeogFromText('LINESTRING(12.3370 45.4342, 12.3363 45.4344)')),
(3, 8, 9, 'walking', 0.4, 10, ST_GeogFromText('LINESTRING(12.3363 45.4344, 12.3401 45.4339)')),

-- Jour 4 : Milan
(4, 10, 11, 'walking', 0.5, 10, ST_GeogFromText('LINESTRING(9.1919 45.4641, 9.1889 45.4660)')),
(4, 11, 12, 'walking', 0.6, 10, ST_GeogFromText('LINESTRING(9.1889 45.4660, 9.1934 45.4644)'));

-- Ajouter les photos pour chaque lieu
INSERT INTO photos (place_id, url) 
VALUES
(1, 'https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg'),
(2, 'https://upload.wikimedia.org/wikipedia/commons/8/84/Roman_forum_cropped.jpg'),
(3, 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Trevi_Fountain_Rome_Italy.jpg'),
(4, 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Santa_Maria_del_Fiore.jpg'),
(5, 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Piazza_della_Signoria_-_Firenze.jpg'),
(6, 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Ponte_Vecchio_-_Firenze.jpg'),
(7, 'https://upload.wikimedia.org/wikipedia/commons/5/5e/StMark%27s_Square_Venice.jpg'),
(8, 'https://upload.wikimedia.org/wikipedia/commons/9/94/Saint_Mark%27s_Basilica.jpg'),
(9, 'https://upload.wikimedia.org/wikipedia/commons/1/12/Bridge_of_Sighs_Venice.jpg'),
(10, 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Milan_Cathedral_-_Duomo_di_Milano.jpg'),
(11, 'https://upload.wikimedia.org/wikipedia/commons/1/10/La_Scala_Milano_01.jpg'),
(12, 'https://upload.wikimedia.org/wikipedia/commons/9/92/Galleria_Vittorio_Emanuele_II_-_Milan.jpg');
