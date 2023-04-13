import { getAllMovies, getAllSeries } from "../src/services/itemServices.js";
import { moviesTemplate } from "../src/views/movies.js";

export function filterHandler(ev) {
    ev.preventDefault();
    const selectedType = ev.target.textContent.toLowerCase();
    const movies = document.querySelectorAll('.movie-card');
    movies.forEach(movie => {
        const currentMovieType = movie.dataset.type.toLowerCase();
        if (currentMovieType === selectedType || selectedType === 'all') {
            movie.style.display = 'flex';
        } else {
            movie.style.display = 'none';
        }
    })
}

export async function sortHandler(ctx, movies, e) {
   e.preventDefault();
  const sortOrder = e.target.getAttribute('data-id');
  const sortParameter = e.target.id;
  let sortedMovies = [...movies];

  if (sortOrder === "desc") {
    sortedMovies.sort((a, b) => a[sortParameter] - b[sortParameter]);
  } else if (sortOrder === "asc") {
    sortedMovies.sort((a, b) => b[sortParameter] - a[sortParameter]);
  }

  const sortedMoviesTemplate = moviesTemplate(sortedMovies, ctx);
  ctx.render(sortedMoviesTemplate);
}