import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";
import { hideModal } from '../../utils/reviewOperations.js';

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
let REVIEW_PAGE_SIZE = 6;

const endpoints = {
  delReview: (reviewId) => `/classes/Review/${reviewId}`,
  allReviews: '/classes/Review'

};

export async function getReviewById(reviewId) {
  const review = await get(`${endpoints.allReviews}/${reviewId}`);
  console.log(review);
  return review;
}

export async function getAllReviews() {
  const response = await get(endpoints.allReviews);
  return response.results.map(review => ({
    reviewTitle: review.reviewTitle,
    creator: review.creator,
    reviewRating: review.reviewRating,
    objectId: review.objectId,
    title: review.title,
    target: review.target || review.seriesTarget
  }));
}

export async function getReviewsCount() {
  const response = await get(endpoints.allReviews, { count: 1 });
  return response.count;
};

export function sendReviewRequest(rating, title, description, movie, currentUser) {
  const Review = Parse.Object.extend("Review");
  const review = new Review();
  const userId = currentUser.objectId;
  const creator = currentUser.username;

  review.set("reviewRating", rating);
  review.set("reviewTitle", title);
  review.set("reviewDescription", description);
  review.set("creator", creator);
  review.set("title", movie.name);

  if (movie.type === "series") {
    const seriesClass = Parse.Object.extend("Show");
    const seriesObj = new seriesClass();
    seriesObj.id = movie.objectId;
    review.set("seriesTarget", seriesObj);
  } else {
    const movieClass = Parse.Object.extend("Movie");
    const movieObj = new movieClass();
    movieObj.id = movie.objectId;
    review.set("target", movieObj);
  }

  const user = Parse.Object.extend("User");
  const userObj = new user();
  userObj.id = userId;
  review.set("user", userObj);

  return review.save();
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
  sendReviewRequest(rating, title, description, movie, user)
    .then(() => {
      showNotification('Review submitted successfully!');
    })
    .catch((error) => {
      console.error(error);
    });
  await updateRating(movie.objectId, movie.type);

  ev.target.reset();
  ctx.redirect(ctx.path);
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

  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("user", { __type: "Pointer", className: "_User", objectId: userId });
  console.log(type);
  if (type === "Movie") {
    query.equalTo("target", { __type: "Pointer", className: "Movie", objectId: movieId });
  } else if (type === "Show") {
    query.equalTo("seriesTarget", { __type: "Pointer", className: "Show", objectId: movieId });
  }

  const results = await query.find();
  console.log(results);
  return results.length > 0;
}

export async function getReviewsForMovie(movieId, type) {
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);

  if (type === "Movie" || type === "movie") {
    query.equalTo("target", { __type: "Pointer", className: "Movie", objectId: movieId });
  } else if (type === "Show" || type === "series") {
    query.equalTo("seriesTarget", { __type: "Pointer", className: "Show", objectId: movieId });
  }

  query.include("user");
  const results = await query.find();
  const reviews = results.map((review) => {
    const user = review.get("user");
    return {
      reviewId: review.id,
      reviewRating: review.get("reviewRating"),
      reviewTitle: review.get("reviewTitle"),
      reviewDescription: review.get("reviewDescription"),
      username: user.get("username"),
      profileImg: user.get("profileImg"),
    };
  });

  return reviews;
};

export async function updateRating(movieId, type) {
  const reviews = await getReviewsForMovie(movieId, type);
  const ratings = reviews.map((review) => review.reviewRating);
  const ratingSum = ratings.reduce((total, rating) => total + Number(rating), 0);
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

  console.log(target);
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("objectId", review.reviewId || review.objectId);
  const result = await query.first();

  result.set("reviewRating", rating);
  result.set("reviewTitle", title);
  result.set("reviewDescription", description);

  await result.save();
  let type;
  let currentId;
  if (target){
    type = target.className == 'Movie' ? 'movie' : 'series';
    currentId = target.objectId;
    console.log(type, currentId);
  } else{
    [, type, currentId] = ctx.path.split('/');
  }
  await updateRating(currentId, type);

  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  ctx.redirect(ctx.path);
  showNotification('Review updated successfully!');
};

export async function deleteReview(ev, reviewId, ctx, target) {
  ev.preventDefault();
  let type;
  let currentId;
  await del(endpoints.delReview(reviewId));
  if (target){
    type = target.className == 'Movie' ? 'movie' : 'series';
    currentId = target.objectId;
    console.log(type, currentId);
  } else{
    [, type, currentId] = ctx.path.split('/');
  }
  await updateRating(currentId, type);
  showNotification('Review deleted successfully');
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

