import { PAGE_SIZE, getAllMovies, getAllSeries, getMovieDetails, getMoviesAndSeries, getMoviesCount, getSeriesCount, getSeriesDetails } from "../src/services/itemServices.js";
import { moviesTemplate } from "../src/views/movies.js";

async function renderFilteredMovies(ctx, selectedCategory, currentPage) {
  const allMovies = await getMoviesAndSeries(currentPage);
  const filteredMovies = allMovies.filter(movie => movie.genres.includes(selectedCategory));

  const pagesCount = Math.ceil(filteredMovies.length / PAGE_SIZE);
  const matches = moviesTemplate(filteredMovies, ctx, currentPage, pagesCount);

  ctx.render(matches);
}

export async function filterHandler(ev, ctx) {
  ev.preventDefault();

  const target = ev.target;
  let category;

  if (target.tagName.toLowerCase() === 'a' && target.classList.contains('menu-item')) {
    category = target.textContent;
  }

  if (category) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);

    const menuItems = document.querySelectorAll('.menu-item');
    const selectedCategory = document.querySelector('.selected-category');
    const isSameCategory = selectedCategory && selectedCategory.textContent === category;

    if (!isSameCategory) {
      menuItems.forEach(item => item.classList.remove('selected-category'));
      target.classList.add('selected-category');
      await renderFilteredMovies(ctx, category, currentPage);
    } else {
      selectedCategory.classList.remove('selected-category');
      await filterMovies(ctx);
    }
  }
};


function setSortSelected(sortOptionId) {
  const sortOptions = document.querySelectorAll('.menu-item');
  sortOptions.forEach(option => option.classList.remove('selected-category'));

  const sortOptionElement = [...sortOptions].find(option => option.getAttribute('data-specific') === sortOptionId);
  console.log(sortOptionElement);
  if (sortOptionElement) {
    sortOptionElement.classList.add('selected-category');
  }
}

export async function sortHandler(ctx, movies, e) {
  e.preventDefault();
  const searchParams = new URLSearchParams(ctx.querystring);
  const currentPage = Number(searchParams.get('page') || 1);
  const sortOrder = e.target.getAttribute('data-id');
  const sortSpecific = e.target.getAttribute('data-specific');
  const sortParameter = e.target.id;
  let sortedMovies = [...movies];
  const pagesCount = Math.ceil(sortedMovies.length / PAGE_SIZE);

  if (sortOrder === "desc") {
    sortedMovies.sort((a, b) => a[sortParameter] - b[sortParameter]);
  } else if (sortOrder === "asc") {
    sortedMovies.sort((a, b) => b[sortParameter] - a[sortParameter]);
  }

  const sortedMoviesTemplate = moviesTemplate(sortedMovies, ctx, currentPage, pagesCount);
  ctx.render(sortedMoviesTemplate);

  
  setSortSelected(sortSpecific);
}


export function setCategorySelected(category) {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => item.classList.remove('selected-category'));

  const categoryElement = Array.from(menuItems).find(item => item.textContent === category);
  if (categoryElement) {
    categoryElement.classList.add('selected-category');
  }
}

export async function filterMovies(ctx) {
  const searchParams = new URLSearchParams(ctx.querystring);
  const currentPage = Number(searchParams.get('page') || 1);
  let promises = Promise.all([getAllMovies(currentPage, PAGE_SIZE), getMoviesCount(currentPage, PAGE_SIZE)]);
  let [moviesToShow, matchesFound] = await promises;
  const pagesCount = Math.ceil(matchesFound / PAGE_SIZE);
  const matches = moviesTemplate(moviesToShow, ctx, currentPage, pagesCount);
  ctx.render(matches);

  setCategorySelected('Movies');
}

export async function filterSeries(ctx) {
  const searchParams = new URLSearchParams(ctx.querystring);
  const currentPage = Number(searchParams.get('page') || 1);
  let promises = Promise.all([getAllSeries(currentPage, PAGE_SIZE), getSeriesCount(currentPage, PAGE_SIZE)]);
  let [seriesToShow, matchesFound] = await promises;
  const pagesCount = Math.ceil(matchesFound / PAGE_SIZE);
  const matches = moviesTemplate(seriesToShow, ctx, currentPage, pagesCount);
  ctx.render(matches);

  setCategorySelected('Series');
};