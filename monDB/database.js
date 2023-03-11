const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Watchflix:3n8BM$*yQUsdajS@cluster0.biflqxw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('Movie');
    const datasets = database.collection('dataset');

    const cursor = datasets.find({});
   // const query = { Sentiment :'positive' }; //movie title we need to search // can put the
    await cursor.forEach(doc => console.log(doc));

    console.log(dataset);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
    
  }
}
run().catch(console.dir);




//This code is only to read the whole dataset

//install npm
//mkdir node_quickstart
//cd node_quickstart
//npm init -y
//npm install mongodb@5.1


