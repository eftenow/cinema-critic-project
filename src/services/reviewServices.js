import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
let REVIEW_PAGE_SIZE = 6;


export function sendReviewRequest(rating, title, description, type, movieId, userId) {
    const Review = Parse.Object.extend("Review");
    const review = new Review();
  
    review.set("reviewRating", rating);
    review.set("reviewTitle", title);
    review.set("reviewDescription", description);
  
    const targetClass = (type === "movie") ? Parse.Object.extend("Movie") : Parse.Object.extend("Show");
  
    const targetObj = new targetClass();
    targetObj.id = movieId;
  
    review.set("target", targetObj);
  
    const user = Parse.Object.extend("User");
    const userObj = new user();
    userObj.id = userId;
    review.set("user", userObj);
  
    review.save();
  };

  export async function userAlreadyReviewed(userId, movieId, type) {
    const Review = Parse.Object.extend("Review");
    const query = new Parse.Query(Review);
    query.equalTo("user", { __type: "Pointer", className: "_User", objectId: userId });
    query.equalTo("target", { __type: "Pointer", className: type, objectId: movieId });
    const results = await query.find();
    return results.length > 0;
  };

  export async function getReviewsForMovie(movieId, type) {
    const Review = Parse.Object.extend("Review");
    const query = new Parse.Query(Review);
    query.equalTo("target", { __type: "Pointer", className: type, objectId: movieId });
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


  export async function editExistingReview(ev, review, ctx) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const rating = form.get('review-rating');
    const title = form.get('reviewer-review-text');
    const description = form.get('reviewer-review');
    
    const Review = Parse.Object.extend("Review");
    const query = new Parse.Query(Review);
    query.equalTo("objectId", review.reviewId);
    const result = await query.first();
    
    result.set("reviewRating", rating);
    result.set("reviewTitle", title);
    result.set("reviewDescription", description);
    
    result.save();
    
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  };