document.addEventListener('DOMContentLoaded', function() {

const apiKey = '8af35d2b86bd21843cff860c18d30657';
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

   // Get a reference to the carousel container
   const carousel = document.querySelector('.trending-carousel');

Promise.all([fetch(trendingUrl), fetch(genresUrl)])
    .then(([trendingResponse, genresResponse]) => Promise.all([trendingResponse.json(), genresResponse.json()]))
    .then(([trendingData, genresData]) => {
        const movies = trendingData.results;
        const genres = genresData.genres;

        var newItems = [];
        movies.slice(0, 10).forEach(movie => {

            const movieData = {
                title: movie.title,
                genre: movie.genre_ids.map(genreId => genres.find(genre => genre.id === genreId).name).join(", "),
                image: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                //rating: movie.rating,
                description: movie.overview
              };
        
              newItems.push(movieData);

        });

        while (carousel.firstChild) {
            carousel.removeChild(carousel.firstChild);
        }

        // Loop through the new items and create a new carousel item for each one
        for (let i = 0; i < newItems.length; i++) {
            const newItem = newItems[i];
            

            // Create a new item element and set its background image
            const item = document.createElement('div');
            item.innerHTML ='' // Clear the item container

            item.classList.add('item');
            item.style.backgroundImage = `url(${newItem.image})`;

            // Create a new item description element and set its title and description
            const itemDesc = document.createElement('div');
            itemDesc.innerHTML ='' // Clear the itemDesc container
            itemDesc.classList.add('item-desc');
            itemDesc.innerHTML = `
            <h3>${newItem.title}</h3>
            <p>${newItem.description}</p>
            <p>${newItem.genre}</p>
            //<p>${newItem.rating}</p>
            `;

            // Append the item description to the item
            item.appendChild(itemDesc);

            // Append the new item to the carousel
            carousel.appendChild(item);
        }


        // Initialize the carousel after adding new items
        $('.trending-carousel').owlCarousel('destroy');
        $('.trending-carousel').owlCarousel({
        autoWidth: true,
        loop: true });

        $(document).ready(function () {
        $(".trending-carousel .item").click(function () {
        $(".trending-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
        });
        });

    })


    .catch(error => {
        console.error(error);
    });

});