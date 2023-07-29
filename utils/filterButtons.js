import { BASE_URL } from "../src/services/api.js";
import { PAGE_SIZE, getAllMovies, getAllSeries, getMoviesCount, getSeriesCount } from "../src/services/itemServices.js";
import { moviesTemplate } from "../src/views/movies.js";

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
  let selectedType;

  if (target.tagName.toLowerCase() === 'label' || target.tagName.toLowerCase() === 'input') {
    const genreCheckbox = target.tagName.toLowerCase() === 'input' ? target : target.previousElementSibling;
    genreCheckbox.checked = !genreCheckbox.checked;
    target.closest('.genre-item').classList.toggle('selected-genre');
    validFilter = true;
    
  } else {
    const categoryItems = document.querySelectorAll('.menu-item-type');
    categoryItems.forEach(item => item.classList.remove('selected-type'));
    ev.target.classList.add('selected-type');
    selectedType = ev.target.getAttribute('data-type') || 'all';
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('type', selectedType);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);
    validFilter = true;
  }

  if (!selectedType) {
    selectedType = 'all';
  }

  const selectedGenres = getSelectedGenres();
  const sortOption = getSortOption();  

  if (validFilter) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const currentPage = 1;

    // URL now includes genres and sort
    const url = `${BASE_URL}/content/${selectedType}/?genres=${selectedGenres.join(',')}&sort=${sortOption}`;

    const response = await fetch(url);
    const dataMatches = await response.json();
    console.log(dataMatches);
    const filteredItems = dataMatches.results || dataMatches;
    totalItems = dataMatches.count;

    const pagesCount = Math.ceil(totalItems / PAGE_SIZE);
    const pagesNext = dataMatches.next;
    const pagesPrevious = dataMatches.previous;
    console.log(`aaa`, pagesCount, pagesNext, pagesPrevious);
    console.log(url);
    const matches = moviesTemplate(filteredItems, ctx, currentPage, pagesCount, pagesNext, pagesPrevious);
    ctx.render(matches);

    const noMatchesEl = document.querySelector('.no-matches-found');

    searchParams.set('page', currentPage);
    searchParams.set('genre', selectedGenres.join(','));
    searchParams.set('type', selectedType);
    searchParams.set('sort', sortOption);
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams}`);

    
    setCategorySelected(selectedGenres.join(','));
    setTypeSelected(selectedType);
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