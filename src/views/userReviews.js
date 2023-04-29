import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { reviewTemplate } from './details.js';

export const userReviews = (ctx, user, reviews) => html`

  <h2 class="myReviews-heading">${user.username}'s reviews</h2>
  <div class="user-reviews">
  ${reviews.length == 0
        ? html`<h2 id='no-movies-msg'>You don't have any reviews yet.</h2>`
        : html`${reviews.map(rev => reviewTemplate(ctx, rev, user))}`}
  </div>
`



export async function renderUserReviews(ctx, ev, user, reviews) {
  ev.preventDefault();
  const reviewSection = document.querySelector(".review-section");
  const myReviews = userReviews(ctx, user, reviews);
  const action = 'show';
  
  render(myReviews, reviewSection);
  toggleReviewButtons(action);
};

export function hideUserReviews(ev) {
  const action = 'hide';
  toggleReviewButtons(action);
}

function toggleReviewButtons(action) {
  const reviewSection = document.querySelector(".review-section");
  const showReviewsBtn = document.getElementById('show-reviews');
  const hideReviewsBtn = document.getElementById('hide-reviews');
  const showWatchlistBtn = document.getElementById('show-watchlist');

  if (action == 'show') {
    reviewSection.classList.toggle('hidden');
    showReviewsBtn.classList.add('hidden');
    showWatchlistBtn.classList.add('hidden');
    hideReviewsBtn.classList.remove('hidden');
  } else if (action == 'hide') {
    reviewSection.classList.toggle('hidden');
    showReviewsBtn.classList.remove('hidden');
    showWatchlistBtn.classList.remove('hidden');
    hideReviewsBtn.classList.add('hidden');
  }
}