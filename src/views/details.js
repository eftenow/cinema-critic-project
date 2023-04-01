import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteItem, getDetails, getLikesCount, likeAlbum, userAlreadyLiked } from '../services/itemServices.js';
import { getUser, getUserId } from '../services/authServices.js';


const detailsTemplate = (item, isOwner, ctx) => html`
<div class="movie-details">
  <div class="movie-poster">
    <img src="https://via.placeholder.com/150x225" alt="Movie Poster">
    <button class="add-to-watchlist">Add to Watchlist</button>
  </div>
  <div class="movie-info">
    <h2 class="movie-title">Movie Title</h2>
    <p class="movie-genre">Movie Genre</p>
    <p class="movie-runtime">Movie Runtime</p>
    <p class="movie-release-year">Movie Release Year</p>
    <p class="movie-description">Movie Description</p>
  </div>
  <div class="trailer-section">
    <h3>Trailer</h3>
    <iframe class="trailer-video" width="560" height="315" src="https://www.youtube.com/embed/aaQSScwZPbA" frameborder="0" allowfullscreen></iframe>
  </div>
</div>

<!-- <div class="movie">
  <img class="movie-poster" src="movie-poster.jpg" alt="Movie Poster">
  <div class="movie-details">
    <h2 class="movie-title">Movie Title</h2>
    <p class="movie-info"><span class="movie-year">Year</span> | <span class="movie-genre">Genre</span> | <span class="movie-runtime">Runtime</span></p>
    <p class="movie-description">Movie Description</p>
    <div class="movie-actions">
      <button class="watchlist-button">Add to watchlist</button>
      <div class="trailer-menu">
        <button class="trailer-button">Watch Trailer</button>
        <iframe width="600" height="420" src="https://www.youtube.com/embed/aaQSScwZPbA" title="Tulsa King | Official Trailer | Paramount+" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        
      </div>
    </div>
  </div>
</div> -->

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

