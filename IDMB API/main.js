document.addEventListener('DOMContentLoaded', function() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4676de9fd0msh5215dd81b398aa8p1e790ajsn06dde1ab3541',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');


    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query === '') {
            return;
        }

        // Get a reference to the carousel container
        const carousel = document.querySelector('.search-carousel');

        const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                var newItems = [];
                // Loop through the results and create a card for each movie
                data.d.forEach(movie => {

                    const movieData = {
                        title: movie.l,
                        image: movie.i ? movie.i.imageUrl : '',
                        description: movie.s,
                        genre: movie.id,
                        rating: ''
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
              <p>${newItem.genre}</p>
              <p>${newItem.rating}</p>
              `;

                    // Append the item description to the item
                    item.appendChild(itemDesc);

                    // Append the new item to the carousel
                    carousel.appendChild(item);
                }

                // Initialize the carousel after adding new items
                $('.search-carousel').owlCarousel('destroy');
                $('.search-carousel').owlCarousel({
                    autoWidth: true,
                    loop: true
                });

                $(document).ready(function() {
                    $(".search-carousel .item").click(function() {
                        $(".search-carousel .item").not($(this)).removeClass("active");
                        $(this).toggleClass("active");
                    });
                });
            });
    });


});