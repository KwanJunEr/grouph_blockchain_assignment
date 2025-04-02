// import { MongoClient } from 'mongodb';

// let client;
// let db;

// export async function connectToDatabase() {
//   if (client && db) {
//     return { client, db };
//   }

//   client = new MongoClient(process.env.MONGODB_URI, {  // No `const`
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     ssl: true, 
//     serverSelectionTimeoutMS: 30000,
//   });

//   await client.connect();

//   db = client.db('healthcareblockchain');  // Database name

//   return { client, db };
// }
