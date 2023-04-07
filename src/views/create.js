import { html } from '../../node_modules/lit-html/lit-html.js';
import { createNewMovie, createNewSeire } from '../services/itemServices.js';



const createTemplate = (ctx, type) => html`
<section class='create-section'>
    ${type == 'series' ? html`<h2 class='create-title'>Create Serie</h2>` : html`<h2 class='create-title'>Create Movie</h2>`}
<form id="${type}" class='create-form' @submit="${(e) => createHandler(e, ctx)}">

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

  ${type == 'series' ? html`<div class="create-form-group">
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

export function renderCreateMovie(ctx) {
  const type = 'movie';
  const create = createTemplate(ctx, type);
  ctx.render(create);
};

export function renderCreateSeries(ctx) {
  const type = 'series';
  const create = createTemplate(ctx, type);
  ctx.render(create);
};

async function createHandler(ev, ctx) {
  ev.preventDefault();
  let type = ev.target.id;

  let form = new FormData(ev.target);
  let name = form.get('create-title-field');
  let year = Number(form.get('create-year'));
  let rating;
  let image = form.get('create-imageUrl');
  let description = form.get('create-description');
  let director = form.get('create-director');
  let genres = form.get('create-genre');
  let stars = form.get('create-stars');
  let trailer = form.get('create-trailer');
  let movieLength =  form.get('create-length');


  let newItem = { name, type, year, rating, image, description, stars, director, genres, trailer, movieLength }

  if (Object.values(newItem).some((x) => !x && x != rating)) {
    return alert('All fields must be filled!')
  };

  if(type == 'series'){
    newItem['episodes'] = Number(form.get('create-episodes'));
    newItem['seasons'] = Number(form.get('create-seasons'));
    await createNewSeire(newItem);
  } else{
    await createNewMovie(newItem);
  };

  ctx.redirect('/dashboard');

};
