import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { toggleMenu, toggleNavMenu } from '../../utils/dropdowns.js';
import { searchHandler, searchSuggestionsHandler, suggestionClickHandler } from '../../utils/searchbar.js';
import { getUser } from '../services/authServices.js';
import { adminId } from '../../secrets.js';

const navTemplate = (isAuthorized, user, ctx) => html`
<header class="cc-header">
<a href="/" class="nav-logo-container"><img id="logo" src="../../images/logo.png" alt=""></a>

<nav class='nav-cc'>
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
        <li id='navMoviesSeries'><a class='nav-btns' href="/dashboard">Movies and Shows</a></li>
        ${isAuthorized
        ? html`
        <li><a class='nav-btns' href="/createMovie">Create Movie</a></li>
        <li><a class='nav-btns' href="/createSerie">Create Series</a></li>` : ''}
        <li><a class='nav-btns' href="/popular">Popular</a></li>
        <li id='burger-btn' @click="${toggleNavMenu}" ><span class="fa-solid fa-bars"></span></li>
        <li  class="sub-menu-options-wrap" id="subMenuOptions">
            <div  class="sub-menu-options">
                <div class="nav-info">
                    <h3>Menu</h3>
                </div>
                <hr>
                <a class=sub-menu-link href="/" @click="${toggleNavMenu}">
                    <p>Home</p>
                    <span>></span></a>

                ${!isAuthorized
        ? html`
                <a class=sub-menu-link href="/login" @click="${toggleNavMenu}">
                    <p>Login</p>
                    <span>></span></a>

                <a class=sub-menu-link href="/register" @click="${toggleNavMenu}">
                    <p>Register</p>
                    <span>></span></a>`
        : html`
                <a class=sub-menu-link href="/createMovie" @click="${toggleNavMenu}">
                    <p>Create Movie</p>
                    <span>></span></a>

                <a class=sub-menu-link href="/createSerie" @click="${toggleNavMenu}">
                    <p>Create Series</p>
                    <span>></span>
                </a>
                `
    }
                <a class=sub-menu-link href="/dashboard" @click="${toggleNavMenu}">
                    <p>Movies and Shows</p>
                    <span>></span></a>

                <a class=sub-menu-link href="/popular" @click="${toggleNavMenu}">
                    <p>Popular</p>
                    <span>></span>
                </a>
            </div>
        </li>

        ${isAuthorized ?
        html`
        <li id='user-photo-wrapper' @click="${toggleMenu}" ><img class="user-pic" src="${user.profileImg}" onerror="this.onerror=null;this.src='../../images/default-user.png';"></li>
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
                <a href="/admin" class=sub-menu-link @click="${toggleMenu}">
                <i class="fa-solid fa-wrench"></i>
                    <p>Admin Panel</p>
                    <span>></span>`
                : ''}
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
    </header>

    <main>
    <div class="loader"></div>
        <div id="notification"></div>
        <div class="modal">
            <div class="modal-content"></div>
          </div>
    </main>
    <button id="back-to-top-btn">
        <i id='arrows-up' class="fa-solid fa-angles-up"></i>
            </button>
    <footer>
        <p>&copy; 2023 Cinema Critic. All rights reserved.</p>
    </footer>
`;

export function showNavigation(ctx) {
    const isAuthorized = getUser() !== null;
    const user = getUser();
    const nav = navTemplate(isAuthorized, user, ctx);

    render(nav, document.querySelector('body'));
}

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
  
    loader.classList.add("loader--hidden");
  
    loader.addEventListener("transitionend", () => {
      loader.remove;
    });
  });