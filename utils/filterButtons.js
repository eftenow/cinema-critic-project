import { PAGE_SIZE, getAllContentData, getAllMovies, getAllSeries, getMovieDetails, getMoviesAndSeries, getMoviesCount, getSeriesCount, getSeriesDetails } from "../src/services/itemServices.js";
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
  let validFilter;
  debugger;
  if (target.tagName.toLowerCase() === 'a' && target.classList.contains('menu-item')) {
    validFilter = target.textContent;
    if (ev.target.classList.contains('menu-item-type')){
      const categoryItems = document.querySelectorAll('.menu-item-type');
      categoryItems.forEach(item => item.classList.remove('selected-type'));
      ev.target.classList.add('selected-type');
      const type = ev.target.getAttribute('data-type');
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('type', type);
      window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    } else{
      const categoryItems = document.querySelectorAll('.menu-item-genre');
      categoryItems.forEach(item => item.classList.remove('selected-category'));
      ev.target.classList.add('selected-category');
      const genre = ev.target.getAttribute('data-genre');
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('genre', genre);
      window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    }
  };

  let genreElement = document.querySelector('.selected-category');
  let genre = genreElement ? genreElement.textContent : null;
  let type = document.querySelector('.selected-type').getAttribute('data-type');

  if (validFilter) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);

    let filteredItems = [];

    if (type === "movie") {
      filteredItems = await filterMoviesByGenre(genre);
    } else if (type === "series") {
      filteredItems = await filterSeriesByGenre(genre);
    } else {
      filteredItems = await filterSeriesAndMoviesByGenre(genre);
    }

    const pagesCount = Math.ceil(filteredItems.length / PAGE_SIZE);
    const matches = moviesTemplate(filteredItems, ctx, currentPage, pagesCount);

    ctx.render(matches);
  }
};

async function filterMoviesByGenre(genre, currentPage) {
  let allMovies = await getAllMovies(currentPage);
  if (genre) {
    const selectedGenres = genre.split(',');
    allMovies = allMovies.filter(movie => selectedGenres.some(genre => movie.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  return allMovies;
}

async function filterSeriesByGenre(genre, currentPage) {
  let allSeries = await getAllSeries(currentPage);
  if (genre) {
    const selectedGenres = genre.split(',');
    allSeries = allSeries.filter(series => selectedGenres.some(genre => series.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  return allSeries;
};

async function filterSeriesAndMoviesByGenre(genre, currentPage) {
  let content = await getAllContentData();
  if (genre) {
    const selectedGenres = genre.split(',');
    content = content.filter(item => selectedGenres.some(genre => item.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  return content;
}


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
  const menuItems = document.querySelectorAll('.menu-item-genre');
  menuItems.forEach(item => item.classList.remove('selected-category'));

  const categoryElement = Array.from(menuItems).find(item => item.textContent === category);
  if (categoryElement) {
    categoryElement.classList.add('selected-category');
  }
};

export function setTypeSelected(type='All') {
  const menuItems = document.querySelectorAll('.menu-item-type');
  menuItems.forEach(item => item.classList.remove('selected-category'));

  const categoryElement = Array.from(menuItems).find(item => item.textContent === type);
  if (categoryElement) {
    categoryElement.classList.add('selected-type');
  }
};

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