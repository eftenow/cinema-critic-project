import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { scrollToBottom } from '../../utils/backToTopBtn.js';
import { addUserBookmark, removeUserBookmark } from '../../utils/bookmarkBtns.js';
import { selectOption, showHideOptions } from '../../utils/dropdowns.js';
import { editReviewHandler, deleteReviewHandler, hideModal } from '../../utils/reviewOperations.js';

import { getUser } from '../services/authServices.js';
import { deleteMovie, deleteSeries, getMovieDetails, getSeriesDetails, getUserBookmarks } from '../services/itemServices.js';
import { addNewReview, getReviewsForMovie, showNotification, userAlreadyReviewed } from '../services/reviewServices.js';

export const reviewTemplate = (ctx, review, currentUser, isProfileOwner) => html`
<div class="review">
${currentUser && (currentUser.id == review.user || review.user.id == currentUser.id || currentUser.role == 'Administrator')
    ? html`
  <section class='user-review-btns'>
  <button @click="${(e) => editReviewHandler(ctx, e, review)}" class='edit-review-btn' data-review-id="${review.id}"><i class="fa-regular fa-pen-to-square"></i></button>
  <button @click="${(e) => deleteReviewHandler(ctx, e, review)}" class='delete-review-btn' data-review-id="${review.id}"><i class="fa-solid fa-trash-can"></i></button>
  ${isProfileOwner ? html`<a href='${review.content_type}/${review.object_id}' @click="${(e) => scrollToBottom()}" class='redirect-review-btn' data-review-id="${review.id}"><i class="fa-solid fa-share-from-square"></i></a>` : ''}
  
  </section>`
    : ''}
    <h3 class="review-title-details">${review.review_title}</h3>
    <div class="review-header">
    <a href='user/${review.username || review.user.username}'><img src="${isProfileOwner ? currentUser.profile.profile_picture : review.user.profile.profile_picture}" alt="Avatar" onerror="this.onerror=null; this.src='../../images/default-user.png';"></a>
      <div class="review-info">
        <a href='user/${review.username || review.user.username}' class="reviewer-name">${review.username || review.user.username}</a>
        <p class="movie-score reviewer-rating">Rating: ${review.rating} <i id="star-review" class="fa-solid fa-star"></i></p>
      </div>
    </div>
    <div class="review-body">
      <p>${review.content}</p>
    </div>
  </div>`

const detailsTemplate = (movie, ctx, type, currentUser, userBookmarks, reviews, alreadyReviewed) => html`
<section class="specific-movie-details">
${console.log(userBookmarks)}
${console.log(movie.id)}
  <div class='details-header'>
  <div class="movie-poster">
    <img src="${movie.image}" alt="Movie Poster">
    
    ${currentUser
    ? html`
    ${movie.creator == currentUser.id || currentUser.role === 'Administrator'
      ? html `<div class='edit-icons-section'>
      <a href='${movie.type}/${movie.id}/edit'><i class="fa-solid fa-wrench edit-movie-icon"></i></a>
      <button class="del-movie-btn" @click="${(e) => deleteMovieHandler(ctx, e, movie)}"><i class="fa-solid fa-trash edit-movie-icon"></i></div></button>
    </div>`
    : ''
      }
            <div class="movie-watchlist">
              <button class="add-to-watchlist-details">
                ${userBookmarks && userBookmarks.includes(movie.id) ? html`
                <span id='to-add' class="fa-stack fa-2x" @click=${() => removeUserBookmark(ctx, movie.id, movie.type, `/${movie.type}/${movie.id}`)}>
                    <i id="details-bookmark-checked" class="fa-solid fa-bookmark fa-stack-2x"></i>
                    <i id='check' class="fa-solid fa-check fa-stack-1x"></i>
                  </span>
                ` : html`
                <span id='to-remove' class="fa-stack fa-2x" @click=${() => addUserBookmark(ctx, movie.id, movie.type, `/${movie.type}/${movie.id}`)}>
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
    <p class="specific-movie-rating"><span class="details-movie-specifics">Rating: </span>${movie.rating == 10 ? html`10` : movie.rating} <i id ="star" class="fa-solid fa-star"></i></p>
    <p class="specific-movie-genre"><span class="details-movie-specifics">Genre: </span>${movie.genres.join(', ')}</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Director: </span>${movie.director}</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Stars: </span>${movie.stars}</p>
    ${type == 'series'
    ? html`<p class="specific-movie-runtime"> <span class="details-movie-specifics">Seasons: </span>${movie.seasons}</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Total Episodes: </span>${movie.episodes}</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Episode length: </span>${movie.movieLength} minutes</p>`
    : html`<p class="specific-movie-runtime"> <span class="details-movie-specifics">Movie runtime: </span>${movie.length}</p>`}
    
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
  <form class="add-review-form ${alreadyReviewed || !currentUser ? 'hidden' : ''}" @submit='${(e) => addNewReview(ctx, e, movie, currentUser)}'>
    <h3>Add a Review:</h3>
    <div class="select-menu specific-form-group">
  <label for="select-rating">Rating: </label>
<div id='select-rating' class="select" @click="${showHideOptions}">
            <span>Select Rating</span>  
            <i class="fas fa-angle-down"></i>
          </div>
          <input type='hidden' id="review-rating-input" name="review-rating">
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
      <input id="reviewer-review-text" name="reviewer-review-text">
    </div>

    <div class="specific-form-group">
      <label for="reviewer-review">Review Description:</label>
      <textarea id="reviewer-review" name="reviewer-review"></textarea>
    </div>
    <p class='invalid-rating'></p>
    <div class="specific-form-group submit-review-btn-wrapper">
      <button class="submit-review-btn" type="submit">Submit Review</button>
    </div>
  </form>
</section>
`

export async function renderMovieDetails(ctx) {
  const type = 'movie';
  const movieId = ctx.params.id;

  await renderDetails(ctx, type, movieId);
}

export async function renderSeriesDetails(ctx) {
  const type = 'series';
  const seriesId = ctx.params.id;

  await renderDetails(ctx, type, seriesId);
}


export async function renderDetails(ctx, type, movieId) {
  let currentObj, userBookmarks, alreadyReviewed, reviews;
  const currentUser = await getUser();

  if (type === 'movie') {
    [currentObj, userBookmarks, reviews, alreadyReviewed] = await Promise.all([
      getMovieDetails(movieId),
      currentUser !== null ? getUserBookmarks(currentUser.id) : null,
      getReviewsForMovie(movieId, 'movie'),
      currentUser !== null ? userAlreadyReviewed(currentUser.id, movieId, 'movie') : false
    ]);
  } else if (type === 'series') {
    [currentObj, userBookmarks, reviews, alreadyReviewed] = await Promise.all([
      getSeriesDetails(movieId),
      currentUser !== null ? getUserBookmarks(currentUser.id) : null,
      getReviewsForMovie(movieId, 'series'),
      currentUser !== null ? userAlreadyReviewed(currentUser.id, movieId, 'series') : false
    ]);
  };
  
  const bookmarks = userBookmarks ? userBookmarks.map(item => item.id) : '';
  const details = detailsTemplate(currentObj, ctx, type, currentUser, bookmarks, reviews, alreadyReviewed);

  ctx.render(details);
};



export function deleteMovieHandler(ctx, ev, movie) {
  const modal = document.querySelector('.modal');
  const deleteMovieForm = document.querySelector('.modal-content');
  modal.style.display = 'block';
  deleteMovieForm ? deleteMovieForm.classList.add('small-modal') : null;
  render(deleteMovieFormTemplate(movie , ctx), deleteMovieForm);
}

const deleteMovieFormTemplate = (movie, ctx) => html`
  <form class="delete-review-form" @submit="${(e) => confirmDeleteMovie(e, movie, ctx)}">
    <h3>Delete Review</h3>
    <p class='confirm-del-movie-text'>Are you sure you want to delete this ${movie.type}?</p>
    <div class="delete-form-group">
      <button @click="${hideModal}" class="confirm-delete-review-btn" type="submit">Delete</button>
      <button @click="${hideModal}" class="cancel-delete-review-btn" type="button" >Cancel</button>
    </div>
  </form>
`;

export async function confirmDeleteMovie(ev, movie, ctx) {
  ev.preventDefault();
  if (movie.type == 'movie'){
    deleteMovie(movie.id);
  } else{
    deleteSeries(movie.id);
  }
  showNotification(`Successfully deleted "${movie.name}".`, 'green')
  ctx.redirect('/dashboard');
};