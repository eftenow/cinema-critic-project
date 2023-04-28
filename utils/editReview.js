import { html, render } from '../node_modules/lit-html/lit-html.js';
import { editExistingReview } from '../src/services/reviewServices.js';
import { selectOption, showHideOptions } from './dropdowns.js';

export function editReviewHandler(ctx, ev, review) {
    ev.preventDefault();
  
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  
    const editReviewForm = document.querySelector('.modal-content');
    render(editReviewFormTemplate(review, ctx), editReviewForm);
    document.querySelector('.close').addEventListener('click', ()=> document.querySelector('.modal').style.display = 'none');
  };

const editReviewFormTemplate = (review, ctx) => html`
      <form class="add-review-form edit-review-form"  @submit='${(e) => editExistingReview(e, review, ctx)}'>
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
          <input value="${review.reviewTitle}" id="review-edit-title" name="reviewer-review-text" required>
        </div>
        <div class="specific-form-group">
          <label for="reviewer-review">Review Description:</label>
          <textarea id="reviewer-review" name="reviewer-review" required>${review.reviewDescription}</textarea>
        </div>
        <div class="specific-form-group submit-review-btn-wrapper">
          <button class="submit-review-btn" type="submit">Submit Changes</button>
        </div>
      </form>
    `;

