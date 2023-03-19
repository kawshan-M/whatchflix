const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0e61af9a1fmsh78f927fcaf6e406p1182e1jsn34c4749571b9',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultContainer = document.getElementById('result-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') {
        resultContainer.innerText = 'Please enter a search term';
        return;
    }

    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // Clear any previous results
            resultContainer.innerHTML = '';

            // Loop through the results and create a card for each movie
            data.d.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('movie-card');

                const title = document.createElement('h2');
                title.innerText = movie.l;

                const poster = document.createElement('img');
                poster.src = movie.i.imageUrl;
                poster.alt = `${movie.l} poster`;

                card.appendChild(title);
                card.appendChild(poster);
                resultContainer.appendChild(card);
            });

            // If there are no results, display a message
            if (data.d.length === 0) {
                resultContainer.innerText = 'No results found';
            }
        })
        .catch(error => {
            console.error(error);
            resultContainer.innerText = 'An error occurred while fetching results';
        });
});