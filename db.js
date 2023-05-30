require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;

const client = new MongoClient(url);

const initDatabase = async () => {
    
         await client.connect();
         console.log('Connected to MongoDB server');
         const db = client.db(process.env.DB_NAME);
         return db.collection('agenda');
       
    }

    module.exports = {initDatabase};