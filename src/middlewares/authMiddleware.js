import { getUser } from "../services/authServices.js";
import { showNotification } from "../services/reviewServices.js";

export function requireAuth(ctx, next) {
    const currentUser = getUser();
    debugger;
    if (!currentUser) {
      ctx.redirect('/login');
      showNotification('You need to be logged to acces that page.', 'red')
    } else {
      next();
    }
  };

  