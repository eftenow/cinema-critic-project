import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const adminMoviesTemplate = (ctx) => html`
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
    <tr>
      <td>Movie 1</td>
      <td>Action</td>
      <td>8.5</td>
      <td>100</td>
      <td>
      <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
    <tr>
      <td>Movie 2</td>
      <td>Comedy</td>
      <td>7.5</td>
      <td>200</td>
      <td>
      <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
    <tr>
      <td>Movie 3</td>
      <td>Drama</td>
      <td>9.0</td>
      <td>150</td>
      <td>
      <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
  </tbody>
</table>
`

export function renderMoviesAdmin(ctx) {
    const siteMovies = adminMoviesTemplate();

    ctx.render(siteMovies);
}