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
    const movies = await get(endpoints.allMovies, { keys: 'genres,objectId,type,image,rating,name' });
    const moviesFound = movies.results;
    return moviesFound.slice(offset, offset + pageSize);
};

export async function getTopMovies() {
    try {
        const movies = await get(endpoints.allMovies, {
            keys: "name,movieLength,genres,rating,director,stars,description,objectId,type,image",
            limit: 5,
            order: "-views",
        });
        return movies.results;
    } catch (err) {
        console.error(err);
    }
}

export async function getMoviesCount() {
    const response = await get(endpoints.allMovies, { count: 1 });
    return response.count;
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
    const series = await get(endpoints.allSeries, { keys: 'genres,objectId,type,image,rating,name' });
    const seriesFound = series.results;
    return seriesFound.slice(offset, offset + pageSize);
};

export async function getTopSeries() {
    const series = await get(`${endpoints.allSeries}?limit=5&sort=-views`, {
        keys: "genres,objectId,image,rating,name",
    });
    const topSeries = series.results;
    return topSeries;
}

export async function getSeriesCount() {
    const response = await get(endpoints.allSeries, { count: 1 });
    return response.count;
}

export async function createNewSeire(newSeries) {
    return post(endpoints.createSerie, newSeries);
};

export async function getSeriesDetails(id) {
    return get(endpoints.seriesDetails + id);
};


//ALL
export async function getMoviesAndSeries(page = 1, pageSize = PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const promises = Promise.all([
        get(`${endpoints.allMovies}?keys=genres,objectId,type,image,rating,name`),
        get(`${endpoints.allSeries}?keys=genres,objectId,type,image,rating,name`)
    ]);
    const [movies, series] = await promises;
    const sortedMovies = movies.results;
    const sortedSeries = series.results;

    const results = sortedMovies.concat(sortedSeries);
    return results.slice(offset, offset + pageSize);
};

export async function getMoviesAndSeriesCount() {
    const [moviesCount, seriesCount] = await Promise.all([
        getMoviesCount(),
        getSeriesCount()
    ]);

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