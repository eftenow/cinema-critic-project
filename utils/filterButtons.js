import { PAGE_SIZE, getAllMovies, getAllSeries, getMoviesAndSeries, getMoviesCount, getSeriesCount } from "../src/services/itemServices.js";
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


  export async function filterMovies(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);
    let promises = Promise.all([getAllMovies(currentPage, PAGE_SIZE), getMoviesCount(currentPage, PAGE_SIZE)]);
    let [moviesToShow, matchesFound] = await promises;
    const pagesCount = Math.ceil(matchesFound / PAGE_SIZE);
    const matches = moviesTemplate(moviesToShow, ctx, currentPage, pagesCount);
    ctx.render(matches);
  }

  export async function filterSeries(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);
    let promises = Promise.all([getAllSeries(currentPage, PAGE_SIZE), getSeriesCount(currentPage, PAGE_SIZE)]);
    let [seriesToShow, matchesFound] = await promises;
    const pagesCount = Math.ceil(matchesFound / PAGE_SIZE);
    const matches = moviesTemplate(seriesToShow, ctx, currentPage, pagesCount);
    ctx.render(matches);
  }