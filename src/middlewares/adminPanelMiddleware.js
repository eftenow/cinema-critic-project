import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { showAdminNavigation } from '../views/admin-views/adminNavigation.js';




export function adminSetUpMiddleware(ctx, next) {
    showAdminNavigation(ctx);
    const mainRootElement = document.querySelector('.main-section-admin');
    ctx.render = (content) => render(content, mainRootElement);
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
    
    next();
};



