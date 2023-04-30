import { html, render } from '../node_modules/lit-html/lit-html.js';
import { deleteReview, editExistingReview } from '../src/services/reviewServices.js';
import { selectOption, showHideOptions } from './dropdowns.js';

export function editReviewHandler(ctx, ev, review) {
    ev.preventDefault();
  
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  
    const editReviewForm = document.querySelector('.modal-content');
    render(editReviewFormTemplate(review, ctx), editReviewForm);
  };

  export function deleteReviewHandler(ctx, ev, review) {
    const modal = document.querySelector('.modal');
    const deleteReviewForm = document.querySelector('.modal-content');
    modal.style.display = 'block';

    deleteReviewForm.classList.add('small-modal');
    console.log(review);
    render(deleteReviewFormTemplate(review.reviewId || review.objectId, ctx), deleteReviewForm);
  }
  
  const deleteReviewFormTemplate = (reviewId, ctx) => html`
    <form class="delete-review-form" @submit="${(e) => deleteReview(e, reviewId, ctx)}">
      <h3>Delete Review</h3>
      <p>Are you sure you want to delete this review?</p>
      <div class="delete-form-group">
        <button @click="${hideModal}" class="confirm-delete-review-btn" type="submit">Delete</button>
        <button @click="${hideModal}" class="cancel-delete-review-btn" type="button" >Cancel</button>
      </div>
    </form>
  `;

const editReviewFormTemplate = (review, ctx) => html`
      <form class="edit-review-form"  @submit='${(e) => editExistingReview(e, review, ctx)}'>
      <span @click="${hideModal}" class="close">&times;</span>
        <h3>Edit Review</h3>
        <div class="select-menu specific-form-group">
          <label for="select-rating">Rating: </label>
          <div id='select-rating' class="select" @click="${showHideOptions}">
            <span>${review.reviewRating} <i class="fa-solid fa-star"></i></span>
            <i class="fas fa-angle-down"></i>
          </div>
          <input value='${review.reviewRating}'type='hidden' id="review-rating-input" name="review-rating">
          <div class="options-list" @click="${selectOption}" name='review-rating'>
            <div class="option">1 <i class="fa-solid fa-star"></i></div>
            <div class="option">2 <i class="fa-solid fa-star"></i></div>
            <div class="option">3 <i class="fa-solid fa-star"></i></div>
            <div class="option">4 <i class="fa-solid fa-star"></i></div>
            <div class="option">5 <i class="fa-solid fa-star"></i></div>
            <div class="option">6 <i class="fa-solid fa-star"></i></div>
            <div class="option">7 <i class="fa-solid fa-star"></i></div>
            <div class="option">8 <i class="fa-solid fa-star"></i></div>
            <div class="option">9 <i class="fa-solid fa-star"></i></div>
            <div class="option">10 <i class="fa-solid fa-star"></i></div>
          </div>
        </div>
        <div class="specific-form-group">
          <label for="reviewer-review-text">Review Title:</label>
          <input value="${review.reviewTitle}" id="review-edit-title" name="reviewer-review-text">
        </div>
        <div class="specific-form-group">
          <label for="reviewer-review">Review Description:</label>
          <textarea id="reviewer-review" name="reviewer-review">${review.reviewDescription}</textarea>
        </div>
        <div class="specific-form-group submit-review-btn-wrapper">
          <button class="submit-review-btn" type="submit">Submit Changes</button>
        </div>
      </form>
    `;

function hideModal() {
  document.querySelector('.modal-content').classList.remove('small-modal');
  document.querySelector('.modal').style.display = 'none';
};

