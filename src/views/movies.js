import { html } from '../../node_modules/lit-html/lit-html.js';
import { filterHandler, sortHandler, setCategorySelected, setTypeSelected, resetAllFilters } from '../../utils/filterButtons.js';
import { PAGE_SIZE, getMoviesAndSeries, getMoviesAndSeriesCount } from '../services/itemServices.js';
import { displayPages } from '../../utils/pagination.js';

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

export const moviesTemplate = (movies, ctx, currentPage = 1, pagesCount = 1) => html`
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
  <div class="genre-list">
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="action" name="genre" value="action">
      <label class ='genre' for="action">Action</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="adventure" name="genre" value="adventure">
      <label class ='genre' for="adventure">Adventure</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="comedy" name="genre" value="comedy">
      <label class ='genre' for="comedy">Comedy</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="crime" name="genre" value="crime">
      <label class ='genre' for="crime">Crime</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="drama" name="genre" value="drama">
      <label class ='genre' for="drama">Drama</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="romance" name="genre" value="romance">
      <label class ='genre' for="romance">Romance</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="sci-fi" name="genre" value="sci-fi">
      <label class ='genre' for="sci-fi">Sci-Fi</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="thriller" name="genre" value="thriller">
      <label class ='genre' for="thriller">Thriller</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="horror" name="genre" value="horror">
      <label class ='genre' for="horror">Horror</label>
    </div>
    <div class="genre-item">
      <input class ='genre' type="checkbox" id="fantasy" name="genre" value="fantasy">
      <label class ='genre' for="fantasy">Fantasy</label>
    </div>
  </div>
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
            <div  class="search-category" >
                <a href="#">
                    <span>Type</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu" @click="${(e) => filterHandler(e, ctx)}">
                    <span class="subject">Sort by type</span>
                    <a href="#" data-type="movie" class="menu-item menu-item-type">Movies</a>
                    <a href="#" data-type="series" class="menu-item menu-item-type">Series</a>
                    <a href="/dashboard" data-type="all" class="menu-item menu-item-type">All</a>
                    
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
        </section>`



export async function renderAllContent(ctx) {
    let searchParams = new URLSearchParams(ctx.querystring);
    let currentPage = Number(searchParams.get('page') || 1);
    const seriensAndMovies = await getMoviesAndSeries(currentPage);
    const moviesCount = await getMoviesAndSeriesCount();
    let pagesCount = Math.ceil(moviesCount / PAGE_SIZE);

    const movies = moviesTemplate(seriensAndMovies, ctx, currentPage, pagesCount);

    ctx.render(movies);
    setTypeSelected();
};






