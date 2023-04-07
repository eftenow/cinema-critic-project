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






export async function likeAlbum(albumId) {
    return post(endpoints.like, {albumId});
};

export async function getLikesCount(id) {
    return get(`/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`);
};

export async function userAlreadyLiked(albumId, userId) {
    if (!userId){
        return;
    }
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function getSearchResult(query) {
    return get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
}