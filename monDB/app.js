const express = require('express');
const exphbs  = require('express-handlebars');
const { MongoClient } = require("mongodb");

const app = express();

// Replace the uri string with your connection string.
const uri = "mongodb+srv://Watchflix:P9rVbkZgzRN9Gdj5@cluster0.biflqxw.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Route to display the movies
app.get('/', async (req, res) => {
  try {
    const database = client.db('Movie');
    const datasets = database.collection('dataset');

    const cursor = datasets.find({});
    const movies = [];

    await cursor.forEach(movie => {
      movies.push({
        _id: movie._id,
        imdbId: movie.imdbId,
        Title: movie.Title,
        Genre: movie.Genre,
        Poster: movie.Poster,
        Sentiment: movie.Sentiment
      });
    });

    // Render the movies.handlebars template with the movies data
    res.render('movies', { movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
async function start() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
