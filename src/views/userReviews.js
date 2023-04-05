import { html, render } from '../../node_modules/lit-html/lit-html.js';

export const userReviews = (user, reviews, isOwner) => html`

  <h2 class="myReviews-heading">${user}'s reviews</h2>
  <div class="review-container">
    <div class="review-movie">
      <img class="movie-img" src="../../images/king-of-tulsa.jpg" alt="Movie Image">
      <h3 class="movie-title">Tulsa King</h3>
    </div>
    <div class="review-content">
      <h3 class="review-title">Good movie</h3>
      <p class="review-rating">Rating: 8/10 <i class="fa-solid fa-star"></i></p>
      <p class="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada eros sed mauris
        suscipit aliquam. Integer eu sapien vel nulla lobortis malesuada. Vestibulum id lacinia metus. Praesent vel
        volutpat tellus. Vestibulum non aliquam lectus. Donec euismod elit elit, sit amet hendrerit enim interdum eget.
        Vestibulum hendrerit nisi vitae neque tincidunt rhoncus.</p>
      <div class="review-buttons">
        <button class="review-edit">Edit Review</button>
        <button class="review-delete">Delete Review</button>
      </div>
    </div>
  </div>
  
  <div class="review-container">
    <div class="review-movie">
      <img class="movie-img" src="../../images/wednesday.jpg" alt="Movie Image">
      <h3 class="movie-title">Wednesday</h3>
    </div>
    <div class="review-content">
      <h3 class="review-title">Decent</h3>
      <p class="review-rating">Rating: 7.5/10 <i class="fa-solid fa-star"></i></p>
      <p class="review-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada eros sed mauris
        suscipit aliquam. Integer eu.</p>
      <div class="review-buttons">
        <button class="review-edit">Edit Review</button>
        <button class="review-delete">Delete Review</button>
        
      </div>
    </div>
  </div>
`



export async function renderUserReviews(ev, user, reviews, isOwner) {
  const myReviews = userReviews(user);

  const reviewSection = document.querySelector(".review-section");
  const showBtn = document.getElementById('show');
  const hideBtn = document.getElementById('hide');
  render(myReviews, reviewSection)
  reviewSection.classList.toggle('hidden');
  showBtn.classList.add('hidden');
  hideBtn.classList.remove('hidden');
}

export function hideUserReviews(ev) {
  const reviewSection = document.querySelector(".review-section");
  const showBtn = document.getElementById('show');
  const hideBtn = document.getElementById('hide');

  reviewSection.classList.toggle('hidden');
  showBtn.classList.remove('hidden');
  hideBtn.classList.add('hidden');
}