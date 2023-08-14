import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
export let PAGE_SIZE = 12;

const endpoints = {
    content: (page) => `/content/all/?page=${page}`,
    allMovies: '/content/movies/',
    allSeries: '/content/series/',
    createMovie: '/content/movies/',
    createSeries: '/content/series/',
    detailsMovie: (id) => `/content/movies/${id}`,
    detailsSeries: (id) => `/content/series/${id}`,
    genres: '/genres/',
    search: (searchText) => `/content/search/?q=${searchText}`,
    userBookmarks: (id) => `/bookmarks/${id}/`,
    contentBookmark: (contentType, contentId) => `/bookmarks/${contentType}/${contentId}/`
};


export async function getAllMovies() {
    const movies = await get(endpoints.allMovies);
    const moviesFound = movies.results;
    return moviesFound;
};

export async function getTopMovies() {
    try {
      const Movie = Parse.Object.extend('Movie');
      const query = new Parse.Query(Movie);
      query.limit(5);
      query.descending('visits');
      const movies = await query.find();
      return movies.map(movie => movie.toJSON());
    } catch (err) {
      console.error(err);
    }
  }
export async function getMoviesCount() {
    const response = await get(endpoints.allMovies, { count: 1 });
    return response.count;
};
export async function createNewMovie(newMovie) {
    try {
        await post(endpoints.createMovie, newMovie);
        return { status: "success", message: "Movie created successfully." };
    } catch (error) {
        return error.data;
    }
};


export async function editExistingMovie(movieId, updatedMovie) {
    try {
        await put(endpoints.detailsMovie(movieId) + '/', updatedMovie);
        return { status: "success", message: "Movie updated successfully." };
    } catch (error) {
        return error.data;
    }
};


export async function getMovieDetails(id) {
    let movie =  await get(endpoints.detailsMovie(id) + '/');

    return movie.data
};


export async function deleteMovie(id) {
    return del(endpoints.detailsMovie(id) + '/');
};


////SERIES
export async function getAllSeries() {
    const series = await get(endpoints.allSeries);
    const seriesFound = series.results;
    return seriesFound;
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
    try {
        await post(endpoints.createSeries, newSeries);
        return { status: "success", message: "New series created successfully." };
    } catch (error) {
        return error.data;
    }
};


export async function editExistingSeries(seriesId, updatedSeries) {
    try {
        await put(endpoints.detailsSeries(seriesId) + '/', updatedSeries);
        return { status: "success", message: "Series updated successfully." };
    } catch (error) {
        return error.data;
    }
};

export async function getSeriesDetails(id) {
    const series =  await get(endpoints.detailsSeries(id) + '/');
    return series.data
};

export async function deleteSeries(id) {
    return await del(endpoints.detailsSeries(id) + '/');
};

//ALL
export async function getMoviesAndSeries(currentPage=1) {
    const content = await get(endpoints.content(currentPage));

    const contentFound = content;
    return contentFound;
};
export async function getAllContentData() {
    const promises = Promise.all([
        get(`${endpoints.allMovies}?keys=genres,objectId,type,image,rating,name`),
        get(`${endpoints.allSeries}?keys=genres,objectId,type,image,rating,name`)
    ]);
    const [movies, series] = await promises;
 
    const sortedMovies = movies.results;
    const sortedSeries = series.results;
    const results = sortedMovies.concat(sortedSeries);
    return results;
}

export async function getMoviesAndSeriesCount() {
    const response = await get(endpoints.content);
    return response.count;
};


////SEARCH
export async function getSearchMatches(searchText) {
    try {
        const response = await get(endpoints.search(searchText));

        const results = response.data.map((item) => {
            return {
                name: item.name,
                id: item.id,
                image: item.image,
                type: item.type,
                genres: item.genres,
                rating: item.rating
            };
        });

        return results;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

  export async function getAllGenres() {
    const genres = await get(endpoints.genres)
    return genres.data.map(item => item.name);
}

export async function getUserBookmarks(id) {
    const bookmarks = await get(endpoints.userBookmarks(id));
    return bookmarks.data;
};


export async function addBookmark(contentType, contentId) {
        await post(endpoints.contentBookmark(contentType, contentId));
};

export async function removeBookmark(contentType, contentId) {
    await del(endpoints.contentBookmark(contentType, contentId));
};