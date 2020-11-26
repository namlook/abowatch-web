import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export default async function () {
  const uri = await mongod.getUri();
  console.log(uri);
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('abowatch');
  return {
    db,
    subscriptions: db.collection('subscriptions'),
  };
}
