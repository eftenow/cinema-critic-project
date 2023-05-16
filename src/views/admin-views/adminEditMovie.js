import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { hideModal } from '../../../utils/reviewOperations.js';
import { getMovieDetails, getSeriesDetails, updateMovie, updateSeries } from "../../services/itemServices.js";

const editMovieTemplate = (movie, ctx) => html`
<section class='create-section admin-edit-movie'>
    ${movie.type == 'series' ? html`<h2 class='create-title'>Edit Serie</h2>` : html`<h2 class='create-title'>Edit Movie</h2>`}
<form data-type="${movie.type}" id='${movie.objectId}' class='create-form' @submit="${(e) => editHandler(e, ctx)}">

<div class="create-form-group">
    <label for="create-title-field">Title:</label>
    <input value='${movie.name}' type="text" id="create-title-field" name="create-title-field" class="create-form-control create-title-field" required>
  </div>
  <div class="create-form-group">
    <label for="create-genre">Genre:</label>
    <input value='${movie.genres}' type="text" id="create-genre" name="create-genre" class="create-form-control create-genre" required>
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
    <input value='${movie.movieLength}' type="text" id="create-length" name="create-length" class="create-form-control create-length" required>
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

  const editMovieForm = document.querySelector('.modal');
  render(editMovieTemplate(movie, ctx), editMovieForm);
}



async function editHandler(ev, ctx) {
  ev.preventDefault();
  const id = ev.target.id;
  const type = ev.target.getAttribute("data-type");
  console.log(id);
  console.log(type);
  const form = new FormData(ev.target);
  const name = form.get('create-title-field');
  const year = Number(form.get('create-year'));
  let rating;
  const image = form.get('create-imageUrl');
  const description = form.get('create-description');
  const director = form.get('create-director');
  const genres = form.get('create-genre');
  const stars = form.get('create-stars');
  const trailer = form.get('create-trailer');
  const movieLength =  form.get('create-length');

  const updatedItem = { name, type, year, rating, image, description, stars, director, genres, trailer, movieLength };
  console.log(updatedItem);
  if (Object.values(updatedItem).some((x) => !x && x != rating)) {
    return alert('All fields must be filled!');
  }

  if (type === 'series') {
    updatedItem['episodes'] = Number(form.get('edit-episodes'));
    updatedItem['seasons'] = Number(form.get('edit-seasons'));
    await updateSeries(id, updatedItem);
  } else {
    await updateMovie(id, updatedItem);
  }

  type == 'series' ? ctx.redirect('/admin/series') : ctx.redirect('/admin/movies');
  hideModal();
}