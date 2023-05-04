import { html, render } from '../../../node_modules/lit-html/lit-html.js';

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
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>Movie 2</td>
      <td>Comedy</td>
      <td>7.5 <i class="fa-solid fa-star"></i></td>
      <td>200</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>Movie 3</td>
      <td>Drama</td>
      <td>9.0 <i class="fa-solid fa-star"></i></td>
      <td>150</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
  </tbody>
</table>

`

export function renderSeriesAdmin(ctx) {
    const siteSeries = adminSeriesTemplate();

    ctx.render(siteSeries);
}

