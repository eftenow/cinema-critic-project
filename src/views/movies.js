import { html } from '../../node_modules/lit-html/lit-html.js';
import { filterHandler, sortHandler, setCategorySelected } from '../../utils/filterButtons.js';
import { PAGE_SIZE, getMoviesAndSeries, getMoviesAndSeriesCount, getMoviesCount } from '../services/itemServices.js';
import { displayPages } from '../../utils/pagination.js';
import { backToTopHandler } from '../../utils/backToTopBtn.js';

const movieTemplate = (movie) => html`
<div class="movie-card" data-category="${movie.genres}" id="${movie.objectId}" data-type="${movie.type}">
                    <div class="movie-image">
                        <img src="${movie.image}" alt="Movie Poster">
                        <div class="movie-rating">${movie.rating}</div>
                    </div>
                    <h3 class="movie-card-title">${movie.name}</h3>
                    <a href="/${movie.type}/${movie.objectId}" class="movie-details-button">Details</a>
                </div>
`

export const moviesTemplate = (movies, ctx, currentPage, pagesCount) => html`
        <section class="movies-section">
            <h2>Our suggestions</h2>
            
            <section class="sort-section"> 
            <div class="search-category">
            <a href="#">
                    <span>Genre</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu" @click="${(e) => filterHandler(e, ctx)}">
                    <span class="subject">All Genres</span>
                    <a href="#" class="menu-item">Action</a>
                    <a href="#" class="menu-item">Adventure</a>
                    <a href="#" class="menu-item">Comedy</a>
                    <a href="#" class="menu-item">Crime</a>
                    <a href="#" class="menu-item">Drama</a>
                    <a href="#" class="menu-item">Romance</a>
                    <a href="#" class="menu-item">Sci-Fi</a>
                    <a href="#" class="menu-item">Thriller</a>
                    <a href="#" class="menu-item">Horror</a>
                    <a href="#" class="menu-item">Fantasy</a>
                </div>
            </div>
            <div class="search-category">
                <a href="#">
                    <span>Rating</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu" @click="${(e) => sortHandler(ctx, movies, e)}">
                    <span class="subject">Sort by rating</span>
                    <a href="#" data-id="asc" data-specific='best' id='rating' class="menu-item">Best rated </a>
                    <a href="#" data-id="desc" data-specific='worst' id='rating'class="menu-item">Worst rated</a>
                    
                </div>
            </div>
            <div class="search-category"  @click="${(e) => sortHandler(ctx, movies, e)}">
                <a href="#">
                    <span>Release year</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">Sort by year</span>
                    <a href="#" data-id="asc" data-specific='newest' id='year' class="menu-item">Newest to oldest</a>
                    <a href="#" data-id="desc" data-specific='oldest' id='year' class="menu-item">Oldest to newest</a>
                    
                </div>
            </div>
            <div  class="search-category">
                <a href="#">
                    <span>Type</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">Sort by type</span>
                    <a href="/movies" class="menu-item">Movies</a>
                    <a href="/series" class="menu-item">Series</a>
                    <a href="/dashboard" class="menu-item">All</a>
                    
                </div>
            </div>
            <div  class="search-category" id='reset-all-btn'>
                <a>
                    <span  @click="${(e) => resetAllFilters(ctx, e)}">Reset Filters</span>
                </a>
            </div>
        </section>
            <div class="movies-list">
            ${movies.length == 0
        ? html`<h2 id='no-movies-msg'>No matches found.</h2>`
        : html`${movies.map(m => movieTemplate(m))}`}

            </div>
            <ul class="pagination">
        ${currentPage > 1
        ? html`<li class="page-item action"><a href="?page=${currentPage - 1}" class="page-link"><i id = 'prev-page' class="fa-solid fa-caret-left"></i></a></li>`
        : ''}
        ${displayPages(currentPage, pagesCount).map(pageNumber => html`
        <li class="page-item action ${pageNumber === currentPage ? 'active' : ''}"><a href="?page=${pageNumber}" class="page-link">${pageNumber}</a></li>`)}
        ${currentPage < pagesCount
        ? html`<li class="page-item action"><a href="?page=${currentPage + 1}" class="page-link"><i id='next-page' class="fa-solid fa-caret-right"></i></a></li>`
        : ''}
        
    </ul>
    <button id="back-to-top-btn" @click='${backToTopHandler}'>
    <i id='arrows-up' class="fa-solid fa-angles-up"></i>
        </button>
        </section>`



export async function renderAllContent(ctx) {
    console.log('reset');
    let searchParams = new URLSearchParams(ctx.querystring);
    let currentPage = Number(searchParams.get('page') || 1);
    const seriensAndMovies = await getMoviesAndSeries(currentPage);
    const moviesCount = await getMoviesAndSeriesCount();
    let pagesCount = Math.ceil(moviesCount / PAGE_SIZE);

    const movies = moviesTemplate(seriensAndMovies, ctx, currentPage, pagesCount);

    ctx.render(movies);
    setCategorySelected('All');
};

async function resetAllFilters(ctx) {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }

    const selectedCategory = document.querySelector('.selected-category');
    if (selectedCategory) {
        selectedCategory.classList.remove('selected-category');
    }

    const selectedSortOption = document.querySelector('.selected-sort-option');
    if (selectedSortOption) {
        selectedSortOption.classList.remove('selected-sort-option');
    }

    await renderAllContent(ctx);
};




