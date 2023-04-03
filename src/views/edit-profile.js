import { html } from '../../node_modules/lit-html/lit-html.js';
import { editUserInfo, getUser, getUserId } from '../services/authServices.js';
import { hideUserReviews, renderUserReviews } from './userReviews.js';

export const profileTemplate = (ctx, user) => html`
<div class="user-container">
<div class="edit-profile">
    <h2>Edit Profile</h2>
    <div class="info" id='edit-pic-container'>
        <img class="edit-avatar" src="${user.profileImg}"
            onerror="this.onerror=null;this.src='../../images/default-user.png';">
        <i class="fa-solid fa-camera"></i>
        <input type='text'  id="new-avatar-url" value="${user.profileImg}">

    </div>
    <form @submit ="${(e) => saveChangesHandler(e, ctx)}">
        <div class="input-group ">
            <div class="input-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="${user.username}">
            </div>

            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}">
            </div>

            <div class="input-group">
                <label for="country">Country: </label>
                <input type="text" id="country" name="country" value="${user.country}">
            </div>

            <div class="input-group">
                <label for="city">City: </label>
                <input type="text" id="city" name="city" value="${user.city}">
            </div>

            <div class="input-group">
                <label for="description">Description:</label>
                <textarea id="description" name="description" rows="5" required> ${user.description}</textarea>
            </div>


            <div class="button-group">
                <button type="submit" >Save Changes</button>
                <button @click ="${(e) => cancelChangesHandler(e, ctx)}" type="button">Cancel</button>
            </div>
    </form>
</div>
</div>
`



export async function renderEdit(ctx) {
    const currentUser = getUser();

    const editProfile = profileTemplate(ctx, currentUser);

    ctx.render(editProfile);
}

async function saveChangesHandler(ev, ctx) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const username = form.get('username');
    const email = form.get('email');
    const country = form.get('country');
    const city = form.get('city');
    const description = form.get('description');
    const userId = getUserId();

    const editedUserData = { username, email, country, city, description };
    await editUserInfo(userId, editedUserData);

    ctx.redirect('/myProfile');
}


function cancelChangesHandler(ev, ctx) {
    console.log(ctx);
    ctx.redirect('/myProfile');
}