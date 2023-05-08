import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllUsernames, getAllUsers } from '../../services/authServices.js';

const userTemplateAdmin = (user) => html`
<tr>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
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
  ${users.map(user => userTemplateAdmin(user))}
  </tbody>
</table>
`

export async function renderUsersAdmin(ctx) {
  const users = await getAllUsers();
  console.log(users);
  const siteUsers = adminUsersTemplate(ctx, users);
  ctx.render(siteUsers)
  
}




