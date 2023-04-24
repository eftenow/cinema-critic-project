import { html } from '../../node_modules/lit-html/lit-html.js';
import { backToTopHandler } from '../../utils/backToTopBtn.js';
import { selectOption, showHideOptions } from '../../utils/dropdowns.js';
import { addUserBookmark, getUser, getUserBookmarks, removeUserBookmark } from '../services/authServices.js';
import { getMovieDetails, getSeriesDetails } from '../services/itemServices.js';


const detailsTemplate = (movie, ctx, type, currentUser, userBookmarks) => html`
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

  
  <div class="review">
    <h3 class="review-title-details">Best series for the year!!</h3>
    <div class="review-header">
      <img src="https://via.placeholder.com/50x50" alt="Avatar" >
      <div class="review-info">
        <p class="reviewer-name">Peter</p>
        <p class="movie-score reviewer-rating">Rating: 10 <i id="star" class="fa-solid fa-star"></i></p>
      </div>
    </div>
    <div class="review-body">
      <p>I really enjoyed Tulsa King, this is hands down one of the best series that came out in 2023.</p>
    </div>
  </div>

  <div class="review" id='review-section'>
  <h3 class="review-title-details">Very good</h3>
    <div class="review-header">
      <img src="https://via.placeholder.com/50x50" alt="Avatar" >
      <div class="review-info">
        <p class="reviewer-name">George</p>
        <p class="movie-score reviewer-rating">Rating: 9 <i id="star" class="fa-solid fa-star"></i></p>
      </div>
    </div>
    <div class="review-body">
      <p>Awesome series!</p>
    </div>
  </div>

  <form class="add-review-form">
    <h3>Add a Review:</h3>
<div class="select-menu specific-form-group">
  <label for="select-rating">Rating: </label>
    <div id='select-rating' class="select" @click="${showHideOptions}">
      <span>Select rating</span>
      <i class="fas fa-angle-down"></i>
    </div>
    <div class="options-list" @click="${selectOption}">
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
  const type = 'movie';
  const movieId = ctx.params.id;
  const [currentMovie, currentUser, userBookmarks] = await Promise.all([
    getMovieDetails(movieId),
    getUser(),
    getUserBookmarks(),
  ]);
  const details = detailsTemplate(currentMovie, ctx, type, currentUser, userBookmarks);

  ctx.render(details);
};

export async function renderSeriesDetails(ctx) {
  const type = 'series';
  const seriesId = ctx.params.id;
  const [currentSeries, currentUser, userBookmarks] = await Promise.all([
    getSeriesDetails(seriesId),
    getUser(),
    getUserBookmarks(),
  ]);


  const details = detailsTemplate(currentSeries, ctx, type, currentUser, userBookmarks);
  const autocomBox = document.querySelector('.autocom-box');
  autocomBox.style.display = 'none';

  ctx.render(details);
};




// async function onDeleteHandler(ev, ctx) {
//   ev.preventDefault();
//   const confirmation = confirm("Are you sure you want to delete this item?");

//   if (confirmation == true) {
//     await deleteItem(ctx.params.id);
//     ctx.redirect('/dashboard');
//   } else {
//     return;
//   }
// };
