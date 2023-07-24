import { BASE_URL } from "../src/services/api.js";
import { PAGE_SIZE, getAllContentData, getAllMovies, getAllSeries, getMovieDetails, getMoviesAndSeries, getMoviesCount, getSeriesCount, getSeriesDetails } from "../src/services/itemServices.js";
import { moviesTemplate, renderAllContent } from "../src/views/movies.js";

export async function sortHandler(ctx, movies, e) {
  const searchParams = new URLSearchParams(ctx.querystring);
  const currentPage = Number(searchParams.get('page') || 1);
  
  const sortOption = e.target.getAttribute('data-id');
  const type = document.querySelector('.selected-type').getAttribute('data-type');
  const selectedGenres = getSelectedGenres();

  const url = `${BASE_URL}/content/${type}/?genres=${selectedGenres.join(',')}&sort=${sortOption}`;

  const response = await fetch(url);
  const data = await response.json();
  
  const sortedItems = data.results || data;
  const totalItems = data.count;
  
  const pagesCount = Math.ceil(totalItems / PAGE_SIZE);
  const matches = moviesTemplate(sortedItems, ctx, currentPage, pagesCount);
  ctx.render(matches);

  searchParams.set('sort', sortOption);
  window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
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
  const sortOption = getSortOption();  

  if (validFilter) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = Number(searchParams.get('page') || 1);

    // URL now includes genres and sort
    const url = `${BASE_URL}/content/${type}/?genres=${selectedGenres.join(',')}&sort=${sortOption}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const filteredItems = data.results || data;
    const totalItems = data.count;

    const pagesCount = Math.ceil(totalItems / PAGE_SIZE);
    const matches = moviesTemplate(filteredItems, ctx, currentPage, pagesCount);
    ctx.render(matches);

    const noMatchesEl = document.querySelector('.no-matches-found');


    searchParams.set('genre', selectedGenres.join(','));
    searchParams.set('type', type);
    searchParams.set('sort', sortOption);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);

    // After successful filter operation, set the selected genre(s) and type
    setCategorySelected(selectedGenres.join(','));
    setTypeSelected(type);
  }
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

function getSelectedGenres() {
  const genreCheckboxes = document.querySelectorAll('.genre:checked');
  const selectedGenres = Array.from(genreCheckboxes).map(checkbox => checkbox.value);
  return selectedGenres;
}

// This function returns the selected sorting option
function getSortOption() {
  const sortOptions = document.querySelectorAll('.menu-item');
  const selectedSortOption = Array.from(sortOptions).find(option => option.classList.contains('selected-sort-option'));
  return selectedSortOption ? selectedSortOption.dataset.id : null;
}