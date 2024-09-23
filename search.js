document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const selectedGenre = document.getElementById('genre-dropdown').value.toLowerCase();
    const movies = document.querySelectorAll('.movie');

    movies.forEach(movie => {
        const title = movie.getAttribute('data-title').toLowerCase();
        const genre = movie.getAttribute('data-genre').toLowerCase();

        // Check if the movie matches the search term AND the selected genre
        const matchesSearch = title.includes(searchTerm);
        const matchesGenre = selectedGenre === 'all' || genre === selectedGenre;

        if (matchesSearch && matchesGenre) {
            movie.style.display = 'block';  // Show the movie if it matches the criteria
        } else {
            movie.style.display = 'none';   // Hide the movie if it doesn't match
        }
    });
});
