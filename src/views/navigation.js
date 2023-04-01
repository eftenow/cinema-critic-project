import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { toggleMenu } from '../../utils/dropdowns.js';
import { getUser } from '../services/authServices.js';

const adminId = '9Hy9y4Zpzd';
const navTemplate = (isAuthorized, user) => html`
<a href="/" class="nav-logo-container"><img id="logo" src="../../images/logo.png" alt=""></a>

<nav>
    <ul>
    <li>
            <form class="search-form">
                <input class="input-search" type="text" placeholder="Search...">
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </li>
        <li><a href="/movies">Movies</a></li>
        <li><a href="/series">TV Shows</a></li>
        <li><a href="/popular">Popular</a></li>
        ${isAuthorized ?
        html`
        <li @click="${toggleMenu}" ><img class="user-pic" src="${user.profileImg}" onerror="this.onerror=null;this.src='../../images/default-user.png';"></li>
        <li  class="sub-menu-wrap" id="subMenu">
            <div  class="sub-menu">
                <div class="user-info">
                <img src="${user.profileImg}" onerror="this.onerror=null;this.src='../../images/default-user.png';">
                    <h3>${user.username}</h3>
                </div>
                <hr>
                <a href="/myProfile" class=sub-menu-link @click="${toggleMenu}">
                    <img src="../../images/profile.png">
                    <p>Profile</p>
                    <span>></span>
                </a>
                <a href="/settings" class=sub-menu-link @click="${toggleMenu}">
                    <img src="../../images/setting.png">
                    <p>Settings</p>
                    <span>></span>
                </a>
                <a href="/logout" class=sub-menu-link @click="${toggleMenu}">
                    <img src="../../images/logout.png">
                    <p>Logout</p>
                    <span>></span>
                </a>
                ${user.objectId == adminId ? html`
                <a href="/adminPanel" class=sub-menu-link @click="${toggleMenu}">
                <i class="fa-solid fa-wrench"></i>
                    <p>Admin Panel</p>
                    <span>></span>`
                    :''}
                
                </a>
            </div>
        </li>
        `
        
        : html`
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        `}
    </ul>

</nav>
`;

export function showNavigation(ctx) {
    const isAuthorized = getUser() !== null;
    const user = getUser();
    const nav = navTemplate(isAuthorized, user);

    render(nav, document.querySelector('header'));
}

