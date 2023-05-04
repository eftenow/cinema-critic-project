import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const adminUsersTemplate = (ctx) => html`
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
    <tr>
      <td>user1</td>
      <td>user1@example.com</td>
      <td>Admin</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>user2</td>
      <td>user2@example.com</td>
      <td>User</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>user3</td>
      <td>user3@example.com</td>
      <td>User</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
  </tbody>
</table>
`

export function renderUsersAdmin(ctx) {
    const siteUsers = adminUsersTemplate();

    ctx.render(siteUsers)
}