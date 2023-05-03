import page from '../node_modules/page/page.mjs';
import { filterMovies, filterSeries, sortHandler } from '../utils/filterButtons.js';
import { searchedMoviesPage } from '../utils/searchbar.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { setUpMiddleware } from './middlewares/renderMiddleware.js';
import { logoutUser } from './services/authServices.js';
import { pageNotFound } from './views/404page.js';
import { renderAdminPanel } from './views/adminPanel.js';
import { renderCreateMovie, renderCreateSeries } from './views/create.js';
import { renderMovieDetails, renderSeriesDetails } from './views/details.js';
import { renderEdit } from './views/edit-profile.js';

import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderAllContent } from './views/movies.js';
import { renderPopular } from './views/popular.js';
import { renderProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import { renderUserReviews } from './views/userReviews.js';


page('/gg', renderAdminPanel);
page(setUpMiddleware);

page('/', renderHome);
page('/index.html', renderHome);
page('/dashboard', renderAllContent);
page('/movies', filterMovies);
page('/series', filterSeries);
page('/createMovie', requireAuth, renderCreateMovie);
page('/createSerie', requireAuth,renderCreateSeries);
page('/popular',renderPopular);
page('/userReviews', requireAuth, renderUserReviews);
page('/login', renderLogin);
page('/register', renderRegister);
page('/myProfile', requireAuth, renderProfile);
page('/settings', requireAuth, renderEdit);
page('/movie/:id', renderMovieDetails);
page('/series/:id', renderSeriesDetails);
page('/dashboard/search', searchedMoviesPage);
page('/sort/:sortBy', sortHandler);

page('*', pageNotFound);


page('/logout', async (ctx)=> {
    await logoutUser();
    ctx.redirect('/');
});




page.start();