import { html } from '../../node_modules/lit-html/lit-html.js';
import { scrollToBottom, scrollToTop } from '../../utils/backToTopBtn.js';
import { addUserBookmark, removeUserBookmark, getUser, getUserBookmarks } from '../services/authServices.js';
import { getTopMovies } from '../services/itemServices.js';

const movieContainerTemplate = (ctx, movie, rank, currentUser, userBookmarks) => html`
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
        ${currentUser
          ? html`
            <div class="movie-watchlist">
              <button class="add-to-watchlist">
                ${userBookmarks && userBookmarks.includes(movie.objectId) ? html`
                  <span id='to-add' class="fa-stack fa-2x" @click=${() => removeUserBookmark(ctx, movie.objectId , '/popular')}>
                    <i id="bookmark-checked" class="fa-solid fa-bookmark fa-stack-2x"></i>
                    <i id='check' class="fa-solid fa-check fa-stack-1x"></i>
                  </span>
                ` : html`
                  <span id='to-remove' class="fa-stack fa-2x" @click=${() => addUserBookmark(ctx, movie.objectId, '/popular')}>
                    <i id="bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
                    <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
                  </span>
                `}
              </button>
            </div>
          `
          : html``}
      </div>
    </div>
  `;

const popularMoviesTemplate = (ctx, popularMovies, currentUser, userBookmarks) => html`
  <section class="popular-movies">
    <h2 class="popular-heading">Popular this week</h2>
    <div class="leaderboard">
      ${popularMovies.map(movie => movieContainerTemplate(ctx, movie, popularMovies.indexOf(movie), currentUser, userBookmarks))}
    </div>
  </section>
`;

export async function renderPopular(ctx) {
    const [popularMovies, currentUser, userBookmarks] = await Promise.all([
      getTopMovies(),
      getUser(),
      getUserBookmarks(),
    ]);

    const popular = popularMoviesTemplate(ctx, popularMovies, currentUser, userBookmarks);
    ctx.render(popular);
};

