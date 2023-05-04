import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getUser } from '../../services/authServices.js';


const adminNavTemplate = (user, ctx) => html`
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
                    <a href="/admin/dashboard" class="active-admin"><span class="fa-solid fa-chart-line"></span>
                        <span>Dashboard</span></a>
                </li>

                <li>
                    <a href="/admin/users"><span class="fa-solid fa-users"></span>
                        <span>Users</span></a>
                </li>
                
                <li>
                    <a href="/admin/movies"><span class="fa-solid fa-film"></span>
                        <span>Movies</span></a>
                </li>
                <li>
                    <a href="/admin/series"><span class="fa-solid fa-video"></span>
                        <span>Series</span></a>
                </li>
                <li>
                    <a href="/admin/reviews"><span class="fa-solid fa-list"></span>
                        <span>Reviews</span></a>
                </li>
                
            </ul>
        </nav>
    </div>
</section>
<section class="navigation-admin"> <!-- main-content -->
    <header class="admin-header">
        <h2>
            <label for="nav-toggle">
                <span class="fa-solid fa-bars"></span>
            </label>
            Dashboard
        </h2>

        <div class="search-wrapper-admin"> <!-- search-wrapper -->
            <span class=""></span>
            <input type="search" placeholder="Search...">
        </div>

        <div class="user-wrapper-admin"> <!-- user-wrapper -->
            <img src="../../images/profile.png" width="30px" height="30px">
            <div>
            <h4>Username</h4>
            <small>Head Admin</small>
            </div>
        </div>
    </header>
    <main class="main-section-admin"> <!-- main -->
</main>
</section>

`;

export function showAdminNavigation(ctx) {
    const isAuthorized = getUser() !== null;
    const user = getUser();
    const adminNav = adminNavTemplate(user, ctx);
    const body = document.querySelector('body');

    console.log(adminNav);
    console.log(body);
    render(adminNav, body);
}

