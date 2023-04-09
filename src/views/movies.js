import { html } from '../../node_modules/lit-html/lit-html.js';
import { genreHandler } from '../../utils/filterButtons.js';
import { getAllMovies, getAllSeries } from '../services/itemServices.js';

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

export const moviesTemplate = (movies) => html`
        <section class="movies-section">
            <h2>Our suggestions</h2>
            
            <section class="sort-section"> 
            <div class="search-category">
                <a href="#">
                    <span>Genre</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu" @click="${genreHandler}">
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
                <div class="category-menu">
                    <span class="subject">Sort by rating</span>
                    <a href="#" class="menu-item">Best rated </a>
                    <a href="#" class="menu-item">Worst rated</a>
                    
                </div>
            </div>
            <div class="search-category">
                <a href="#">
                    <span>Release year</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">Sort by year</span>
                    <a href="#" class="menu-item">Newest to oldest</a>
                    <a href="#" class="menu-item">Oldest to newest</a>
                    
                </div>
            </div>
            <div class="search-category">
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
    const promises = Promise.all([
        getAllMovies(),
        getAllSeries()
    ]);

    const [listOfMovies, listOfSeries] = await promises;
    const seriensAndMovies = listOfMovies.results
        .concat(listOfSeries.results)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const movies = moviesTemplate(seriensAndMovies);

    ctx.render(movies);
}