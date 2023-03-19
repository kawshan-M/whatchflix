document.addEventListener('DOMContentLoaded', function() {
    
   // Get a reference to the carousel container
   const carousel = document.querySelector('.top100-carousel');

const url = 'https://imdb-top-100-movies.p.rapidapi.com/';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0e61af9a1fmsh78f927fcaf6e406p1182e1jsn34c4749571b9',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};



fetch(url, options)
    .then(response => response.json())
    .then(movies => {
        var newItems = [];
        movies.slice(0, 10).forEach(movie => {

            const movieData = {
                title: movie.title,
                genre: movie.genre,
                image: movie.image,
                rating: movie.rating,
                description: movie.description
              };
        
              newItems.push(movieData);

        });

// Methenta add krnna 

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
            <p>${newItem.rating}</p>
            `;

            // Append the item description to the item
            item.appendChild(itemDesc);

            // Append the new item to the carousel
            carousel.appendChild(item);
        }


        // Initialize the carousel after adding new items
        $('.top100-carousel').owlCarousel('destroy');
        $('.top100-carousel').owlCarousel({
        autoWidth: true,
        loop: true });

        $(document).ready(function () {
        $(".top100-carousel .item").click(function () {
        $(".top100-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
        });
        });

    })

    .catch(error => {
        console.error(error);
    });


    



    });

