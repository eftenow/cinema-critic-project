import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getUsersCount } from '../../services/authServices.js';
import { getMoviesCount, getSeriesCount } from '../../services/itemServices.js';
import { getReviewsCount } from '../../services/reviewServices.js';
import { setActiveNavLink } from './adminNavigation.js';


const adminPanelTemplate = (usersCount, moviesCount, seriesCount, reviewsCount) => html`
  <div class="admin-cards"> 

<div class="card-single">
    <div class='card-data'>
        <h4>${usersCount}</h4>
        <span>Users</span>
    </div>
    <div><span class="fa-solid fa-users"></span></div>
</div>

<div class="card-single">
    <div class='card-data'>
        <h4>${moviesCount}</h4>
        <span>Movies</span>
    </div>
    <div><span class="fa-solid fa-film"></span></div>
    
</div>

<div class="card-single">
    <div class='card-data'>
        <h4>${seriesCount}</h4>
        <span>TV Shows</span>
    </div>
    <div><span class="fa-solid fa-video"></span></div>
</div>

<div class="card-single">
    <div class='card-data'>
        <h4>${reviewsCount}</h4>
        <span>Reviews</span>
    </div>
    <div><span class="fa-solid fa-list"></span></div>
    
</div>
</div>
`

export async function renderAdminPanel(ctx) {
    const [usersCount, moviesCount, seriesCount, reviewsCount] = await Promise.all([
        getUsersCount(),
        getMoviesCount(),
        getSeriesCount(),
        getReviewsCount()
    ]);

    const adminPanel = adminPanelTemplate(usersCount, moviesCount, seriesCount, reviewsCount);
    setActiveNavLink('/admin/dashboard');
    ctx.render(adminPanel)
}