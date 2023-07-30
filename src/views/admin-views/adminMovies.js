import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { scrollToTop } from '../../../utils/backToTopBtn.js';
import { deleteMovie, getAllMovies } from '../../services/itemServices.js';
import { renderEditMovieAdmin } from './adminEditMovie.js';
import { setActiveNavLink } from './adminNavigation.js';

const adminMoviesTemplate = (ctx, movies) => html`
    <h2 class='admin-table-header'>Movies</h2>
  <table class="movie-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Rating</th>
      <th>Visits</th>
      <th>Actions</th> 
    </tr>
  </thead>
  <tbody>
  ${movies.map(movie => movieTemplateAdmin(movie, ctx))}
  </tbody>
</table>
`

const movieTemplateAdmin = (movie, ctx) => html`
<tr>  
      <td>${movie.name}</td>
      <td>${movie.genres}</td>
      <td>${movie.rating}</td>
      <td>${movie.visits}</td>
      <td>
        <button @click='${(e) => renderEditMovieAdmin(e, movie.id, ctx)}' class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click='${() => deleteMovie(movie.id)}' class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <a @click=${scrollToTop} href="/${movie.type}/${movie.id}" class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></a>
      </td>
    </tr>
`


export async function renderMoviesAdmin(ctx) {
    const movies = await getAllMovies();
    const siteMovies = adminMoviesTemplate(ctx, movies);
    setActiveNavLink('/admin/movies');
    ctx.render(siteMovies);
}