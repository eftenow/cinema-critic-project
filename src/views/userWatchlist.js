import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { scrollToTop } from '../../utils/backToTopBtn.js';
import { addUserBookmark, removeUserBookmark, toggleBookmarkIcon } from '../../utils/bookmarkBtns.js';
import { getUserBookmarks } from '../services/authServices.js';
import { getUserWatchlist } from '../services/itemServices.js';


const watchlistMovieTemplate = (movie) => html`
<div class="review-container">
    <div class="review-movie">
      <img class="movie-img" src="${movie.image}" alt="Movie Image">
      <h3 class="movie-title">${movie.rating}/10 <i class="fa-solid fa-star"></i></h3>
    </div>
    <div class="review-content">
      <h3 class="review-title">${movie.name}</h3>
      <p class="review-rating">${movie.genres}</p>
      <p class="review-text">${movie.description}</p>
      <div class="review-buttons">
        <a @click=${scrollToTop} id='watchlist-details' class="more-info btn" href="/${movie.type}/${movie.objectId}">Details</a>
      </div>
      <div class="movie-watchlist">
              <button class="add-to-watchlist" @click='${toggleBookmarkIcon}'>
              <span id='to-add' class="fa-stack fa-2x" @click=${() => removeUserBookmark(null, movie.objectId)}>
                <i id="bookmark-checked" class="fa-solid fa-bookmark fa-stack-2x"></i>
                <i id='check' class="fa-solid fa-check fa-stack-1x"></i>
            </span>

      <span id='to-remove' class="hidden fa-stack fa-2x" @click=${() => addUserBookmark(null, movie.objectId)}>
        <i id="bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
        <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
      </span>      
              </button>
            </div>
    </div>
  </div>
`

export const userWatchlist = (user, watchlist) => html`

  <h2 class="watchlist-heading">${user.username}'s watchlist</h2>
  <div class="watchlist-container">
  ${watchlist.length == 0
    ? html`<h2 id='no-watchlist-msg'>Your watchlist is empty.</h2>`
    : html`${watchlist.map(m => watchlistMovieTemplate(m))}`}
    </div>
  </div>
`



export async function renderUserWatchlist(ev, user) {
  ev.preventDefault();
  const watchlistSection = document.querySelector(".watchlist-section");
  const userWatchlistedMovies = await getUserWatchlist(user.objectId);
  console.log(userWatchlistedMovies);
  const myWatchlist = userWatchlist(user, userWatchlistedMovies);
  render(myWatchlist, watchlistSection)

  Array.from(document.querySelectorAll('#to-add')).map(x => x.classList.remove('hidden'));
  Array.from(document.querySelectorAll('#to-remove')).map(x => x.classList.add('hidden'));

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
  } else if (action == 'hide') {
    watchlistSection.classList.toggle('hidden');
    showWatchlistBtn.classList.remove('hidden');
    showReviewsBtn.classList.remove('hidden');
    hideWatchlistBtn.classList.add('hidden');
  }
}

