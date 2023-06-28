import { PAGE_SIZE, getAllContentData, getAllMovies, getAllSeries, getMovieDetails, getMoviesAndSeries, getMoviesCount, getSeriesCount, getSeriesDetails } from "../src/services/itemServices.js";
import { moviesTemplate, renderAllContent } from "../src/views/movies.js";

async function renderFilteredMovies(ctx, selectedCategory, currentPage) {
  const allMovies = await getMoviesAndSeries(currentPage);
  const filteredMovies = allMovies.filter(movie => movie.genres.includes(selectedCategory));

  const pagesCount = Math.ceil(filteredMovies.length / PAGE_SIZE);
  const matches = moviesTemplate(filteredMovies, ctx, currentPage, pagesCount);

  ctx.render(matches);
}

export function getSelectedGenres() {
  const genreCheckboxes = Array.from(document.querySelectorAll('.genre-list input[type="checkbox"]'));
  const selectedGenres = genreCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
  return selectedGenres;
}

export async function filterHandler(ev, ctx) {
  ev.preventDefault();
  const target = ev.target;
  let validFilter = false, totalItems;
  
  if (target.tagName.toLowerCase() === 'label' || target.tagName.toLowerCase() === 'input') {
    const genreCheckbox = target.tagName.toLowerCase() === 'input' ? target : target.previousElementSibling;
    genreCheckbox.checked = !genreCheckbox.checked;
    target.closest('.genre-item').classList.toggle('selected-genre');
    validFilter = true;
  } else {
    const categoryItems = document.querySelectorAll('.menu-item-type');
    categoryItems.forEach(item => item.classList.remove('selected-type'));
    ev.target.classList.add('selected-type');
    const type = ev.target.getAttribute('data-type');
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('type', type);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    validFilter = true;
  }

  const type = document.querySelector('.selected-type').getAttribute('data-type');
  const selectedGenres = getSelectedGenres();

  if (validFilter) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);

    let filteredItems = [];

    if (type === "movie") {
      const {movies, totalMovies} = await filterMoviesByGenre(selectedGenres, currentPage);
      filteredItems = movies;
      totalItems = totalMovies;
    } else if (type === "series") {
      const {series, totalSeries} = await filterSeriesByGenre(selectedGenres, currentPage);
      filteredItems = series;
      totalItems = totalSeries;
    } else {
      const {content, totalContent} = await filterSeriesAndMoviesByGenre(selectedGenres, currentPage);
      filteredItems = content;
      totalItems = totalContent;
    }
    
    const pagesCount = Math.ceil(totalItems / PAGE_SIZE);
    const matches = moviesTemplate(filteredItems, ctx, currentPage, pagesCount);
    ctx.render(matches);
    const noMatchesEl = document.getElementById('no-movies-msg')
    
    if (filteredItems.length == 0) {
      noMatchesEl.style.display = 'block'
    } else{
      noMatchesEl.style.display = 'none'
    }
    const searchParams2 = new URLSearchParams(window.location.search);
    searchParams2.set('genre', selectedGenres.join(','));
    searchParams2.set('type', type);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams2}`);
  }
}

async function filterMoviesByGenre(genre, currentPage, totalMovies) {
  let allMovies = await getAllMovies(currentPage);
  if (genre) {

    allMovies = allMovies.filter(movie => genre.every(genre => movie.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  totalMovies = allMovies.length;
  return { movies: allMovies, totalMovies };
}

async function filterSeriesByGenre(genre, currentPage, totalSeries) {
  let allSeries = await getAllSeries(currentPage);
  if (genre) {
    allSeries = allSeries.filter(series => genre.every(genre => series.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  totalSeries = allSeries.length;
  return { series: allSeries, totalSeries };
};

async function filterSeriesAndMoviesByGenre(genre, currentPage, totalContent) {
  let content = await getAllContentData();
  if (genre) {
    content = content.filter(item => genre.every(genre => item.genres.toLowerCase().includes(genre.trim().toLowerCase())));
  }
  totalContent = content.length;
  return { content, totalContent };
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

export function setTypeSelected(type = 'All') {
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

export async function resetAllFilters(ctx) {
  window.history.replaceState({}, '', `${window.location.pathname}`);
  window.location.reload();
};