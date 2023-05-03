import { html, render } from '../../node_modules/lit-html/lit-html.js';

const adminPanelTemplate = (ctx) => html`
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

    <div class="admin-cards"> <!-- cards -->

        <div class="card-single">
            <div class='card-data'>
                <h4>54</h4>
                <span>Users</span>
            </div>
            <div><span class="fa-solid fa-users"></span></div>
        </div>

        <div class="card-single">
            <div class='card-data'>
                <h4>32</h4>
                <span>Movies</span>
            </div>
            <div><span class="fa-solid fa-film"></span></div>
            
        </div>

        <div class="card-single">
            <div class='card-data'>
                <h4>9</h4>
                <span>TV Shows</span>
            </div>
            <div><span class="fa-solid fa-video"></span></div>
        </div>

        <div class="card-single">
            <div class='card-data'>
                <h4>15</h4>
                <span>Reviews</span>
            </div>
            <div><span class="fa-solid fa-list"></span></div>
            
        </div>
    </div>

</main>
</section>

`

export function renderAdminPanel(ctx) {
    const adminPanel = adminPanelTemplate();
    const body = document.querySelector('body');
    body.innerHTML = '';
    render(adminPanel, body);
}