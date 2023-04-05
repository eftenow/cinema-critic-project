import page from '../node_modules/page/page.mjs';
import { setUpMiddleware } from './middlewares/renderMiddleware.js';
import { logoutUser } from './services/authServices.js';
import { renderCreate } from './views/create.js';
import { renderDetails } from './views/details.js';
import { renderEdit } from './views/edit-profile.js';

import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderMovies } from './views/movies.js';
import { renderPopular } from './views/popular.js';
import { renderProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import {  renderUserReviews } from './views/userReviews.js';


page(setUpMiddleware);

page('/', renderHome);
page('/index.html', renderHome);
page('/movies', renderMovies);
page('/create', renderCreate);
page('/popular', renderPopular);
page('/userReviews', renderUserReviews);
page('/login', renderLogin);
page('/register', renderRegister);
page('/myProfile', renderProfile);
page('/settings', renderEdit);
page('/movies/details', renderDetails);



page('/logout', async (ctx)=> {
    await logoutUser();
    ctx.redirect('/');
});


page.start();