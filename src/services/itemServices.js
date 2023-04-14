import { post, put, del, get } from './api.js';
export let PAGE_SIZE = 12;

const endpoints = {
    allMovies: '/classes/Movie',
    allSeries: '/classes/Show',
    createMovie: '/classes/Movie',
    createSerie: '/classes/Show',
    create: '/data/shoes',
    movieDetails: '/classes/Movie/',
    seriesDetails: '/classes/Show/',
    like: '/data/likes',

};



export async function getAllMovies(page = 1, pageSize = PAGE_SIZE) {
    let querystring = `?skip=${(page - 1) * pageSize}&limit=${pageSize}`;
    return get(endpoints.allMovies + querystring);
};

export async function getMoviesCount() {
    let moviesCount = endpoints.allMovies;
    return moviesCount.length;
};

export async function createNewMovie(newMovie) {
    return post(endpoints.createMovie, newMovie);
};


export async function editExistingMovie(id, editedItem) {
    return put(endpoints.movieDetails + id, editedItem);

}

export async function getMovieDetails(id) {
    return get(endpoints.movieDetails + id);

};

export async function deleteMovie(id) {
    return del(endpoints.movieDetails + id);
};


////SERIES
export async function getAllSeries(page = 1, pageSize = 12) {
    let querystring = `?skip=${(page - 1) * pageSize}&limit=${pageSize}`;
    return get(endpoints.allSeries + querystring);
};

export async function getSeriesCount() {
    let seriesCount = endpoints.allSeries;
    return seriesCount.length;
};

export async function createNewSeire(newSeries) {
    return post(endpoints.createSerie, newSeries);
};

export async function getSeriesDetails(id) {
    return get(endpoints.seriesDetails + id);
};


//ALL
export async function getMoviesAndSeries(page = 1, pageSize = PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const promises = Promise.all([getAllMovies(), getAllSeries()]);
    const [movies, series] = await promises;
    const sortedMovies = movies.results;
    const sortedSeries = series.results;

    const results = sortedMovies.concat(sortedSeries);
    return results.slice(offset, offset + pageSize);
};

export async function getMoviesAndSeriesCount() {
    const promises = Promise.all([getAllMovies(), getAllSeries()]);
    const [movies, series] = await promises;
    const moviesCount = movies.results.length;
    const seriesCount = series.results.length;
    return moviesCount + seriesCount;
};

////SEARCH

export async function getSearchedMovies(searchMovie) {
    let queryStr = `?where={"name":{"$regex":"${searchMovie}", "$options":"i"}}`;

    const movieMatches = endpoints.allMovies + queryStr;
    const seriesMatches = endpoints.allSeries + queryStr;

    const promises = Promise.all([
        get(movieMatches),
        get(seriesMatches)
    ]);

    

    const [moviesFound, seriesFound] = await promises;

    let allMatches = [...moviesFound.results, ...seriesFound.results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return allMatches
};

