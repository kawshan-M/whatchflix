document.addEventListener('DOMContentLoaded', function() {

     // Get a reference to the game-section container
     const section = document.querySelector('.top100-section');

     // Create a new item element and set its background image
    const titleName = document.createElement('h2');
    titleName.classList.add('line-title');
    titleName.textContent = 'Top100 movies';

     section.appendChild(titleName);

    // Get a reference to the carousel container
    const carousel = document.querySelector('.top100-carousel');

    const apiKey = '8af35d2b86bd21843cff860c18d30657';
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1&region=US&primary_release_date.gte=2023-03-01&primary_release_date.lte=2023-04-01`;

    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    // Fetch the list of genres
    fetch(genresUrl)
        .then(response => response.json())
        .then(genres => {

            // Create a map of genre IDs to genre names
            const genreMap = {};
            genres.genres.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });

            // Fetch the list of popular movies
            fetch(popularUrl)
                .then(response => response.json())
                .then(movies => {
                    var newItems = [];
                    movies.results.slice(0, 10).forEach(movie => {

                        const movieData = {
                            title: movie.title,
                            genre: movie.genre_ids.map(genreId => genreMap[genreId]).join(', '),
                            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                            rating: movie.vote_average,
                            description: movie.overview
                        };

                        newItems.push(movieData);

                    });

                    // Remove existing items from the carousel
                    while (carousel.firstChild) {
                        carousel.removeChild(carousel.firstChild);
                    }

                    // Loop through the new items and create a new carousel item for each one
                    for (let i = 0; i < newItems.length; i++) {
                        const newItem = newItems[i];

                        // Create a new item element and set its background image
                        const item = document.createElement('div');
                        item.innerHTML = '' // Clear the item container

                        item.classList.add('item');
                        item.style.backgroundImage = `url(${newItem.image})`;

                        // Create a new item description element and set its title and description
                        const itemDesc = document.createElement('div');
                        itemDesc.innerHTML = '' // Clear the itemDesc container
                        itemDesc.classList.add('item-desc');
                        itemDesc.innerHTML = `
                    <h3>${newItem.title}</h3>
                    <p>${newItem.description}</p>
                    <p>Genres: ${newItem.genre}</p>
                    <p>Rating: ${newItem.rating}</p>
                    `;

                        // Append the item description to the item
                        item.appendChild(itemDesc);

                        // Append the new item to the carousel
                        carousel.appendChild(item);

                         // Append the carousel to the section
                        section.appendChild(carousel);
                    }

                    // Initialize the carousel after adding new items
                    $('.top100-carousel').owlCarousel('destroy');
                    $('.top100-carousel').owlCarousel({
                        autoWidth: true,
                        loop: true
                    });

                    $(document).ready(function() {
                        $(".top100-carousel .item").click(function() {
                            $(".top100-carousel .item").not($(this)).removeClass("active");
                            $(this).toggleClass("active");
                        });
                    });

                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);

        });
});