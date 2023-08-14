import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";
import { hideModal } from '../../utils/reviewOperations.js';
import { getUserById } from './authServices.js';

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
let REVIEW_PAGE_SIZE = 6;

const endpoints = {
  allReviews: '/reviews/',
  userReviews: (userId) => `/reviews/user/${userId}/`,
  reviewDetails: (reviewId) => `/reviews/${reviewId}`,
  specificMovieReviews: (movieId) => `/reviews/movie/${movieId}/`,
  specificSeriesReviews: (seriesId) => `/reviews/series/${seriesId}`
};

export async function getReviewById(id) {
  let review = await get(endpoints.reviewDetails(id) + '/');

  return review;
}

export async function getAllReviews() {
  const reviews = await get(endpoints.allReviews);
  const reviewsFound = movies.results;
  return reviewsFound;
}

export async function getReviewsCount() {
  const response = await get(endpoints.allReviews, { count: 1 });
  return response.count;
};

export async function sendReviewRequest(review) {
  try {
    const newReview = await post(endpoints.allReviews, review);
    return { status: "success", message: "New review created successfully." };
  } catch (error) {
    return error.data;
  }

};

export async function addNewReview(ctx, ev, movie, user) {
  ev.preventDefault();

  const form = new FormData(ev.target);

  const rating = form.get('review-rating');
  const title = form.get('reviewer-review-text');
  const description = form.get('reviewer-review');

  if (!rating) {
    document.querySelector('.invalid-rating').textContent = 'You must select review rating.'
    return;
  };
  const review = {
    "content_type": movie.type,
    "review_title": title,
    "content": description,
    "rating": rating,
    "object_id": movie.id
  }

  await sendReviewRequest(review)
    .then(() => {
      showNotification('Review submitted successfully!');
    })
    .catch((error) => {
      console.error(error);
    });


  ctx.redirect(`/${movie.type}/${movie.id}/`)
};


export function showNotification(notificationMsg, color = 'green') {
  const notification = document.getElementById('notification');
  notification.textContent = notificationMsg;
  notification.classList.remove('notification-red', 'notification-green');
  notification.classList.add(`notification-${color}`);
  notification.classList.add(`show`);

  notification.addEventListener('click', () => {
    notification.classList.remove(`notification-${color}`);
    notification.classList.remove(`show`);
  });

  setTimeout(() => {
    notification.classList.remove(`notification-${color}`);
    notification.classList.remove(`show`);
  }, 1800);
}


export async function userAlreadyReviewed(userId, movieId, type) {
  if (!userId) {
    return null;
  }
  const existingReviews = await getReviewsForMovie(movieId, type);
  return existingReviews.some(review => review.user.id === userId);
}

export async function getReviewsForMovie(movieId, type) {
  let reviews;
  if (type == 'movie') {
    reviews = await get(endpoints.specificMovieReviews(movieId));
  } else {
    reviews = await get(endpoints.specificSeriesReviews(movieId));
  }
  for (let review of reviews.data) {
    review.user = await getUserById(review.user);
  }
  return reviews.data;
};

export async function updateRating(movieId, type) {
  const reviews = await getReviewsForMovie(movieId, type);
  const ratings = reviews.map((review) => review.reviewRating);
  const ratingSum = ratings.reduce((total, rating) => Number(total) + Number(rating), 0);
  let avgRating = ratingSum / ratings.length;
  avgRating = avgRating !== null ? avgRating.toFixed(2) : null;
  const className = type === "movie" ? "Movie" : "Show";
  const query = new Parse.Query(className);
  const movie = await query.get(movieId);
  movie.set("rating", Number(avgRating));
  await movie.save();
};


export async function editExistingReview(ev, review, ctx, target) {
  ev.preventDefault();
  const form = new FormData(ev.target);
  const rating = form.get('review-rating');
  const title = form.get('reviewer-review-text');
  const description = form.get('reviewer-review');

  const editedReview = {
    "id": review.id,
    "content_type": review.content_type,
    "review_title": title,
    "content": description,
    "rating": rating,
    "object_id": review.object_id,
    "user": review.user.id
  }
  let editReviewReq = await put(endpoints.reviewDetails(review.id) + '/', editedReview);
  console.log(editReviewReq);
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  ctx.redirect(ctx.path);
  showNotification('Review updated successfully!');
};

export async function deleteReview(ev, reviewId, ctx, target) {
  ev.preventDefault();
  const reviewForm = document.querySelector('.add-review-form') || null;
  
  
  await del(endpoints.reviewDetails(reviewId) + '/');
  
  showNotification('Review deleted successfully');
  reviewForm ? reviewForm.reset() : null;
  ctx.redirect(ctx.path);

};

export async function getUserReviews(userId) {
  const Review = Parse.Object.extend('Review');
  const query = new Parse.Query(Review);
  query.equalTo('user', { __type: 'Pointer', className: '_User', objectId: userId });
  query.include('target');
  query.include('seriesTarget');
  const results = await query.find();

  const reviews = results.map((review) => {
    const target = review.get('target') || review.get('seriesTarget');

    return {
      reviewId: review.id,
      reviewRating: review.get('reviewRating'),
      reviewTitle: review.get('reviewTitle'),
      reviewDescription: review.get('reviewDescription'),
      targetId: target.id,
      targetType: target.className == 'Movie' ? 'movie' : 'series',
    };
  });
  return reviews;
}

