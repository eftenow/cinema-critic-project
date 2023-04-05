import { html } from '../../node_modules/lit-html/lit-html.js';
import { createNew } from '../services/itemServices.js';


const createTemplate = (ctx) => html`
<section class='create-section'>
    <h2 class='create-title'>Create Movie</h2>
<form class='create-form'>

<div class="create-form-group">
    <label for="create-title-field">Title:</label>
    <input type="text" id="create-title-field" name="create-title-field" class="create-form-control create-title-field" required>
  </div>

  <div class="create-form-group">
    <label for="create-type">Type</label>
    <select id="create-type" name="create-type" class="create-form-control create-type" required>
      <option value="">Choose type</option>
      <option value="movie">Movie</option>
      <option value="tvshow">TV Show</option>
    </select>
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
  <div class="create-form-group create-tvshow-only">
    <label for="create-seasons">Number of Seasons:</label>
    <input type="number" id="create-seasons" name="create-seasons" class="create-form-control create-seasons">
  </div>
  <div class="create-form-group create-tvshow-only">
    <label for="create-episodes">Number of Episodes:</label>
    <input type="number" id="create-episodes" name="create-episodes" class="create-form-control create-episodes">
  </div>
  <div class="create-form-group">
    <label for="create-length">Length:</label>
    <input type="text" id="create-length" name="create-length" class="create-form-control create-length" required>
  </div>
  <div class="create-form-group">
    <label for="create-year">Release Year:</label>
    <input type="number" id="create-year" name="create-year" class="create-form-control create-year" required>
  </div>
  <div class="create-form-group">
    <label for="create-description">Description:</label>
    <textarea id="create-description" name="create-description" class="create-form-control create-description" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
</section>`

export function renderCreate(ctx) {
    const create = createTemplate(ctx);
    ctx.render(create);
};

async function onCreateHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let brand = form.get('brand');
    let model = form.get('model');
    let imageUrl = form.get('imageUrl');
    let release = form.get('release');
    let designer = form.get('designer');
    let value = form.get('value');

    let newItem = { brand, model, imageUrl, release, designer, value };

    if (Object.values(newItem).some((x) => !x)) {
        return alert('All fields must be filled!')
    };

    await createNew(newItem);

    ctx.redirect('/dashboard');

};
