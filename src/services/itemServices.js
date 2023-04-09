import {post, put, del, get} from './api.js';

const endpoints = {
    allMovies: '/classes/Movie',
    allSeries: '/classes/Show',
    createMovie: '/classes/Movie',
    createSerie: '/classes/Show',
    create: '/data/shoes',
    movieDetails : '/classes/Movie/',
    seriesDetails : '/classes/Show/',
    like: '/data/likes',

};

export async function getAllMovies() {
    return get(endpoints.allMovies);
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
export async function getAllSeries() {
    return get(endpoints.allSeries);
};

export async function createNewSeire(newSerie) {
    return post(endpoints.createSerie, newSerie);
};

export async function getSeriesDetails(id) {
    return get(endpoints.seriesDetails + id);
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
}