const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectMongo() {
  if (db) return db;
  await client.connect();
<<<<<<< HEAD
  db = client.db(process.env.MONGO_DB_NAME || 'campus_eats_feedback');
  console.log(`Connected to MongoDB (${db.databaseName})`);
  return db;
}

async function closeMongo() {
  await client.close();
  db = undefined;
}

module.exports = { connectMongo, closeMongo };
=======
  db = client.db('campus_eats_feedback');
  console.log('Connected to MongoDB (campus_eats_feedback)');
  return db;
}

module.exports = { connectMongo };
>>>>>>> 7e7aab9f0c44566b32bfd8c8f30f8f7c3e7a83a3
