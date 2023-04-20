import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
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
    const offset = (page - 1) * pageSize;
    const movies = await getTotalMovies();
    const moviesFound = movies.results;
    return moviesFound.slice(offset, offset + pageSize);

};

export async function getMoviesCount() {
    let movies = await getTotalMovies();
    let moviesCount = movies.results.length;
    return moviesCount;
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
export async function getAllSeries(page = 1, pageSize = PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const series = await getTotalSeries();
    const seriesFound = series.results;
    return seriesFound.slice(offset, offset + pageSize);
};

export async function getSeriesCount() {
    let series = await getTotalSeries();
    let seriesCount = series.results.length;
    return seriesCount;
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
    const promises = Promise.all([get(endpoints.allMovies), get(endpoints.allSeries)]);
    const [movies, series] = await promises;
    const sortedMovies = movies.results;
    const sortedSeries = series.results;

    const results = sortedMovies.concat(sortedSeries);
    return results.slice(offset, offset + pageSize);
};

export async function getMoviesAndSeriesCount() {
    const promises = Promise.all([getTotalMovies(), getTotalSeries()]);
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

// additional

export async function getTotalMovies() {
    return get(endpoints.allMovies);
};

export async function getTotalSeries() {
    return get(endpoints.allSeries);
};

export async function getSearchMatches(searchText) {
    const Movie = Parse.Object.extend("Movie");
    const movieQuery = new Parse.Query(Movie);
    movieQuery.select("name", "objectId", "image", "type");
    movieQuery.startsWith("name", searchText, 'i');
    movieQuery.limit(6);

    const Series = Parse.Object.extend("Show");
    const seriesQuery = new Parse.Query(Series);
    seriesQuery.select("name", "objectId", "image", "type");
    seriesQuery.startsWith("name", searchText, 'i');
    seriesQuery.limit(6);

    const [movieData, seriesData] = await Promise.all([
        movieQuery.find(),
        seriesQuery.find(),
    ]);

    const data = [...movieData, ...seriesData];
    const results = data
        .slice(0, 6)
        .map((item) => {
            return {
                name: item.get("name"),
                objectId: item.id,
                image: item.get("image"),
                type: item.get("type")
            };
        });

    return results;
};