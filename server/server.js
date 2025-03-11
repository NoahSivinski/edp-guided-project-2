import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// PostgreSQL pool configuration

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetsCollection = process.env.MONGO_DB_COLLECTION_PLANETS;
const filmsCollection = process.env.MONGO_DB_COLLECTION_FILMS;
const charactersCollection = process.env.MONGO_DB_COLLECTION_CHARACTERS;
const filmsCharactersCollection = process.env.MONGO_DB_COLLECTION_FILMS_CHARACTERS;
const filmsPlanetsCollection = process.env.MONGO_DB_COLLECTION_FILMS_PLANETS;

const app = express();
app.use(cors());
app.use(express.json())
const PORT = 3000;

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsCollection);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No planets for you! ☹");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const characters = await collection.find({"id": +id}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsCollection);
        const films = await collection.find({"id": +id}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsCollection);
        const planets = await collection.find({"id": +id}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No planets for you! ☹");
    }
});

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const filmCharactersCollection = db.collection(filmsCharactersCollection);
        const characterCollection = db.collection(charactersCollection);
        const filmCharacters = await filmCharactersCollection.find({"film_id": +id}).toArray();
        const characterIds = filmCharacters.map(fc => fc.character_id);
        const characters = await characterCollection.find({"id": {$in: characterIds}}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const filmPlanetsCollection = db.collection(filmsPlanetsCollection);
        const planetCollection = db.collection(planetsCollection);
        const filmPlanets = await filmPlanetsCollection.find({"film_id": +id}).toArray();
        const planetIds = filmPlanets.map(planet => planet.planet_id);
        const planets = await planetCollection.find({"id": {$in: planetIds}}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No planets for you! ☹");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const characterFilmsCollection = db.collection(filmsCharactersCollection);
        const filmCollection = db.collection(filmsCollection);
        const characterFilms = await characterFilmsCollection.find({"character_id": +id}).toArray();
        const filmIds = characterFilms.map(film => film.film_id);
        const films = await filmCollection.find({"id": {$in: filmIds}}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const planetFilmsCollection = db.collection(filmsPlanetsCollection);
        const filmCollection = db.collection(filmsCollection);
        const planetFilms = await planetFilmsCollection.find({"planet_id": +id}).toArray();
        const filmIds = planetFilms.map(film => film.film_id);
        const films = await filmCollection.find({"id": {$in: filmIds}}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No films for you! ☹");
    }
});

app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const { id } = req.params;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersCollection);
        const characters = await collection.find({"homeworld": +id}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No characters for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});