import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const adminMoviesTemplate = (ctx) => html`
<input type="checkbox" id="nav-toggle">
<section class="sidebar">
    <!-- sidebar -->
    <div class="sidebar-brand">
        <!-- sidebar-brand -->
        <div class="sidebar-logo"><img src="../../images/logo.png"></div>
        <!-- h1 span -->
        <nav class="sidebar-menu">
            <ul>
                <li>
                    <a href="" class="active-admin"><span class="fa-solid fa-chart-line"></span>
                        <span>Dashboard</span></a>
                </li>

                <li>
                    <a href=""><span class="fa-solid fa-users"></span>
                        <span>Users</span></a>
                </li>
                
                <li>
                    <a href=""><span class="fa-solid fa-film"></span>
                        <span>Movies</span></a>
                </li>
                <li>
                    <a href=""><span class="fa-solid fa-video"></span>
                        <span>Series</span></a>
                </li>
                <li>
                    <a href=""><span class="fa-solid fa-list"></span>
                        <span>Reviews</span></a>
                </li>
            </ul>
        </nav>
    </div>
</section>
<section class="navigation-admin">
  <!-- main-content -->
  <header class="admin-header">
    <h2>
      <label for="nav-toggle">
        <span class="fa-solid fa-bars"></span>
      </label>
      Users
    </h2>

    <div class="search-wrapper-admin">
      <span class=""></span>
      <input type="search" placeholder="Search...">
    </div>

    <div class="user-wrapper-admin">
      <img src="../../images/profile.png" width="30px" height="30px">
      <div>
        <h4>Username</h4>
        <small>Head Admin</small>
      </div>
    </div>
  </header>
  <main class="main-section-admin">
    <h2 class='admin-table-header'>Movies</h2>
  <table class="movie-table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Rating</th>
      <th>Visits</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Movie 1</td>
      <td>Action</td>
      <td>8.5</td>
      <td>100</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>Movie 2</td>
      <td>Comedy</td>
      <td>7.5</td>
      <td>200</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
    <tr>
      <td>Movie 3</td>
      <td>Drama</td>
      <td>9.0</td>
      <td>150</td>
      <td>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
        <i class="fas fa-forward"></i>
      </td>
    </tr>
  </tbody>
</table>
  </main>
</section>

`

export function renderMoviesAdmin(ctx) {
    const siteMovies = adminMoviesTemplate();
    const body = document.querySelector('body');
    body.innerHTML = '';
    render(siteMovies, body);
}