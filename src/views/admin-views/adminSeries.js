import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllSeries } from '../../services/itemServices.js';
import { setActiveNavLink } from './adminNavigation.js';

const seriesTemplateAdmin = (series) => html`
<tr>  
      <td>${series.name}</td>
      <td>${series.genres}</td>
      <td>${series.rating}</td>
      <td>${series.visits}</td>
      <td>
        <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
`
const adminSeriesTemplate = (ctx, series) => html`
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
  ${series.map(currentSeries => seriesTemplateAdmin(currentSeries))}
  </tbody>
</table>

`

export async function renderSeriesAdmin(ctx) {
    const series = await getAllSeries();
    const siteSeries = adminSeriesTemplate(ctx, series);
    setActiveNavLink('/admin/series');
    ctx.render(siteSeries);
}

