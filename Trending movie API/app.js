function getTop100Movies() {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0e61af9a1fmsh78f927fcaf6e406p1182e1jsn34c4749571b9',
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(movies => {
            return movies.map(movie => {
                return {
                    title: movie.title,
                    genre: movie.genre,
                    thumbnail: movie.image,
                    id: movie.id,
                    imdbid: movie.imdbid,
                    rating: movie.rating,
                    image: movie.fullSizeImage,
                    description: movie.description
                };
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function displayMovies() {
    const moviesList = document.getElementById("movies-list");

    getTop100Movies().then(movies => {
        movies.forEach(movie => {
            const listItem = document.createElement("li");
            const title = document.createElement("h2");
            const genre = document.createElement("p");
            const thumbnail = document.createElement("img");
            const imdbLink = document.createElement("a");
            const image = document.createElement("img");
            const rating = document.createElement("p");
            const imdbid = document.createElement("p");
            const description = document.createElement("p");

            title.innerText = movie.title;
            genre.innerText = movie.genre;
            thumbnail.src = movie.thumbnail;
            thumbnail.alt = movie.title + " thumbnail";
            imdbLink.href = "https://www.imdb.com/title/" + movie.id;
            imdbLink.target = "_blank";
            imdbid.innerText = "IMDb ID: " + movie.imdbid;
            rating.innerText = "Rating: " + movie.rating;
            //image.src = movie.image;
            //image.alt = movie.title + " image";
            description.innerText = movie.description;

            listItem.appendChild(title);
            listItem.appendChild(genre);
            listItem.appendChild(thumbnail);
            listItem.appendChild(imdbid);
            listItem.appendChild(rating);
            listItem.appendChild(image);
            listItem.appendChild(description);
            moviesList.appendChild(listItem);
        });
    });
}

displayMovies();