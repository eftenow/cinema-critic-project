import {post, put, del, get} from './api.js';

const endpoints = {
    allMovies: '/classes/Movie',
    createMovie: '/classes/Movie',
    allSeries: '/classes/Series',
    create: '/data/shoes',
    details : '/classes/Movie/',
    like: '/data/likes',

};

export async function getAllMovies() {
    return get(endpoints.allMovies);
};

export async function createNewMovie(newMovie) {
    return post(endpoints.createMovie, newMovie);
};

export async function editExistingMovie(id, editedItem) {
    return put(endpoints.details + id, editedItem);
    
}

export async function getMovieDetails(id) {
    return get(endpoints.details + id);
};

export async function deleteMovie(id) {
  return del(endpoints.details + id);  
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