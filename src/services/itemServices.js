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


export async function editExistingMovie(id, editedItem) {
    return await put(endpoints.detailsMovie(id) + '/', editedItem);
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

export async function updateSeries(id, updatedSeriesData) {
    return await put(endpoints.detailsSeries(id) + '/', updatedSeriesData);
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

        console.log(response);
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


export const getUserWatchlist = async (userId) => {
    const userQuery = new Parse.Query("User");
    userQuery.equalTo("objectId", userId);
    userQuery.include("userBookmarks");
    const user = await userQuery.first();
  
    const bookmarkedMoviesIds = user.get("userBookmarks");
  
    const movieQuery = new Parse.Query('Movie');
    movieQuery.containedIn('objectId', bookmarkedMoviesIds);
  
    const showQuery = new Parse.Query('Show');
    showQuery.containedIn('objectId', bookmarkedMoviesIds);
  
    const movieResults = await movieQuery.find();
    const showResults = await showQuery.find();
  
    const movies = movieResults.map(movie => {
      const movieData = movie.toJSON();
      movieData.objectId = movie.id;
      movieData.type = 'movie';
      return movieData;
    });
  
    const shows = showResults.map(show => {
      const showData = show.toJSON();
      showData.objectId = show.id;
      showData.type = 'show';
      return showData;
    });
  
    return [...movies, ...shows];
  };


  export async function getAllGenres() {
    const genres = await get(endpoints.genres)
    return genres.data.map(item => item.name);
}

export async function getUserBookmarks(id) {
    const bookmarks = await get(endpoints.userBookmarks(id));
    return bookmarks;
};


export async function addBookmark(contentType, contentId) {
        await post(endpoints.contentBookmark(contentType, contentId));
};

export async function removeBookmark(contentType, contentId) {
    await del(endpoints.contentBookmark(contentType, contentId));
};