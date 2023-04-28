import { html } from '../../node_modules/lit-html/lit-html.js';
import { addUserBookmark, removeUserBookmark } from '../../utils/bookmarkBtns.js';
import { selectOption, showHideOptions } from '../../utils/dropdowns.js';
import { editReviewHandler } from '../../utils/editReview.js';
import { getUser, getUserBookmarks } from '../services/authServices.js';
import { getMovieDetails, getSeriesDetails } from '../services/itemServices.js';
import { getReviewsForMovie, sendReviewRequest, userAlreadyReviewed } from '../services/reviewServices.js';

const reviewTemplate = (ctx, review, currentUser)=> html`
<div class="review">
    ${currentUser.username == review.username 
    ? html`<button @click="${(e) => editReviewHandler(ctx, e, review)}" class='edit-review-btn' data-review-id="${review.reviewId}"><i class="fa-regular fa-pen-to-square"></i></button>`
     : ''}
    <h3 class="review-title-details">${review.reviewTitle}</h3>
    <div class="review-header">
    <img src="${review.profileImg}" alt="Avatar" onerror="this.onerror=null; this.src='../../images/default-user.png';">
      <div class="review-info">
        <p class="reviewer-name">${review.username}</p>
        <p class="movie-score reviewer-rating">Rating: ${review.reviewRating} <i id="star" class="fa-solid fa-star"></i></p>
      </div>
    </div>
    <div class="review-body">
      <p>${review.reviewDescription}</p>
    </div>
  </div>`

const detailsTemplate = (movie, ctx, type, currentUser, userBookmarks, reviews, alreadyReviewed) => html`
<section class="specific-movie-details">
  <div class='details-header'>
  <div class="movie-poster">
    <img src="${movie.image}" alt="Movie Poster">
    ${currentUser
    ? html`
            <div class="movie-watchlist">
              <button class="add-to-watchlist-details">
                ${userBookmarks && userBookmarks.includes(movie.objectId) ? html`
                <span id='to-add' class="fa-stack fa-2x" @click=${() => removeUserBookmark(ctx, movie.objectId, `/${movie.type}/${movie.objectId}`)}>
                    <i id="details-bookmark-checked" class="fa-solid fa-bookmark fa-stack-2x"></i>
                    <i id='check' class="fa-solid fa-check fa-stack-1x"></i>
                  </span>
                ` : html`
                <span id='to-remove' class="fa-stack fa-2x" @click=${() => addUserBookmark(ctx, movie.objectId, `/${movie.type}/${movie.objectId}`)}>
                    <i id="details-bookmark-unchecked" class="fa-solid fa-bookmark fa-stack-2x"></i>
                    <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
                  </span>
                `}
              </button>
            </div>
          `
    : html``}
  </div>
  <div class="specific-movie-info">
    <h2 class="specific-movie-title details-movie-specifics">${movie.name}</h2>
    <p class="specific-movie-genre"><span class="details-movie-specifics">Rating: </span>${movie.rating} <i id ="star" class="fa-solid fa-star"></i></p>
    <p class="specific-movie-genre"><span class="details-movie-specifics">Genre: </span>${movie.genres}</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Director: </span>${movie.director}</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Stars: </span>${movie.stars}</p>
    ${type == 'series'
    ? html`<p class="specific-movie-runtime"> <span class="details-movie-specifics">Seasons: </span>${movie.seasons}</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Total Episodes: </span>${movie.episodes}</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Episode length: </span>${movie.movieLength} minutes</p>`
    : html`<p class="specific-movie-runtime"> <span class="details-movie-specifics">Movie runtime: </span>${movie.movieLength}</p>`}
    
    <p class="specific-movie-release-year"><span class="details-movie-specifics">Release year:</span> ${movie.year}</p>
    <p class="specific-movie-description"><span class="details-movie-specifics">Description: </span> ${movie.description}</p>
    
  </div>
  </div>
  <div class="trailer-section">
  
    <h3>Trailer</h3>
    <iframe class="trailer-video" width="560" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
  </div>
</section>

<section class="specific-movie-reviews"> 
  <h2 class="reviews-title">Reviews:</h2>
  ${reviews.length == 0
        ? html`<h2 id='no-movies-msg'>No reviews yet.</h2>`
        : html`${reviews.map(rev => reviewTemplate(ctx, rev, currentUser))}`}
  <form class="add-review-form ${alreadyReviewed ? 'hidden' : ''}" @submit='${(e) => addNewReview(ctx, e, movie.type, movie.objectId, currentUser.objectId)}'>
    <h3>Add a Review:</h3>
    <div class="select-menu specific-form-group">
  <label for="select-rating">Rating: </label>
  <div id='select-rating' class="select" @click="${showHideOptions}">
    <span>Select rating</span>
    <i class="fas fa-angle-down"></i>
  </div>
  <input type="hidden" id="review-rating-input" name="review-rating">
  <div class="options-list" @click="${selectOption}" name='review-rating'>
    <div class="option">1 <i class="fa-solid fa-star"></i></div>
    <div class="option">2 <i class="fa-solid fa-star"></i></div>
    <div class="option">3 <i class="fa-solid fa-star"></i></div>
    <div class="option">4 <i class="fa-solid fa-star"></i></div>
    <div class="option">5 <i class="fa-solid fa-star"></i></div>
    <div class="option">6 <i class="fa-solid fa-star"></i></div>
    <div class="option">7 <i class="fa-solid fa-star"></i></div>
    <div class="option">8 <i class="fa-solid fa-star"></i></div>
    <div class="option">9 <i class="fa-solid fa-star"></i></div>
    <div class="option">10 <i class="fa-solid fa-star"></i></div>
  </div>
</div>
  <div class="specific-form-group">
      <label for="reviewer-review-text">Review Title:</label>
      <input id="reviewer-review-text" name="reviewer-review-text" required>
    </div>

    <div class="specific-form-group">
      <label for="reviewer-review">Review Description:</label>
      <textarea id="reviewer-review" name="reviewer-review" required></textarea>
    </div>
    <div class="specific-form-group submit-review-btn-wrapper">
      <button class="submit-review-btn" type="submit">Submit Review</button>
    </div>
  </form>
</section>
`

export async function renderMovieDetails(ctx) {
  console.log('asd');
  const type = 'movie';
  const movieId = ctx.params.id;

  await renderDetails(ctx, type, movieId);
}

export async function renderSeriesDetails(ctx) {
  const type = 'series';
  const seriesId = ctx.params.id;

  await renderDetails(ctx, type, seriesId);
}



function addNewReview(ctx, ev, type, movieId, userId) {
  ev.preventDefault();
  const form = new FormData(ev.target);

  const rating = form.get('review-rating');
  const title = form.get('reviewer-review-text');
  const description = form.get('reviewer-review');
  
  sendReviewRequest(rating, title, description, type, movieId, userId);
  ev.target.reset();
};



export async function renderDetails(ctx, type, movieId) {
  let currentObj, userBookmarks, alreadyReviewed, reviews;
  const currentUser = getUser();
  if (type === 'movie') {
    [currentObj, userBookmarks, reviews, alreadyReviewed] = await Promise.all([
      getMovieDetails(movieId),
      getUserBookmarks(),
      getReviewsForMovie(movieId, 'Movie'),
      userAlreadyReviewed(currentUser.objectId, movieId, 'Movie')
    ]);
  } else if (type === 'series') {
    [currentObj, userBookmarks, reviews, alreadyReviewed] = await Promise.all([
      getSeriesDetails(movieId),
      getUserBookmarks(),
      getReviewsForMovie(movieId, 'Show'),
      userAlreadyReviewed(currentUser.objectId, movieId, 'Show')
    ]);
  };

  const details = detailsTemplate(currentObj, ctx, type, currentUser, userBookmarks, reviews, alreadyReviewed);
console.log(reviews);
  ctx.render(details);
}