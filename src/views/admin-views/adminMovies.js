import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllMovies } from '../../services/itemServices.js';
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
  ${movies.map(movie => movieTemplateAdmin(movie))}
  </tbody>
</table>
`

const movieTemplateAdmin = (movie) => html`
<tr>  
      <td>${movie.name}</td>
      <td>${movie.genres}</td>
      <td>${movie.rating}</td>
      <td>${movie.visits}</td>
      <td>
        <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
`

const adminUsersTemplate = (ctx, users) => html`
  <h2 class='admin-table-header'>Users</h2>
  <table class="user-table">
  <thead>
    <tr>
      <th>Username</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  ${users.map(user => userTemplateAdmin(user))}
  </tbody>
</table>
`

export async function renderMoviesAdmin(ctx) {
    const movies = await getAllMovies();
    const siteMovies = adminMoviesTemplate(ctx, movies);
    setActiveNavLink('/admin/movies');
    ctx.render(siteMovies);
}