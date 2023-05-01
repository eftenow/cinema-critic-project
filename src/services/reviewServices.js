import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
let REVIEW_PAGE_SIZE = 6;

const endpoints = {
  delReview: (reviewId) => `/classes/Review/${reviewId}`,
  allReviews: '/classes/Review'

};

export function sendReviewRequest(rating, title, description, type, movieId, userId) {
  const Review = Parse.Object.extend("Review");
  const review = new Review();

  review.set("reviewRating", rating);
  review.set("reviewTitle", title);
  review.set("reviewDescription", description);

  if (type === "series") {
    const seriesClass = Parse.Object.extend("Show");
    const seriesObj = new seriesClass();
    seriesObj.id = movieId;
    review.set("seriesTarget", seriesObj);
  } else{
    const movieClass = Parse.Object.extend("Movie");
    const movieObj = new movieClass();
    movieObj.id = movieId;
    review.set("target", movieObj);
  }

  const user = Parse.Object.extend("User");
  const userObj = new user();
  userObj.id = userId;
  review.set("user", userObj);
  
  return review.save();
};

 export async  function addNewReview(ctx, ev, type, movieId, userId) {
  ev.preventDefault();
  const form = new FormData(ev.target);

  const rating = form.get('review-rating');
  const title = form.get('reviewer-review-text');
  const description = form.get('reviewer-review');

  if(!rating){
    document.querySelector('.invalid-rating').textContent = 'You must select review rating.'
    return;
  };
  sendReviewRequest(rating, title, description, type, movieId, userId)
    .then(() => {
      showNotification('Review submitted successfully!');
    })
    .catch((error) => {
      console.error(error);
    });
  await updateRating(movieId, type);
    
    ev.target.reset();
    ctx.redirect(ctx.path);
};


function showNotification(notificationMsg) {
  const notification = document.getElementById('notification');
  debugger;
  notification.textContent = notificationMsg;
  notification.classList.add('show');

  notification.addEventListener('click', () => {
    notification.classList.remove('show');
  });

  setTimeout(() => {
    notification.classList.remove('show');
  }, 1800);
}



export async function userAlreadyReviewed(userId, movieId, type) {
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
  debugger;
  const reviews = await getReviewsForMovie(movieId, type);
  const ratings = reviews.map((review) => review.reviewRating);
  const ratingSum = ratings.reduce((total, rating) => total + Number(rating), 0);
  const avgRating = ratingSum / ratings.length;
  const className = type === "movie" ? "Movie" : "Show";
  const query = new Parse.Query(className);
  const movie = await query.get(movieId);
  movie.set("rating", avgRating);
  await movie.save();
};


export async function editExistingReview(ev, review, ctx) {
  ev.preventDefault();
  const form = new FormData(ev.target);
  const rating = form.get('review-rating');
  const title = form.get('reviewer-review-text');
  const description = form.get('reviewer-review');

  console.log(rating, title, description);
  const Review = Parse.Object.extend("Review");
  const query = new Parse.Query(Review);
  query.equalTo("objectId", review.reviewId || review.objectId);
  const result = await query.first();

  result.set("reviewRating", rating);
  result.set("reviewTitle", title);
  result.set("reviewDescription", description);

  await result.save();
  const [, type, currentId]  = ctx.path.split('/');

  await updateRating(currentId, type);

  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  ctx.redirect(ctx.path);
  showNotification('Review updated successfully!');
};

export async function deleteReview(ev, reviewId, ctx) {
  ev.preventDefault();
  await del(endpoints.delReview(reviewId));
  const [, type, currentId]  = ctx.path.split('/');
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