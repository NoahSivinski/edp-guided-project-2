import express from 'express';
import { promises as fs } from 'fs';
import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();

// PostgreSQL pool configuration

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
app.use(express.json())
const PORT = 3000;

//Endpoint to read and send JSON file content
app.get('/socks', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const socks = await collection.find({}).toArray();
        res.json(socks);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... No socks for you! ☹");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});