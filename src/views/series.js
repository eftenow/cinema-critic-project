import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../services/itemServices.js';

export const productsTemplate = (product, isGuest) => html`
       <section class="movies-section">
            <h2>TV Shows</h2>
        
        
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
        
        
            <div class="movies-list">
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/avengers.jpg" alt="Movie Poster">
                        <div class="movie-rating">8.5</div>
                    </div>
                    <h3 class="movie-title">Movie Title</h3>
                    <button class="movie-details-button">Details</button>
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
                </div>
        
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="./images/wednesday.jpg" alt="Movie Poster">
                        <div class="movie-rating">7.9</div>
                    </div>
                    <h3 class="movie-title">Wednesday</h3>
                    <button class="movie-details-button">Details</button>
                </div>
            </div>
        </section>`



export async function renderSeries(ctx) {
    const products = productsTemplate();

    ctx.render(products);

}