import { getUser } from "../services/authServices.js";
import { showNotification } from "../services/reviewServices.js";

export async function requireAuth(ctx, next) {
    const currentUser = await getUser();

    if (!currentUser) {
      ctx.redirect('/login');
      showNotification('You need to be logged to acces that page.', 'red')
    } else {
      next();
    }
  };

  