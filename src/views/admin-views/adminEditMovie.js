import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { hideModal } from '../../../utils/reviewOperations.js';
import { getMovieDetails, getSeriesDetails, editExistingMovie, editExistingSeries, getAllGenres } from "../../services/itemServices.js";

const editMovieTemplate = (movie, ctx, genres) => html`
<section class='create-section admin-edit-movie'>
    ${movie.type == 'series' ? html`<h2 class='create-title'>Edit Serie</h2>` : html`<h2 class='create-title'>Edit Movie</h2>`}
<form data-type="${movie.type}" id='${movie.id}' class='create-form' @submit="${(e) => editHandler(e, ctx, movie.type, movie.id)}">

<div class="create-form-group">
    <label for="create-title-field">Title:</label>
    <input type="text" id="create-title-field" name="create-title-field" class="create-form-control create-title-field" value=${movie.name}>
    <p class='incorrect-title-msg incorrect-create'></p>
  </div>

  <div class="create-form-group">
  <label for="create-genres-field">Genres (up to 4):</label>
  <div class="container-genre-select">
  <div class="select-btn-genre">
  <span  id='genres-selected' class="btn-text-genre">${movie.genres.join(', ')}</span>
  <span class="arrow-dwn-genre">
    <i class="fa-solid fa-chevron-down"></i>
  </span>
</div>
<ul class="list-items-genre">
${genres.map(genre => html`
  <li class="${movie.genres.includes(genre) ? 'item-genre checked checked-genre' : 'item-genre'}">${genre}</li>
`)}
</ul>
</div>
<p class='incorrect-genre-msg incorrect-create'></p>
</div>
  <div class="create-form-group">
    <label for="create-imageUrl">Image url:</label>
    <input value='${movie.image}' type="text" id="create-imageUrl" name="create-imageUrl" class="create-form-control create-imageUrl" required>
  </div>
  <div class="create-form-group">
    <label for="create-director">Director:</label>
    <input value='${movie.director}' type="text" id="create-director" name="create-director" class="create-form-control create-director" required>
  </div>
  <div class="create-form-group">
    <label for="create-stars">Stars:</label>
    <input value='${movie.stars}' type="text" id="create-stars" name="create-stars" class="create-form-control create-stars" required>
  </div>

  ${movie.type == 'series' ? html`<div class="create-form-group">
    <label for="create-seasons">Number of Seasons:</label>
    <input value='${movie.seasons}' type="number" id="create-seasons" name="create-seasons" class="create-form-control create-seasons">
  </div>
  <div class="create-form-group">
    <label for="create-episodes">Number of Episodes:</label>
    <input value='${movie.episodes}' type="number" id="create-episodes" name="create-episodes" class="create-form-control create-episodes">
  </div>`
   : ''}

  <div class="create-form-group">
    <label for="create-length">Length:</label>
    <input value='${movie.length}' type="text" id="create-length" name="create-length" class="create-form-control create-length" required>
  </div>
  <div class="create-form-group">
    <label for="create-year">Release Year:</label>
    <input value='${movie.year}' type="number" id="create-year" name="create-year" class="create-form-control create-year" required>
  </div>
  <div class="create-form-group">
    <label for="create-trailer">Trailer Url:</label>
    <input value='${movie.trailer}' type="text" id="create-trailer" name="create-trailer" class="create-form-control create-trailer" required>
  </div>

  <div class="create-form-group">
    <label for="create-description">Description:</label>
    <textarea id="create-description" name="create-description" class="create-form-control create-description" required>${movie.description}</textarea>
  </div>
  <div class='admin-edit-btns'>
  <button  type="submit" class="btn btn-primary">Edit</button>
  <button @click="${() => hideModal()}" type="button" class="btn btn-primary cancel-edit-btn">Cancel</button>
</form>
  </div>
</section>`

export async function renderEditMovieAdmin(ev, movieId, ctx, type) {
  let movie;

  ev.preventDefault();
  if (type=='series'){
    movie = await getSeriesDetails(movieId);
  } else{
    movie = await getMovieDetails(movieId);
  }
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
  const genres = await getAllGenres();

  const editMovieForm = document.querySelector('.modal');
  const editTemplate = editMovieTemplate(movie, ctx, genres);
  console.log(editTemplate);
  render(editTemplate, editMovieForm);
}



async function editHandler(ev, ctx, type, id) {
  ev.preventDefault();
  let form = new FormData(ev.target);
  let name = form.get('create-title-field');
  let year = Number(form.get('create-year'));
  let image = form.get('create-imageUrl');

  let description = form.get('create-description');
  let director = form.get('create-director');
  let genres = document.getElementById('genres-selected').textContent;
  let stars = form.get('create-stars');
  let trailer = form.get('create-trailer');
  let length = form.get('create-length');


  genres = genres.split(', ');
  let updatedItem = { id, name, year, director, stars, genres, trailer, image, length, description}

  if (Object.values(updatedItem).some((x) => !x && x != rating)) {
    return alert('All fields must be filled!');
  }

  if (type === 'series') {
    updatedItem['episodes'] = Number(form.get('create-episodes'));
    updatedItem['seasons'] = Number(form.get('create-seasons'));
    console.log(updatedItem);
    await editExistingSeries(id, updatedItem);
  } else {
    await editExistingMovie(id, updatedItem);
  }

  type == 'series' ? ctx.redirect('/admin/series') : ctx.redirect('/admin/movies');
  hideModal();
}