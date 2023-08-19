import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { hideModal } from '../../../utils/reviewOperations.js';
import { selectOption, showHideOptions } from "../../../utils/dropdowns.js";
import { editExistingReview, getReviewById } from "../../services/reviewServices.js";

const editReviewAdminTemplate = (review, ctx) => html`
${console.log(review)}
      <form class="edit-review-form admin-review"  @submit='${(e) => editExistingReview(e, review, ctx, review.content_type)}'>
      <span @click="${hideModal}" class="close">&times;</span>
        <h3 class='admin-rev-header'>Edit Review</h3>
        <div class="select-menu specific-form-group specific-form-group-admin">
          <label for="select-rating">Rating: </label>
          <div id='select-rating' class="select" @click="${showHideOptions}">
            <span>${review.rating} <i class="fa-solid fa-star"></i></span>
            <i class="fas fa-angle-down"></i>
          </div>
          <input value='${review.rating}'type='hidden' id="review-rating-input" name="review-rating">
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
        <div class="specific-form-group specific-form-group-admin">
          <label for="reviewer-review-text">Review Title:</label>
          <input value="${review.review_title}" id="review-edit-title" name="reviewer-review-text">
        </div>
        <div class="specific-form-group specific-form-group-admin">
          <label for="reviewer-review">Review Description:</label>
          <textarea id="reviewer-review" name="reviewer-review">${review.content}</textarea>
        </div>
        <div class="specific-form-group submit-review-btn-wrapper admin-rev-btns">
          <button class="submit-review-btn" type="submit">Submit Changes</button>
        </div>
      </form>
    `;


export async function editAdminReviewHandler(ctx, ev, reviewId) {
    ev.preventDefault();
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    const review = await getReviewById(reviewId);
    render(editReviewAdminTemplate(review, ctx), modal);
  };