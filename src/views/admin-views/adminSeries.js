import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { scrollToTop } from '../../../utils/backToTopBtn.js';
import { deleteMovie, deleteSeries, getAllSeries } from '../../services/itemServices.js';
import { showNotification } from '../../services/reviewServices.js';
import { renderEditMovieAdmin } from './adminEditMovie.js';
import { setActiveNavLink } from './adminNavigation.js';

const seriesTemplateAdmin = (series, ctx) => html`
<tr>  
      <td>${series.name}</td>
      <td>${series.genres.join(', ')}</td>
      <td>${series.rating}</td>
      <td>${series.visits}</td>
      <td>
        <button @click='${(e) => renderEditMovieAdmin(e, series.id, ctx, series.type)}' class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click='${(e) => handleDelete(e, series, ctx)}' class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <a @click=${scrollToTop} href="/${series.type}/${series.id}" class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></a>
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
  ${series.map(currentSeries => seriesTemplateAdmin(currentSeries, ctx))}
  </tbody>
</table>

`

export async function renderSeriesAdmin(ctx) {
    const series = await getAllSeries();
    const siteSeries = adminSeriesTemplate(ctx, series);
    setActiveNavLink('/admin/series');
    ctx.render(siteSeries);
}



export async function handleDelete(ev, content, ctx) {
  ev.preventDefault();

  if(content.type == 'movie'){
    await deleteMovie(content.id);
  } else{
    await deleteSeries(content.id);
  }

  showNotification(`${content.name} deleted successfully`);

  ctx.redirect(ctx.path)
} 