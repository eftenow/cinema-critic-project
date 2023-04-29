import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUser } from '../services/authServices.js';
import { getUserReviews } from '../services/reviewServices.js';
import { hideUserReviews, renderUserReviews } from './userReviews.js';
import { hideUserWatchlist, renderUserWatchlist } from './userWatchlist.js';

export const profileTemplate = (ctx, user, userReviews) => html`
<div class="user-container">
    <div class="user-card">
        <img class="profile-img" src="${user.profileImg}"
            onerror="this.onerror=null;this.src='../../images/default-user.png';">

        <div class="info">

            <h2>${user.username}</h2>
            <span><a href="/settings" class="edit-account"><i class="fa-solid fa-pencil"></i> Edit Profile</a></span>


            <h4>User Reviews: <span><b>${userReviews.length}</b></span></h4>
            <p>${user.description}</p>
            <ul>
                <li><i class="fa-solid fa-location-dot"></i> ${user.city}, ${user.country}</li>
            </ul>
            <div class="links">
                <a @click="${(e) => renderUserReviews(ctx, e, user, userReviews)}" href="/myProfile/reviews" id='show-reviews' class="button">Show Reviews</a>
                <a @click="${hideUserReviews}" href="/myProfile" class="hidden button" id='hide-reviews'>Hide Reviews</a>
                <a href="#" class="msg-btn hidden">Message User</a>
                <a @click="${(e) => renderUserWatchlist(e, user)}" href="/myProfile/watchlist" id='show-watchlist' class="watchlist button">Watchlist</a>
                <a @click="${hideUserWatchlist}" href="/myProfile" class="hidden button" id='hide-watchlist'>Hide Watchlist</a>
            </div>
        </div>
        <section class="review-section hidden">

        </section>
        <section class="watchlist-section hidden">

        </section>

    </div>

</div>

`



export async function renderProfile(ctx) {
    const user = getUser();
    const userReviews = await getUserReviews(user.objectId);
    userReviews.forEach((rev) => {
        rev.username = user.username,
        rev.profileImg = user.profileImg
    });
    console.log(userReviews);
    const profile = profileTemplate(ctx, user, userReviews);
    ctx.render(profile);
}




















{/* <section class="profile-section">
    <h2 class="profile-title">My Profile</h2>
    <article class="user-profile-article">
        <div class="user-profile-header">
            <img class="user-profile-header-picture" src="../../images/cinema.jpg">
        </div>
        <div class="user-profile-avatar-container">
            <img class="user-profile-avatar" src="${user.profileImg}"
                onerror="this.onerror=null;this.src='../../images/default-user.png';">
        </div>
        <div class="user-profile-article-info">
            <h3 class="username-header">${user.username}</h3>
            <div class="reviews-container">
                <p class="user-reviews">Reviews:  <b class="reviews-count">0</b></p>
                <p><i class="fa-solid fa-comments"></i>
            </div>
            </p>
        </div>
        <a class="movie-details-button" id="show-reviews">Show Reviews</a>
    </article>
</section> */}

/* 
.profile-section{
    height: 90.2vh;
}

.profile-title{
    margin-top: 0px;
    padding: 32px 0 48px;
}

.user-profile-article {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 420px;
    margin: 40px auto;
    border-radius: 10px;
    box-shadow: 0px -1px 20px 3px #00000024;
}

.user-profile-header {
    height: 240px;
    width: 100%;
}

.user-profile-header-picture {
    width: 100%;
    max-height: 210px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.user-profile-avatar-container {
    border-radius: 50%;
    width: 112px;
    height: 112px;
    margin-top: -80px;
    box-shadow: -1px -2px 11px 0px #0000001a;
    display: block;
}

.user-profile-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.user-profile-article-info {
    width: 100%;
    height: 200px;
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    margin-top: -18px;
}

.username-header {
    width: 100%;
    text-align: center;
    color: #55595c;
    font-size: 1.4rem;
}


.reviews-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    color: #55595c;
    margin-top: 20px;
}

.reviews-container * {
    color: #55595c;
}

.fa-comments{
    margin-top: -6px;
    font-size: 24px;
}

#show-reviews{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
} */