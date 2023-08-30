import { html, render} from '../../../node_modules/lit-html/lit-html.js';
import { getUser } from '../../services/authServices.js';


export const adminNavTemplate = (user, ctx) => html`
<input type="checkbox" id="nav-toggle">
<section class="sidebar">
    <div class="sidebar-brand">
        <a href=''><div class="sidebar-logo"><img src="../../images/logo.png"></div></a>
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
<section class="navigation-admin"> 
    <header class="admin-header">
        <h2>
            <label for="nav-toggle">
                <span class="fa-solid fa-bars"></span>
            </label>
            Dashboard
        </h2>

        <div class="search-wrapper-admin"> 
            <span class=""></span>
            <input type="search" placeholder="Search...">
        </div>

        <a href='/myProfile'>
        <div class="user-wrapper-admin"> 
            <img width="40px" height="40px" src="${user.profile.profile_picture}" onerror="this.onerror=null;this.src='../../../images/default-user.png';">
            <div>
            <h4>${user.username}</h4>
            <small>${user.role}</small>
            </div>
        </div>
        </a>
    </header>
    <main class="main-section-admin"> <!-- main -->
    <div id="notification"></div>
    
        <div class="modal">
            
          </div>
</main>
</section>

`;

export async function showAdminNavigation(ctx) {
    const isAuthorized = getUser() !== null;
    const user = await getUser();

    if (!user || user.role !== 'Administrator') {
        ctx.redirect('/404')
    }
    const adminNav = adminNavTemplate(user, ctx);
    const body = document.querySelector('body');

    render(adminNav, body);
}


export function setActiveNavLink(path) {
    setTimeout(() => {
        const selectedSection = document.querySelector(`a[href="${path}"]`);

        const navLinks = document.querySelectorAll('.sidebar-menu li a');
        navLinks.forEach(link => link.classList.remove('active-admin'));

        if (selectedSection) {
            selectedSection.classList.add('active-admin');
        }
    }, 0);
}
