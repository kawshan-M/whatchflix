const apiKey = '8af35d2b86bd21843cff860c18d30657';
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        const moviesList = document.getElementById("movies-list");

        movies.forEach(movie => {
            const listItem = document.createElement("li");
            const title = document.createElement("h2");
            const genre = document.createElement("p");
            const thumbnail = document.createElement("img");
            const imdbId = document.createElement("p");
            //const image = document.createElement("img");
            const description = document.createElement("p");

            title.innerText = movie.title;
            genre.innerText = movie.genre_ids.join(", ");
            thumbnail.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            thumbnail.alt = movie.title + " thumbnail";
            imdbId.innerText = `IMDb ID: ${movie.id}`;
            //image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            //image.alt = movie.title + " image";
            description.innerText = movie.overview;

            listItem.appendChild(title);
            listItem.appendChild(genre);
            listItem.appendChild(thumbnail);
            listItem.appendChild(imdbId);
            //listItem.appendChild(image);
            listItem.appendChild(description);
            moviesList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error(error);
    });