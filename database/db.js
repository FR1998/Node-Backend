const mongoose = require('mongoose');

async function ConnectDB(){ 
  await mongoose.connect('mongodb://localhost:27017/booksCollection')
  .then(() => console.log('Connected!'));
}


module.exports = ConnectDB;



// const { MongoClient } = require('mongodb');

// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);


// const dbName = 'booksCollection';

// async function connect() {
    
//     await client.connect();
    
//     const db = client.db(dbName);
    
  
  
//     return db;
//   }

//   module.exports = connect;