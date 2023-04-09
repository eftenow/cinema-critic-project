import { getSearchedMovies} from '../src/services/itemServices.js';
import { moviesTemplate } from '../src/views/movies.js';

export async function searchHandler(ev, ctx) {
    ev.preventDefault();
    const searchForm = new FormData(ev.target);
    const searchText = searchForm.get('search-text');

    ctx.redirect(`/dashboard/search?match=${encodeURIComponent(searchText)}`);
    ev.target.reset();
};

export async function searchedMoviesPage(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchText = searchParams.get('match');
    console.log(searchText);
    const result = await getSearchedMovies(searchText);

    console.log(result);
    const moviesFound = moviesTemplate(result);

    ctx.render(moviesFound);
    // const teamsThatMeetCriteria = await getSpecificTeam(searchText);
    // showTeams(teamsThatMeetCriteria, ctx);


};

