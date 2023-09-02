import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUser, getUserByUsername } from '../services/authServices.js';
import { getAllGenres } from '../services/itemServices.js';
import { getUserReviews } from '../services/reviewServices.js';
import { editUserData } from './admin-views/adminUsers.js';
import { hideUserReviews, renderUserReviews } from './userReviews.js';
import { hideUserWatchlist, renderUserWatchlist } from './userWatchlist.js';

export const profileTemplate = (ctx, user, userReviews, isProfileOwner, visitorIsAdmin) => html`
<div class="user-container">
    <div class="user-card">
        <img class="profile-img" src="${user.profile.profile_picture}"
            onerror="this.onerror=null;this.src='../../images/default-user.png';">

        <div class="info">

            <h2>${user.username}</h2>
            ${isProfileOwner ? html`
        <span>
            <a href="/settings" class="edit-account"><i class="fa-solid fa-pencil"></i> <span class='edit-profile-text'>Edit Profile</span></a>
        </span>
        ` : ''}

        ${visitorIsAdmin && !isProfileOwner ? html`
        <span>
            <button @click='${(e) => editUserData(ctx, e, user)}' class="edit-account"><i class="fas fa-edit"></i></button>
        </span>
        ` : ''}

            <h4>User Reviews: <span><b>${userReviews.length}</b></span></h4>
            
            <ul>
            ${user.profile.first_name || user.profile.last_name ?
                html`<li><i class="fa-solid fa-user"></i> ${user.profile.first_name} ${user.profile.last_name}</li>` :
                    ''}
            ${user.profile.gender == 'Male' || user.profile.gender == 'Female'
                ?html`${user.profile.gender == 'Male' ?
                html`<li><i class="fa-solid fa-mars-stroke"></i> ${user.profile.gender}</li>` :
                html`<li><i class="fa-solid fa-venus"></i> ${user.profile.gender}</li>`
                    }` : ''}
            ${user.profile.city || user.profile.country ?
                html`<li><i class="fa-solid fa-location-dot"></i> ${user.profile.city} ${user.profile.country}</li>` :
                    ''}
            
            </ul>
            <p margin-left:"10px">${user.profile.description}</p>
            <div class="links">
                <a @click="${(e) => renderUserReviews(ctx, e, user, userReviews, isProfileOwner)}" href="${ctx.path}/reviews" id='show-reviews' class="button">Show Reviews</a>
                <a @click="${hideUserReviews}" href="${ctx.path}" class="hidden button" id='hide-reviews'>Hide Reviews</a>
                <a href="#" class="msg-btn hidden">Message User</a>
                <a @click="${(e) => renderUserWatchlist(e, user, isProfileOwner)}" href="${ctx.path}/watchlist" id='show-watchlist' class="watchlist button">Watchlist</a>
                <a @click="${hideUserWatchlist}" href="${ctx.path}" class="hidden button" id='hide-watchlist'>Hide Watchlist</a>
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
    const user = await getUser();
    const visitor = await getUser();

    if (user){
        await displayUserProfile(ctx, user, true, visitor);
    } else{
        ctx.redirect('/login');
    }
    
};


export async function renderUserProfile(ctx) {
    const username = ctx.path.split('/')[2];
    const user = await getUserByUsername(username);
    const visitor = await getUser();
    const isProfileOwner = user.id == visitor.id;

    await displayUserProfile(ctx, user, isProfileOwner, visitor);
}


async function displayUserProfile(ctx, user, isProfileOwner, visitor) {
    const userReviews = await getUserReviews(user.id);
    userReviews.forEach((rev) => {
        rev.username = user.username,
            rev.profileImg = user.profileImg
    });
    console.log(visitor);
    const visitorIsAdmin = visitor.role == 'Administrator';
    const profile = profileTemplate(ctx, user, userReviews, isProfileOwner, visitorIsAdmin);
    ctx.render(profile);
}



