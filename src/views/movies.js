import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMovies } from '../services/itemServices.js';

const movieTemplate = (movie) => html`
<div class="movie-card">
                    <div class="movie-image">
                        <img src="${movie.image}" alt="Movie Poster">
                        <div class="movie-rating">${movie.rating}</div>
                    </div>
                    <h3 class="movie-title">${movie.name}</h3>
                    <button class="movie-details-button">Details</button>
                </div>
`

export const moviesTemplate = (movies) => html`
        <section class="movies-section">
            <h2>Our suggestions</h2>
                     
            <div class="movies-list">
            ${movies.length == 0
        ? html`<h2 id='no-movies-msg'>There are no movies nor series added yet.</h2>`
            : html`${movies.map(m => movieTemplate(m))}`}
            
            </div>
        </section>`



export async function renderMovies(ctx) {
    const listOfMovies = await getAllMovies();
    const movies = moviesTemplate(listOfMovies.results);

    ctx.render(movies);

}




{/* <section class="sort-section"> 
            <div class="search-category">
                <a href="#">
                    <span>Genre</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div class="category-menu">
                    <span class="subject">All Genres</span>
                    <a href="#" class="menu-item">Action</a>
                    <a href="#" class="menu-item">Comedy</a>
                    <a href="#" class="menu-item">Drama</a>
                    <a href="#" class="menu-item">Romance</a>
                    <a href="#" class="menu-item">Sci-Fi</a>
                    <a href="#" class="menu-item">Thriller</a>
                    <a href="#" class="menu-item">Horror</a>
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

                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/avengers.jpg" alt="Movie Poster">
                        <div class="movie-rating">8.5</div>
                    </div>
                    <h3 class="movie-title">Movie Title</h3>
                    <a href='/movies/details' class="movie-details-button">Details</a>
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="movie-poster-2.jpg" alt="Movie Poster">
                        <div class="movie-rating">9.0</div>
                    </div>
                    <h3 class="movie-title">Movie Title</h3>
                    <button class="movie-details-button">Details</button>
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/breaking-bad.jpg" alt="Movie Poster">
                        <div class="movie-rating">10.0</div>
                    </div>
                    <h3 class="movie-title">Breaking Bad</h3>
                    <button class="movie-details-button">Details</button>
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/king-of-tulsa.jpg" alt="Movie Poster">
                        <div class="movie-rating">9.0</div>
                    </div>
                    <h3 class="movie-title">Tulsa King</h3>
                    <button class="movie-details-button">Details</button>
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/ozark.jpg" alt="Movie Poster">
                        <div class="movie-rating">8.5</div>
                    </div>
                    <h3 class="movie-title">Ozark</h3>
                    <button class="movie-details-button">Details</button>
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/vikings.jpg" alt="Movie Poster">
                        <div class="movie-rating">9.2</div>
                    </div>
                    <h3 class="movie-title">Vikings</h3>
                    <button class="movie-details-button">Details</button>
                </div> */}