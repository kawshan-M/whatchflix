const apiKey = '8af35d2b86bd21843cff860c18d30657';
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

Promise.all([fetch(trendingUrl), fetch(genresUrl)])
    .then(([trendingResponse, genresResponse]) => Promise.all([trendingResponse.json(), genresResponse.json()]))
    .then(([trendingData, genresData]) => {
        const movies = trendingData.results;
        const genres = genresData.genres;
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
            genre.innerText = movie.genre_ids.map(genreId => genres.find(genre => genre.id === genreId).name).join(", ");
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