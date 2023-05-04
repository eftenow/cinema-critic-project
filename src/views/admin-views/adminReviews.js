import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const adminReviewsTemplate = (ctx) => html`
    <h2 class='admin-table-header'>Reviews</h2>
  <table class="movie-table">
  <thead>
    <tr>
      <th>Review Title</th>
      <th>Creator</th>
      <th>Rating</th>
      <th>Movie/Show</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>This is my favourite movie!!!</td>
      <td>Peter</td>
      <td>8 <i class="fa-solid fa-star"></i></td>
      <td>Gladiator</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>

    <tr>
      <td>This movie sucks</td>
      <td>eftenow</td>
      <td>2 <i class="fa-solid fa-star"></i></td>
      <td>Avatar</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    
    
  </tbody>
</table>
`

export function renderReviewsAdmin(ctx) {
    const siteReviews = adminReviewsTemplate();

    ctx.render(siteReviews);
}