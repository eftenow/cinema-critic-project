import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { scrollToBottom } from '../../../utils/backToTopBtn.js';
import { deleteReviewHandler, editReviewHandler } from '../../../utils/reviewOperations.js';
import { deleteReview, getAllReviews } from '../../services/reviewServices.js';
import { editAdminReviewHandler } from './adminEditReview.js';
import { setActiveNavLink } from './adminNavigation.js';

const reviewTemplateAdmin = (review, ctx) => {
  console.log(review);
  const path =
    review.content_type === 'show'
      ? `/series/${review.object_id}`
      : review.content_type === 'movie'
      ? `/movie/${review.object_id}`
      : '';

  return html`
    <tr>  
      <td>${review.review_title}</td>
      <td>${review.user}</td>
      <td>${review.rating}</td>
      <td>${review.content_type}</td>
      <td>
        <button @click="${(e) => editAdminReviewHandler(ctx, e, review.id, review.target)}" class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click="${(e) => deleteReview(e, review.id, ctx, review.target)}" class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <a href='${path}' @click="${(e) => scrollToBottom()}" class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></a>

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