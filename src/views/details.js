import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getDetails, getLikesCount, likeAlbum, userAlreadyLiked } from '../services/itemServices.js';
import { getUser, getUserId } from '../services/authServices.js';


const detailsTemplate = (item, isOwner, ctx) => html`
<section class="specific-movie-details">
  <div class="movie-poster">
    <img src="../../images/king-of-tulsa.jpg" alt="Movie Poster">
    <button class="add-to-watchlist">Add to Watchlist</button>
  </div>
  <div class="specific-movie-info">
    <h2 class="specific-movie-title">Tulsa King</h2>
    <p class="specific-movie-genre">Genre: Action</p>
    <p class="specific-movie-cast">Director: Francis Ford Coppola</p>
    <p class="specific-movie-cast">Stars: Marlon Brando, Al Pacino</p>
    <p class="specific-movie-runtime">Seasons: 1</p>
    <p class="specific-movie-runtime">Episodes: 10x</p>
    <p class="specific-movie-runtime">Episode length: 50 minutes</p>
    <p class="specific-movie-release-year">Release year: 2023</p>
    <p class="specific-movie-description">Description: Following his release from prison, Mafia capo Dwight "The General"
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
    <div class="review-header">
      <img src="https://via.placeholder.com/50x50" alt="Avatar" >
      <div class="review-info">
        <p class="reviewer-name">John Doe</p>
        <p class="reviewer-rating">Rating: 8</p>
      </div>
    </div>
    <div class="review-body">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mauris eu nisi sodales lobortis vel at ipsum. Proin dignissim, sapien sed aliquam pulvinar, velit velit rhoncus lacus, ac sollicitudin quam odio nec justo.</p>
    </div>
  </div>

  <!-- Form for adding new review -->
  <form class="add-review-form">
    <h3>Add a Review:</h3>
    
    <div class="specific-form-group">
      <label for="reviewer-rating">Rating:</label>
      <select id="reviewer-rating" name="reviewer-rating" required>
        <option value="" selected disabled>Select a Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div class="specific-form-group">
      <label for="reviewer-review">Review:</label>
      <textarea id="reviewer-review" name="reviewer-review" required></textarea>
    </div>
    <div class="specific-form-group">
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

