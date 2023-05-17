import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { deleteReviewHandler, editReviewHandler } from '../../../utils/reviewOperations.js';
import { deleteReview, getAllReviews } from '../../services/reviewServices.js';
import { editAdminReviewHandler } from './adminEditReview.js';
import { setActiveNavLink } from './adminNavigation.js';

const reviewTemplateAdmin = (review, ctx) => {
  const path =
    review.target.className === 'Show'
      ? `/series/${review.target.objectId}`
      : review.target.className === 'Movie'
      ? `/movie/${review.target.objectId}`
      : '';
  console.log(review);
  return html`
    <tr>  
      <td>${review.reviewTitle}</td>
      <td>${review.creator}</td>
      <td>${review.reviewRating}</td>
      <td>${review.title}</td>
      <td>
        <button @click="${(e) => editAdminReviewHandler(ctx, e, review.objectId)}" class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click="${(e) => deleteReview(e, review.objectId, ctx, review.target)}" class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <button class='forward-btn-admin' onclick="location.href='${path}'"><i class="fa-solid fa-share-from-square"></i></button>
      </td>
    </tr>
  `;
};

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
  ${reviews.map(review => reviewTemplateAdmin(review, ctx))}
  </tbody>
</table>
`



export async function renderReviewsAdmin(ctx) {
    const reviews = await getAllReviews();
    const siteReviews = adminReviewsTemplate(ctx, reviews);
    setActiveNavLink('/admin/reviews');
    ctx.render(siteReviews);
}