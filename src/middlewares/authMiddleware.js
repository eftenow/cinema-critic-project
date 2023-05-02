export function requireAuth(ctx, next) {
    const currentUser = Parse.User.current();
    if (!currentUser) {
      ctx.redirect('/login');
    } else {
      next();
    }
  }