import { render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { hideSpinner, showSpinner } from '../../utils/loading-spinner.js';
import { getUser } from '../services/authServices.js';
import { showNavigation } from '../views/navigation.js';



export async function setUpMiddleware(ctx, next) {
    const user = await getUser();
    showNavigation(ctx, user);
    showSpinner();
  
    const mainRootElement = document.querySelector('main');
    ctx.render = (content) => {

      render(content, mainRootElement);
      setTimeout(hideSpinner, 5); // Delay hiding the spinner after rendering the content
    };
    ctx.redirect = (targetLocation) => page.redirect(targetLocation);
  
    next();
  }