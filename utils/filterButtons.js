export function genreHandler(ev) {
    ev.preventDefault();
    const selectedCategory = ev.target.textContent;
    const movies = document.querySelectorAll('.movie-card');
    movies.forEach(movie => {
        const currentMovieCategory = movie.dataset.category
        if (currentMovieCategory.includes(selectedCategory) || selectedCategory === 'All Genres') {
            movie.style.display = 'flex';
        } else {
            movie.style.display = 'none';
        }
    })
}