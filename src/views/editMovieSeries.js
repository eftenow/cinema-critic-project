import { html } from '../../node_modules/lit-html/lit-html.js';
import { handleGenreSelection, removeGenreSelectionHandlers } from '../../utils/dropdowns.js';
import { editExistingMovie, editExistingSeries, getAllGenres, getMovieDetails, getSeriesDetails } from '../services/itemServices.js';
import { raiseCreateErrors } from '../validators/createMovieSeriesValidator.js';


const editTemplate = (movie, ctx, type, genres, id) => html`
${console.log(movie)}
<section class='create-section'>
    ${type == 'series' ? html`<h2 class='create-title'>Create Serie</h2>` : html`<h2 class='create-title'>Edit ${movie.type}</h2>`}
<form id="${type}" class='create-form' @submit="${(e) => editHandler(e, ctx, type, id)}">

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
    <input value=${movie.image} type="text" id="create-imageUrl" name="create-imageUrl" class="create-form-control create-imageUrl">
    <p class='incorrect-imageUrl-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-director">Director:</label>
    <input value=${movie.director} type="text" id="create-director" name="create-director" class="create-form-control create-director">
    <p class='incorrect-director-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-stars">Stars:</label>
    <input value=${movie.stars} type="text" id="create-stars" name="create-stars" class="create-form-control create-stars">
    <p class='incorrect-stars-msg incorrect-create'></p>
  </div>

  ${type == 'series' ? html`<div class="create-form-group">
    <label for="create-seasons">Number of Seasons:</label>
    <input value=${movie.seasons} type="number" id="create-seasons" name="create-seasons" class="create-form-control create-seasons">
    <p class='incorrect-seasons-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-episodes">Number of Episodes:</label>
    <input value=${movie.episodes} type="number" id="create-episodes" name="create-episodes" class="create-form-control create-episodes">
    <p class='incorrect-episodes-msg incorrect-create'></p>
  </div>`
   : ''}

  <div class="create-form-group">
    <label for="create-length">${type=='series' ? 'Episode length:' : 'Movie length:'}</label>
    <input value=${movie.length} type="text" id="create-length" name="create-length" class="create-form-control create-length">
    <p class='incorrect-length-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-year">Release Year:</label>
    <input value=${movie.year} type="number" id="create-year" name="create-year" class="create-form-control create-year">
    <p class='incorrect-year-msg incorrect-create'></p>
  </div>
  <div class="create-form-group">
    <label for="create-trailer">Trailer Url:</label>
    <input value=${movie.trailer} type="text" id="create-trailer" name="create-trailer" class="create-form-control create-trailer">
    <p class='incorrect-trailer-msg incorrect-create'></p>
  </div>

  <div class="create-form-group">
    <label for="create-description">Description:</label>
    <textarea id="create-description" name="create-description" class="create-form-control create-description">${movie.description}</textarea>
    <p class='incorrect-description-msg incorrect-create'></p>
  </div>
  <button type="submit" class="btn btn-primary">Edit</button>
</form>
</section>`

export async function renderEditMovie(ctx) {
  const movieId = ctx.params.id;
  const genres = await getAllGenres();
  const movie = await getMovieDetails(movieId);

  console.log(movieId);
  const type = 'movie';
  const create = editTemplate(movie, ctx, type, genres, movieId);
  ctx.render(create);
  handleGenreSelection()
};

export async function renderEditSeries(ctx) {
  const seriesId = ctx.params.id;
  const series = await getSeriesDetails(seriesId);
  const genres = await getAllGenres();
  const type = 'series';
  const create = editTemplate(series, ctx, type, genres, seriesId);
  ctx.render(create);
  handleGenreSelection()
};

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
  let length =  form.get('create-length');

  genres = genres.split(', ');
  let editedContent = {id, name,  year, director, stars, genres, trailer, image, length, description }


  let createdItem;
  let isSeries = false

    if(type == 'series'){
        editedContent['episodes'] = Number(form.get('create-episodes'));
        editedContent['seasons'] = Number(form.get('create-seasons'));
        isSeries = true
        createdItem = await editExistingSeries(id, editedContent);
    } else{
        createdItem = await editExistingMovie(id, editedContent);
    };

    const hasErrors = raiseCreateErrors(createdItem, isSeries);
    console.log(createdItem);

    if (!hasErrors) {
        ctx.redirect(`/${type}/${id}`);
    }
    
};
