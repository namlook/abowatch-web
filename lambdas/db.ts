import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
// import { MongoMemoryServer } from 'mongodb-memory-server';

const DB_USER_NAME = process.env.ABOWATCH_DB_USER_NAME;
const DB_USER_PASSWORD = process.env.ABOWATCH_DB_USER_PASSWORD;
const DB_HOST = process.env.ABOWATCH_DB_HOST;
const DB_NAME = process.env.ABOWATCH_DB_NAME;

const uri = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

export default async function () {
  // const mongod = new MongoMemoryServer();
  // const uri = await mongod.getUri();

  console.log(uri);
  const client = new MongoClient(uri, { useNewUrlParser: true });
  await client.connect();
  const db = client.db('abowatch');
  return {
    db,
    subscriptions: db.collection('subscriptions'),
  };
}
