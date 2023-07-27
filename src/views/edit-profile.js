import { html } from '../../node_modules/lit-html/lit-html.js';
import { selectOption, showHideOptions } from '../../utils/dropdowns.js';
import { hideModal } from '../../utils/reviewOperations.js';
import { editUserInfo, getUser, getUserId } from '../services/authServices.js';
import { raiseProfileEditErrors } from '../validators/editProfileValidator.js';
import { hideUserReviews, renderUserReviews } from './userReviews.js';

export const profileTemplate = (ctx, user) => html`
<div class="user-container">
<div class="edit-profile">
    <h2>Edit Profile</h2>
    ${console.log(user)}
    <div class="info" id='edit-pic-container'>
        <img class="edit-avatar" src="${user.profile.profile_picture}"
            onerror="this.onerror=null;this.src='../../images/default-user.png';">
        <i class="fa-solid fa-camera"></i>
        <input type='text' placeholder="Avatar image url" id="new-avatar-url" value="${user.profile.profile_picture}">

    </div>
    <form @submit ="${(e) => saveChangesHandler(e, ctx, '/myProfile', user.id)}">
        <div class="input-group ">
            <div class="input-group">
                <label for="username">Username:</label>
                <input class='edit-input' type="text" id="username" name="username" value="${user.username}">
                <p class='incorrect-username-msg incorrect-edit'></p>
            </div>
            <div class="input-group">
                <label for="fname">First name:</label>
                <input class='edit-input' type="text" id="fname" name="fname" value="${user.profile.first_name}">
                <p class='incorrect-fname-msg incorrect-edit'></p>
            </div>
            <div class="input-group">
                <label for="lname">Last name:</label>
                <input class='edit-input' type="text" id="lname" name="lname" value="${user.profile.last_name}">
                <p class='incorrect-lname-msg incorrect-edit'></p>
            </div>
            <div class="input-group">
                <label for="email">Email:</label>
                <input class='edit-input' type="email" id="email" name="email" value="${user.email}">
                <p class='incorrect-email-msg incorrect-edit'></p>
            </div>

            <div class="select-menu specific-form-group">
                <label for="select-rating">Gender: </label>
                <div id='select-rating' class="select" @click="${showHideOptions}">
            <span>${user.profile.gender}</span>  
            <i class="fas fa-angle-down"></i>
          </div>
          <input type='hidden' id="review-rating-input" name="review-rating">
          <div id='choose-gender' class="options-list" @click="${selectOption}" name='review-rating'>
            <div class="option">Male</i></div>
            <div class="option">Female</div>
            <div class="option">Do not show</div>
          </div>
        </div>

            

            <div class="input-group">
                <label for="country">Country: </label>
                <input class='edit-input' type="text" id="country" name="country" value="${user.profile.country}">
                <p class='incorrect-country-msg incorrect-edit'></p>
            </div>

            <div class="input-group">
                <label for="city">City: </label>
                <input class='edit-input' type="text" id="city" name="city" value="${user.profile.city}">
                <p class='incorrect-city-msg incorrect-edit'></p>
            </div>

            <div class="input-group">
                <label for="description">Description:</label>
                <textarea class='edit-input' id="description" name="description" rows="5">${user.profile.description}</textarea>
                <p class='incorrect-description-msg incorrect-edit'></p>
            </div>


            <div class="button-group">
                <button type="submit" >Save Changes</button>
                <button @click ="${(e) => cancelChangesHandler(e, ctx, '/myProfile')}" type="button">Cancel</button>
            </div>
    </form>
</div>
</div>
`



export async function renderEdit(ctx) {
    const currentUser = await getUser();

    const editProfile = profileTemplate(ctx, currentUser);
    ctx.render(editProfile);

}

export async function saveChangesHandler(ev, ctx, redirectLocation, userId) {
    ev.preventDefault();
    const profile_picture = document.getElementById('new-avatar-url').value;
    const gender = document.querySelector('#select-rating span').textContent;
    const form = new FormData(ev.target);
    const username = form.get('username');
    const email = form.get('email');

    const first_name = form.get('fname');
    const last_name = form.get('lname');
    const country = form.get('country');
    const city = form.get('city');
    const description = form.get('description');
    userId = userId == null ? getUserId() : userId;

    const profile = {
        first_name,
        last_name,
        country,
        city,
        description,
        gender,
        profile_picture
    }

    const editedUserData = { username, email, profile };

    const errorDetails = await editUserInfo(userId, editedUserData);

    if (errorDetails) {
        raiseProfileEditErrors(errorDetails)
    } else {
        ctx.redirect(redirectLocation);
        hideModal();
    }
}


export function cancelChangesHandler(ev, ctx, redirectLocation) {
    ctx.redirect(redirectLocation);
}