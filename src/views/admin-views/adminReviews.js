import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllReviews } from '../../services/reviewServices.js';
import { setActiveNavLink } from './adminNavigation.js';

const reviewTemplateAdmin = (review) => html`
<tr>  
      <td>${review.reviewTitle}</td>
      <td>${review.creator}</td>
      <td>${review.reviewRating}</td>
      <td>${review.title}</td>
      <td>
        <button class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
`

const adminReviewsTemplate = (ctx, reviews) => html`
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
  ${reviews.map(review => reviewTemplateAdmin(review))}
  </tbody>
</table>
`



export async function renderReviewsAdmin(ctx) {
    const reviews = await getAllReviews();
    console.log(reviews); 
    const siteReviews = adminReviewsTemplate(ctx, reviews);
    setActiveNavLink('/admin/reviews');
    ctx.render(siteReviews);
}