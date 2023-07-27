import { html } from '../../node_modules/lit-html/lit-html.js';
import { handleGenreSelection, removeGenreSelectionHandlers } from '../../utils/dropdowns.js';
import { createNewMovie, createNewSeire, getAllGenres } from '../services/itemServices.js';
import { raiseCreateErrors } from '../validators/createMovieSeriesValidator.js';


const createTemplate = (ctx, type, genres) => html`
<section class='create-section'>
    ${type == 'series' ? html`<h2 class='create-title'>Create Serie</h2>` : html`<h2 class='create-title'>Create Movie</h2>`}
<form id="${type}" class='create-form' @submit="${(e) => createHandler(e, ctx, type)}">

<div class="create-form-group">
    <label for="create-title-field">Title:</label>
    <input type="text" id="create-title-field" name="create-title-field" class="create-form-control create-title-field">
    <p class='incorrect-title-msg incorrect-create'></p>
  </div>

  <div class="create-form-group">
  <label for="create-genres-field">Genres (up to 4):</label>
  <div class="container-genre-select">
  <div class="select-btn-genre">
  <span id='genres-selected' class="btn-text-genre" >Select Genre</span>
  <span class="arrow-dwn-genre">
    <i class="fa-solid fa-chevron-down"></i>
  </span>
</div>
<ul class="list-items-genre">
${genres.map(genre => html`
  <li class="item-genre">${genre}</li>
`)}
</ul>
</div>
</div>
    <p class='incorrect-genre-msg incorrect-create'></p>
  </div>

  <div class="create-form-group">
    <label for="create-imageUrl">Image url:</label>
    <input type="text" id="create-imageUrl" name="create-imageUrl" class="create-form-control create-imageUrl">
    <p class='incorrect-imageUrl-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-director">Director:</label>
    <input type="text" id="create-director" name="create-director" class="create-form-control create-director">
    <p class='incorrect-director-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-stars">Stars:</label>
    <input type="text" id="create-stars" name="create-stars" class="create-form-control create-stars">
    <p class='incorrect-stars-msg incorrect-create'></p>
  </div>

  ${type == 'series' ? html`<div class="create-form-group">
    <label for="create-seasons">Number of Seasons:</label>
    <input type="number" id="create-seasons" name="create-seasons" class="create-form-control create-seasons">
    <p class='incorrect-seasons-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-episodes">Number of Episodes:</label>
    <input type="number" id="create-episodes" name="create-episodes" class="create-form-control create-episodes">
    <p class='incorrect-episodes-msg incorrect-create'></p>
  </div>`
   : ''}

  <div class="create-form-group">
    <label for="create-length">Length:</label>
    <input type="text" id="create-length" name="create-length" class="create-form-control create-length">
    <p class='incorrect-length-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-year">Release Year:</label>
    <input type="number" id="create-year" name="create-year" class="create-form-control create-year">
    <p class='incorrect-year-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-trailer">Trailer Url:</label>
    <input type="text" id="create-trailer" name="create-trailer" class="create-form-control create-trailer">
    <p class='incorrect-trailer-msg incorrect-create'></p>
  </div>

  <div class="create-form-group">
    <label for="create-description">Description:</label>
    <textarea id="create-description" name="create-description" class="create-form-control create-description"></textarea>
    <p class='incorrect-description-msg incorrect-create'></p>
  </div>
  <button type="submit" class="btn btn-primary">Create</button>
</form>
</section>`

export async function renderCreateMovie(ctx) {
  const genres = await getAllGenres();
  const type = 'movie';
  const create = createTemplate(ctx, type, genres);
  ctx.render(create);
  handleGenreSelection()
};

export async function renderCreateSeries(ctx) {
  const genres = await getAllGenres();
  const type = 'series';
  const create = createTemplate(ctx, type, genres);
  ctx.render(create);
};

async function createHandler(ev, ctx, type) {
  ev.preventDefault();

  let form = new FormData(ev.target);
  let name = form.get('create-title-field');
  let year = Number(form.get('create-year'));
  let rating;
  let image = form.get('create-imageUrl');
  let description = form.get('create-description');
  let director = form.get('create-director');
  let genres = document.getElementById('genres-selected').textContent;
  let stars = form.get('create-stars');
  let trailer = form.get('create-trailer');
  let length =  form.get('create-length');

  genres = genres.split(', ');
  let newItem = { name,  year, director, stars, genres, trailer, image, length, description }
  console.log(newItem);


  let createdItem;

    if(type == 'series'){
        newItem['episodes'] = Number(form.get('create-episodes'));
        newItem['seasons'] = Number(form.get('create-seasons'));
        createdItem = await createNewSeire(newItem);
    } else{
        createdItem = await createNewMovie(newItem);
    };
    const hasErrors = raiseCreateErrors(createdItem);
    
    if (!hasErrors) {
        ctx.redirect('/dashboard');
    }
    removeGenreSelectionHandlers()
};
