import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getUser } from '../services/authServices.js';
import { adminNavTemplate, showAdminNavigation } from '../views/admin-views/adminNavigation.js';




export async function adminSetUpMiddleware(ctx, next) {
    const isAuthorized = getUser() !== null;
    const user = await getUser();

    if (!user || user.role !== 'Administrator') {
        ctx.redirect('/404')
    }

    const body = document.querySelector('body');
    const adminNav = adminNavTemplate(user, ctx);

    render(adminNav, body);

    const mainRootElement = document.querySelector('.main-section-admin');

    ctx.render = (content) => render(content, mainRootElement);
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
    
    next();
}



