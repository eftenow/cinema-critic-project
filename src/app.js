import page from '../node_modules/page/page.mjs';
import { filterMovies, filterSeries, sortHandler } from '../utils/filterButtons.js';
import { searchedMoviesPage } from '../utils/searchbar.js';
import { adminSetUpMiddleware } from './middlewares/adminPanelMiddleware.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { setUpMiddleware } from './middlewares/renderMiddleware.js';
import { logoutUser } from './services/authServices.js';
import { pageNotFound } from './views/404page.js';
import { renderMoviesAdmin } from './views/admin-views/adminMovies.js';
import { renderAdminPanel } from './views/admin-views/adminPanel.js';
import { renderReviewsAdmin } from './views/admin-views/adminReviews.js';
import { renderSeriesAdmin } from './views/admin-views/adminSeries.js';
import { renderUsersAdmin } from './views/admin-views/adminUsers.js';
import { renderCreateMovie, renderCreateSeries } from './views/create.js';
import { renderMovieDetails, renderSeriesDetails } from './views/details.js';
import { renderEdit } from './views/edit-profile.js';

import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderAllContent } from './views/movies.js';
import { renderPopular } from './views/popular.js';
import { renderProfile, renderUserProfile } from './views/profile.js';
import { renderRegister } from './views/register.js';
import { renderUserReviews } from './views/userReviews.js';


page('/admin', adminSetUpMiddleware, renderAdminPanel);
page('/admin/dashboard',adminSetUpMiddleware, renderAdminPanel);
page('/admin/users',adminSetUpMiddleware, renderUsersAdmin);
page('/admin/movies',adminSetUpMiddleware, renderMoviesAdmin);
page('/admin/series',adminSetUpMiddleware, renderSeriesAdmin);
page('/admin/reviews',adminSetUpMiddleware, renderReviewsAdmin);
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
page('/user/:id', requireAuth, renderUserProfile);
page('/settings', requireAuth, renderEdit);
page('/movie/:id', renderMovieDetails);
page('/series/:id', renderSeriesDetails);
page('/dashboard/search', searchedMoviesPage);
page('/sort/:sortBy', sortHandler);

page('/logout', async (ctx)=> {
    await logoutUser();
    ctx.redirect('/');
});

page('*', pageNotFound);




page.start();