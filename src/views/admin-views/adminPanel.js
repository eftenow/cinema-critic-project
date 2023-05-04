import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const adminPanelTemplate = (ctx) => html`
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
`

export function renderAdminPanel(ctx) {
    const adminPanel = adminPanelTemplate();
    
    ctx.render(adminPanel)
}