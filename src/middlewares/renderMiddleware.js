import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { showNavigation } from '../views/navigation.js';



export function setUpMiddleware(ctx, next) {
    showNavigation(ctx);
    const mainRootElement = document.querySelector('main');
    ctx.render = (content) => render(content, mainRootElement);
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
    
    next();
};