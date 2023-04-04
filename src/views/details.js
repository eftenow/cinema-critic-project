import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getDetails, getLikesCount, likeAlbum, userAlreadyLiked } from '../services/itemServices.js';
import { getUser, getUserId } from '../services/authServices.js';
import { selectOption, showHideOptions } from '../../utils/dropdowns.js';


const detailsTemplate = (item, isOwner, ctx) => html`
<section class="specific-movie-details">
  <div class="movie-poster">
    <img src="../../images/king-of-tulsa.jpg" alt="Movie Poster">
    <div class="movie-watchlist">
                <button class="add-to-watchlist details-watchlist">
                <span class="fa-stack fa-2x">
                        <i id="details-bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
                        <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
                    </span>
                </button>
            </div>
  </div>
  <div class="specific-movie-info">
    <h2 class="specific-movie-title details-movie-specifics">Tulsa King</h2>
    <p class="specific-movie-genre"><span class="details-movie-specifics">Genre: </span>Action</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Director: </span>Francis Ford Coppola</p>
    <p class="specific-movie-cast"> <span class="details-movie-specifics">Stars: </span>Marlon Brando, Al Pacino</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Seasons: </span>1</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Episodes: </span>10</p>
    <p class="specific-movie-runtime"> <span class="details-movie-specifics">Episode length: </span>50 minutes</p>
    <p class="specific-movie-release-year"><span class="details-movie-specifics">Release year:</span> 2023</p>
    <p class="specific-movie-description"><span class="details-movie-specifics">Description: </span>Following his release from prison, Mafia capo Dwight "The General"
                        Manfredi is exiled to Tulsa, Oklahoma, where he builds a new criminal empire with a group of
                        unlikely characters.</p>
    
  </div>
  <div class="trailer-section">
  
    <h3>Trailer</h3>
    <iframe class="trailer-video" width="560" height="315" src="https://www.youtube.com/embed/aaQSScwZPbA" frameborder="0" allowfullscreen></iframe>
  </div>
</section>

<section class="specific-movie-reviews"> 
  <h2 class="reviews-title">Reviews:</h2>

  <!-- Example review -->
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

  <div class="review">
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


export async function renderDetails(ctx) {
  const details = detailsTemplate();

  ctx.render(details);
};




async function onDeleteHandler(ev, ctx) {
  ev.preventDefault();
  const confirmation = confirm("Are you sure you want to delete this item?");

  if (confirmation == true) {
    await deleteItem(ctx.params.id);
    ctx.redirect('/dashboard');
  } else {
    return;
  }
};

