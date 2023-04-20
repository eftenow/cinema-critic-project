import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { toggleMenu } from '../../utils/dropdowns.js';
import { searchHandler, searchSuggestionsHandler, suggestionClickHandler } from '../../utils/searchbar.js';
import { getUser } from '../services/authServices.js';
import { adminId } from '../../secrets.js';

const navTemplate = (isAuthorized, user, ctx) => html`
<a href="/" class="nav-logo-container"><img id="logo" src="../../images/logo.png" alt=""></a>

<nav>
    <ul>
    <li>
            <form @submit="${(e) => searchHandler(e, ctx)}" class="search-form">
      <div class="search-input">
        <a href="" target="_blank" hidden></a>
        <input @keyup="${searchSuggestionsHandler}" autocomplete="off" name='search-text' type="text" placeholder="Search...">
        <div class="autocom-box" @click='${suggestionClickHandler}'>
         
        </div>
        <div class="icon"><i class="fas fa-search"></i></div>

    </div>

            </form>
        </li>
        <li><a class='nav-btns' href="/dashboard">Movies and Shows</a></li>
        <li><a class='nav-btns' href="/createMovie">Create Movie</a></li>
        <li><a class='nav-btns' href="/createSerie">Create Series</a></li>
        <li><a class='nav-btns' href="/popular">Popular</a></li>
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
                <i class="fa-solid fa-user"></i>
                    <p>Profile</p>
                    <span>></span>
                </a>
                <a href="/settings" class=sub-menu-link @click="${toggleMenu}">
                <i class="fa-solid fa-gear"></i>
                    <p>Settings</p>
                    <span>></span>
                </a>
                <a href="/logout" class=sub-menu-link @click="${toggleMenu}">
                <i class="fa-solid fa-right-from-bracket"></i>
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
        <li><a class='nav-btns' href="/login">Login</a></li>
        <li><a class='nav-btns' href="/register">Register</a></li>
        `}
    </ul>

</nav>
`;

export function showNavigation(ctx) {
    const isAuthorized = getUser() !== null;
    const user = getUser();
    const nav = navTemplate(isAuthorized, user, ctx);

    render(nav, document.querySelector('header'));
}

