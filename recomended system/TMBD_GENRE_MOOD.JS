const fetch = require('node-fetch');

const api_key = "8af35d2b86bd21843cff860c18d30657";

// Define the mood categories based on movie genres
const neutral_genres = [14, 16, 99, 10751, 10752];
const positive_genres = [12, 35, 10749, 10402, 878, 10770, 14];
const negative_genres = [28, 18, 80, 36, 9648, 27, 878, 53, 10752];

// Define a function that makes a TMDb API request and returns a list of movie titles
async function get_movies_by_genre(genres) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&with_genres=${genres.join(",")}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const movie_titles = data.results.map((result) => result.title);
    return movie_titles;
  } else {
    console.error(`Error: ${response.status}`);
    return [];
  }
}

// Define a function that uses machine learning to recommend movies based on mood
async function recommend_movies(mood) {
  let genres;
  if (mood === "neutral") {
    genres = neutral_genres;
  } else if (mood === "positive") {
    genres = positive_genres;
  } else if (mood === "negative") {
    genres = negative_genres;
  } else {
    console.error("Error: Invalid mood");
    return [];
  }
  const movie_titles = await get_movies_by_genre(genres);
  return movie_titles;
}

// Example usage: recommend 10 positive movies
recommend_movies("positive").then((positive_movies) => {
  console.log("Recommended positive movies:");
  for (let i = 0; i < 10; i++) {
    console.log(positive_movies[i]);
  }
}).catch((error) => {
  console.error(error);
});
