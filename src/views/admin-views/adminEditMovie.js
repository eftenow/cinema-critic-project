import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getMovieDetails } from "../../services/itemServices.js";

const editMovieTemplate = (movie, ctx) => html`
<section class='create-section admin-edit-movie'>
    ${movie.type == 'series' ? html`<h2 class='create-title'>Edit Serie</h2>` : html`<h2 class='create-title'>Edit Movie</h2>`}
<form id="${movie.type}" class='create-form' @submit="${(e) => editHandler(e)}">

<div class="create-form-group">
    <label for="create-title-field">Title:</label>
    <input type="text" id="create-title-field" name="create-title-field" class="create-form-control create-title-field" required>
  </div>
  <div class="create-form-group">
    <label for="create-genre">Genre:</label>
    <input type="text" id="create-genre" name="create-genre" class="create-form-control create-genre" required>
  </div>
  <div class="create-form-group">
    <label for="create-imageUrl">Image url:</label>
    <input type="text" id="create-imageUrl" name="create-imageUrl" class="create-form-control create-imageUrl" required>
  </div>
  <div class="create-form-group">
    <label for="create-director">Director:</label>
    <input type="text" id="create-director" name="create-director" class="create-form-control create-director" required>
  </div>
  <div class="create-form-group">
    <label for="create-stars">Stars:</label>
    <input type="text" id="create-stars" name="create-stars" class="create-form-control create-stars" required>
  </div>

  ${movie.type == 'series' ? html`<div class="create-form-group">
    <label for="create-seasons">Number of Seasons:</label>
    <input type="number" id="create-seasons" name="create-seasons" class="create-form-control create-seasons">
  </div>
  <div class="create-form-group">
    <label for="create-episodes">Number of Episodes:</label>
    <input type="number" id="create-episodes" name="create-episodes" class="create-form-control create-episodes">
  </div>`
   : ''}

  <div class="create-form-group">
    <label for="create-length">Length:</label>
    <input type="text" id="create-length" name="create-length" class="create-form-control create-length" required>
  </div>
  <div class="create-form-group">
    <label for="create-year">Release Year:</label>
    <input type="number" id="create-year" name="create-year" class="create-form-control create-year" required>
  </div>
  <div class="create-form-group">
    <label for="create-trailer">Trailer Url:</label>
    <input type="text" id="create-trailer" name="create-trailer" class="create-form-control create-trailer" required>
  </div>

  <div class="create-form-group">
    <label for="create-description">Description:</label>
    <textarea id="create-description" name="create-description" class="create-form-control create-description" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
</section>`

export function renderEditMovieAdmin(ev, movieId, ctx) {
  ev.preventDefault();
  const movie = getMovieDetails(movieId);
  console.log(movie);
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';

  const editMovieForm = document.querySelector('.modal');
  render(editMovieTemplate(movie, ctx), editMovieForm);
}


async function editHandler(ev) {
  ev.preventDefault();
  let itemId = ev.target.id;

  let form = new FormData(ev.target);
  let type = form.get('edit-type');
  let name = form.get('edit-title-field');
  let year = Number(form.get('edit-year'));
  let rating;
  let image = form.get('edit-imageUrl');
  let description = form.get('edit-description');
  let director = form.get('edit-director');
  let genres = form.get('edit-genre');
  let stars = form.get('edit-stars');
  let trailer = form.get('edit-trailer');
  let movieLength = form.get('edit-length');

  let updatedItem = { name, type, year, rating, image, description, stars, director, genres, trailer, movieLength };
  console.log(updatedItem);
  // if (Object.values(updatedItem).some((x) => !x && x != rating)) {
  //   return alert('All fields must be filled!');
  // }

  // if (type === 'series') {
  //   updatedItem['episodes'] = Number(form.get('edit-episodes'));
  //   updatedItem['seasons'] = Number(form.get('edit-seasons'));
  //   await updateSeries(itemId, updatedItem);
  // } else {
  //   await updateMovie(itemId, updatedItem);
  // }

  // ctx.redirect('/dashboard');
}