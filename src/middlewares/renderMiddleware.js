import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { showNavigation } from '../views/navigation.js';


const mainRootElement = document.querySelector('main');

export function setUpMiddleware(ctx, next) {
    showNavigation(ctx);
    ctx.render = (content) => render(content, mainRootElement);
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
    
    next();
};