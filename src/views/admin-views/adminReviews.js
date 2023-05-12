import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllReviews } from '../../services/reviewServices.js';
import { setActiveNavLink } from './adminNavigation.js';

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
      <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>

  </tbody>
</table>
`

const reviewTemplateAdmin = (review) => html`
<tr>  
      <td>${review.reviewTitle}</td>
      <td>${review.creator}</td>
      <td>${review.reviewRating}</td>
      <td>${review.visits}</td>
      <td>
        <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
`

export async function renderReviewsAdmin(ctx) {
    const reviews = await getAllReviews();
    console.log(reviews); 
    const siteReviews = adminReviewsTemplate();
    setActiveNavLink('/admin/reviews');
    ctx.render(siteReviews);
};