import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { scrollToTop } from '../../../utils/backToTopBtn.js';
import { hideModal } from '../../../utils/reviewOperations.js';
import { getAllUsersAdmin } from '../../services/adminServices.js';
import { deleteUserById, getAllUsernames, getAllUsers } from '../../services/authServices.js';
import { cancelChangesHandler, saveChangesHandler } from '../edit-profile.js';
import { setActiveNavLink } from './adminNavigation.js';

const userTemplateAdmin = (user, ctx) => html`
<tr>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role == 'Administrator' || user.role == 'Moderator' ? html`<strong class='staff-role' >${user.role}</strong>` : user.role}</td>

      <td>
        <button @click='${(e) => editUserData(ctx, e, user)}' class='edit-btn-admin'><i class="fas fa-edit"></i></button>
        <button @click='${() => deleteUserById(user.id)}' class='delete-btn-admin'><i class="fas fa-trash"></i></button>
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


export function editUserData(ctx, ev, user) {
  ev.preventDefault();

  const modal = document.querySelector('.modal');
  modal.style.display = 'block';

  const editReviewForm = document.querySelector('.modal');
  render(editUserFormTemplate(user, ctx), editReviewForm);
};

const editUserFormTemplate = (user, ctx) => html`
     <div class="edit-profile admin-edit-modal">
    <div class="info" id='edit-pic-container'>
        <img class="edit-avatar" src="${user.profileImg}"
            onerror="this.onerror=null;this.src='../../images/default-user.png';">
        <i class="fa-solid fa-camera"></i>
        <input type='text'  id="new-avatar-url" value="${user.profileImg}">

    </div>
    <form @submit ="${(e) => saveChangesHandler(e, ctx, '/admin/Users', user.id)}">
        <div class="input-group ">
            <div class="input-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="${user.username}">
            </div>

            <div class="input-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.emailAddress}">
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
                <button @click ="${() => hideModal()}" type="button">Cancel</button>
            </div>
    </form>
</div>
    `;
