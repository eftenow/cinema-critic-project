import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { hideSpinner, showSpinner } from '../../utils/loading-spinner.js';
import { showNavigation } from '../views/navigation.js';



export function setUpMiddleware(ctx, next) {
    showNavigation(ctx);
    showSpinner();
  
    const mainRootElement = document.querySelector('main');
    ctx.render = (content) => {

      render(content, mainRootElement);
      setTimeout(hideSpinner, 10); // Delay hiding the spinner after rendering the content
    };
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
  
    next();
  }