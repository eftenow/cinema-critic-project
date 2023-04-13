import { html } from '../../node_modules/lit-html/lit-html.js';
import { filterHandler, movieTypeFilter, sortHandler } from '../../utils/filterButtons.js';
import { getAllMovies, getAllSeries, getMoviesAndSeries } from '../services/itemServices.js';

const movieTemplate = (movie) => html`
<div class="movie-card" data-category="${movie.genres}">
                    <div class="movie-image">
                        <img src="${movie.image}" alt="Movie Poster">
                        <div class="movie-rating">${movie.rating}</div>
                    </div>
                    <h3 class="movie-card-title">${movie.name}</h3>
                    <a href="/${movie.type}/${movie.objectId}" class="movie-details-button">Details</a>
                </div>
`

export const moviesTemplate = (movies, ctx) => html`
        <section class="movies-section">
            <h2>Our suggestions</h2>
            
            <section class="sort-section"> 
            <div class="search-category">
                <a href="#">
                    <span>Genre</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu" @click="${filterHandler}">
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
                    <a href="#" data-id="asc" id='rating' class="menu-item">Best rated </a>
                    <a href="#" data-id="desc" id='rating'class="menu-item">Worst rated</a>
                    
                </div>
            </div>
            <div class="search-category"  @click="${(e) => sortHandler(ctx, movies, e)}">
                <a href="#">
                    <span>Release year</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">Sort by year</span>
                    <a href="#" data-id="asc" id='year' class="menu-item">Newest to oldest</a>
                    <a href="#" data-id="desc" id='year' class="menu-item">Oldest to newest</a>
                    
                </div>
            </div>
            <div @click="${(e) => movieTypeFilter(e, ctx)}" class="search-category">
                <a href="#">
                    <span>Type</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">Sort by type</span>
                    <a href="#" class="menu-item">Movies</a>
                    <a href="#" class="menu-item">Series</a>
                    <a href="#" class="menu-item">All</a>
                    
                </div>
            </div>
        </section>
            <div class="movies-list">
            ${movies.length == 0
        ? html`<h2 id='no-movies-msg'>There are no movies nor series added yet.</h2>`
        : html`${movies.map(m => movieTemplate(m))}`}
            
            </div>
        </section>`



export async function renderMovies(ctx) {
    const seriensAndMovies = await getMoviesAndSeries();
    const movies = moviesTemplate(seriensAndMovies, ctx);

    ctx.render(movies);
}