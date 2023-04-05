import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMovies } from '../services/itemServices.js';

const movieTemplate = (movie) => html`
<div class="movie-card">
                    <div class="movie-image">
                        <img src="${movie.image}" alt="Movie Poster">
                        <div class="movie-rating">${movie.rating}</div>
                    </div>
                    <h3 class="movie-card-title">${movie.name}</h3>
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