import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getUserWatchlist } from '../services/itemServices.js';

const watchlistMovieTemplate = (movie) => html`
<div class="watchlist-movie">
      <img class="movie-img" src="${movie.image}" alt="Movie Image">
      <h3 class="movie-title">${movie.name}</h3>
    </div>
    <div class="watchlist-content">
      <p class="watchlist-genre">${movie.genres}</p>
      <p class="watchlist-rating">Rating: ${movie.rating}/10 <i class="fa-solid fa-star"></i></p>
      <p class="watchlist-text">${movie.description}</p>
      <div class="watchlist-buttons">
        <a href="/${movie.type}/${movie.objectId}" class="watchlist-details">Details</a>
      </div>
    </div>
  </div>
`

export const userWatchlist = (user, watchlist) => html`

  <h2 class="watchlist-heading">${user.username}'s watchlist</h2>
  <div class="watchlist-container">
  ${watchlist.length == 0
        ? html`<h2 id='no-movies-msg'>Your watchlist is empty.</h2>`
        : html`${watchlist.map(m => watchlistMovieTemplate(m))}`}
    </div>
  </div>
`



export async function renderUserWatchlist(ev, user) {
  const watchlistSection = document.querySelector(".watchlist-section");
  const userWatchlistedMovies = await getUserWatchlist(user.objectId);

  const myWatchlist = userWatchlist(user, userWatchlistedMovies);
  render(myWatchlist, watchlistSection)

  const action = 'show';
  toggleWatchlistButtons(action);
}


export function hideUserWatchlist(ev) {
  const action = 'hide';
  toggleWatchlistButtons(action);
}

function toggleWatchlistButtons(action) {
  const watchlistSection = document.querySelector(".watchlist-section");
  const showWatchlistBtn = document.getElementById('show-watchlist');
  const hideWatchlistBtn = document.getElementById('hide-watchlist');
  const showReviewsBtn = document.getElementById('show-reviews');

  if (action == 'show') {
    watchlistSection.classList.toggle('hidden');
  showWatchlistBtn.classList.add('hidden');
  showReviewsBtn.classList.add('hidden');
  hideWatchlistBtn.classList.remove('hidden');
  } else if(action == 'hide'){
    watchlistSection.classList.toggle('hidden');
    showWatchlistBtn.classList.remove('hidden');
    showReviewsBtn.classList.remove('hidden');
    hideWatchlistBtn.classList.add('hidden');
  }
}