import { html } from '../../node_modules/lit-html/lit-html.js';
import { scrollToBottom, scrollToTop } from '../../utils/backToTopBtn.js';
import { getTopMovies } from '../services/itemServices.js';

const movieContainerTemplate = (movie, rank) => html`
  <div class="movie-container">
    <div class="movie-info">
      <div class="movie-details">
        <div class="movie-thumbnail">
          <img src="${movie.image}" alt="Movie Name">
        </div>
        <div class="movie-text">
          <h4 class="popular-movie-title"> <span>${rank+1}. </span>${movie.name}</h4>
          <p class="movie-meta">${movie.movieLength} | ${movie.genres}</p>
          <div class="popular-movie-rating">
            <p class="movie-score"><i class="fa-solid fa-star"></i> ${movie.rating}</p>
            <a href="/${movie.type}/${movie.objectId}" class="rate-button" id="rate-button" @click=${scrollToBottom}>Rate</a>
          </div>
          <p class="movie-cast"><b>Director: </b> ${movie.director}</p>
          <p class="movie-cast"><b>Stars: </b> ${movie.stars}</p>
          <p class="movie-description">${movie.description}</p>
          <a href="/${movie.type}/${movie.objectId}" class="more-info-btn" @click=${scrollToTop}>More Info</a>
        </div>
      </div>
      <div class="movie-watchlist">
        <button class="add-to-watchlist">
          <span class="fa-stack fa-2x">
            <i id="bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
            <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
`;

const popularMoviesTemplate = (ctx, popularMovies) => html`
  <section class="popular-movies">
    <h2 class="popular-heading">Popular this week</h2>
    <div class="leaderboard">
      ${popularMovies.map(movie => movieContainerTemplate(movie, popularMovies.indexOf(movie)))}
    </div>
  </section>
`;

export async function renderPopular(ctx) {
    const popularMovies = await getTopMovies();
    console.log(popularMovies);
    const register = popularMoviesTemplate(ctx, popularMovies);
    ctx.render(register);
};

