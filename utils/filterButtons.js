import { getAllMovies, getAllSeries, getMoviesAndSeries } from "../src/services/itemServices.js";
import { moviesTemplate } from "../src/views/movies.js";

export function filterHandler(ev) {
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

export async function movieTypeFilter(ev, ctx) {
    ev.preventDefault();
    let moviesToShow;

    const selectedType = ev.target.textContent;
    if (selectedType == 'Movies'){
        moviesToShow = await getAllMovies();
    } else if (selectedType == 'Series') {
        moviesToShow = await getAllSeries();
    } else{
        moviesToShow = await getMoviesAndSeries();
        console.log(moviesToShow);
        ctx.render(moviesTemplate(moviesToShow, ctx));
        return;
    }

    let matches = moviesTemplate(moviesToShow.results, ctx);
    ctx.render(matches);
}