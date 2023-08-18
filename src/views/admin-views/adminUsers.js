import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { scrollToTop } from '../../../utils/backToTopBtn.js';
import { selectOption, showHideOptions } from '../../../utils/dropdowns.js';
import { hideModal } from '../../../utils/reviewOperations.js';
import { getAllUsersAdmin } from '../../services/adminServices.js';
import { deleteUserById, getAllUsernames, getAllUsers, getUser } from '../../services/authServices.js';
import { cancelChangesHandler, saveChangesHandler } from '../edit-profile.js';
import { setActiveNavLink } from './adminNavigation.js';

const userTemplateAdmin = (user, ctx) => html`
<tr>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role == 'Administrator' || user.role == 'Moderator' ? html`<strong class='staff-role' >${user.role}</strong>` : user.role}</td>

      <td>
        <button @click='${(e) => editUserData(ctx, e, user)}' class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click='${() => deleteUserById(user.id, ctx)}' class='delete-btn-admin'><i class="fas fa-trash"></i></button>
        <a @click=${scrollToTop} href="/user/${user.username}" class='forward-btn-admin'><i class="fa-solid fa-share-from-square"></i></a>
      </td>
    </tr>
`

const adminUsersTemplate = (ctx, users) => html`
  <h2 class='admin-table-header'>Users</h2>
  <table class="user-table">
  <thead>
    <tr>
      <th>Username</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  ${users.map(user => userTemplateAdmin(user, ctx))}
  </tbody>
</table>
`

export async function renderUsersAdmin(ctx) {
  const users = await getAllUsersAdmin();

  const siteUsers = adminUsersTemplate(ctx, users);
  setActiveNavLink('/admin/users');
  ctx.render(siteUsers);
  
}


export async function editUserData(ctx, ev, user) {
  ev.preventDefault();

  const modal = document.querySelector('.modal');
  modal.style.display = 'block';

  const editReviewForm = document.querySelector('.modal');
  const userToEdit = await getUser(user.id)

  render(editUserFormTemplate(userToEdit, ctx), editReviewForm);
};

const editUserFormTemplate = (user, ctx) => html`
     <div class="edit-profile admin-edit-modal">
    <div class="info" id='edit-pic-container'>
        <img class="edit-avatar" src="${user.profile.profile_picture}"
            onerror="this.onerror=null;this.src='../../../images/default-user.png';">
        <i class="fa-solid fa-camera"></i>
        
        <input type='text'  id="new-avatar-url" value="${user.profile.profile_picture}">
        
        </div>
        <form @submit ="${(e) => saveChangesHandler(e, ctx, '/admin/Users', user.id)}">
        <p class="user-role user-role-set" style="text-align: center;">${user.role}</p>
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
                <button @click ="${() => hideModal()}" type="button">Cancel</button>
            </div>
    </form>
</div>
    `;
