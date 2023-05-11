import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { setActiveNavLink } from './adminNavigation.js';

const adminSeriesTemplate = (ctx) => html`
  <h2 class='admin-table-header'>TV Shows</h2>
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
      <td>8.5 <i class="fa-solid fa-star"></i></td>
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
      <td>7.5 <i class="fa-solid fa-star"></i></td>
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
      <td>9.0 <i class="fa-solid fa-star"></i></td>
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

export function renderSeriesAdmin(ctx) {
    const siteSeries = adminSeriesTemplate();
    setActiveNavLink('/admin/series');
    ctx.render(siteSeries);
}

