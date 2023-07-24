import { post, put, del, get } from './api.js';
import { APP_ID, JS_KEY } from "../../secrets.js";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';
export let PAGE_SIZE = 12;

const endpoints = {
    allMovies: '/content/movies/',
    allSeries: '/content/series/',
    createMovie: '/content/movies/',
    createSerie: '/content/series/',
    detailsMovie: (id)=> `/movies/${id}`,
    detailsSeries: (id)=> `/series/${id}`,
};


export async function getAllMovies() {
    const movies = await get(endpoints.allMovies, { keys: 'genres,objectId,type,image,rating,name,visits' });
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
    return post(endpoints.createMovie, newMovie);
};


export async function editExistingMovie(id, editedItem) {
    return put(endpoints.detailsMovie(id) + '/', editedItem);
};

export async function getMovieDetails(id) {
    return get(endpoints.detailsMovie(id) + '/');
};


export async function deleteMovie(id) {
    return del(endpoints.detailsMovie(id) + '/');
};


////SERIES
export async function getAllSeries() {
    const series = await get(endpoints.allSeries, { keys: 'genres,objectId,type,image,rating,name,visits' });
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
    return post(endpoints.createSerie, newSeries);
};

export async function updateSeries(id, updatedSeriesData) {
    return put(endpoints.detailsSeries(id) + '/', updatedSeriesData);
};

export async function getSeriesDetails(id) {
    return get(endpoints.detailsSeries(id) + '/');
};

export async function deleteSeries(id) {
    return del(endpoints.detailsSeries(id) + '/');
};

//ALL
export async function getMoviesAndSeries(page = 1, pageSize = PAGE_SIZE) {
    const offset = (page - 1) * pageSize;
    const promises = Promise.all([
      get(`${endpoints.allMovies}?keys=genres,objectId,type,image,rating,name,createdAt&order=-createdAt`),
      get(`${endpoints.allSeries}?keys=genres,objectId,type,image,rating,name,createdAt&order=-createdAt`),
    ]);
    const [movies, series] = await promises;
    const sortedMovies = movies.results;
    const sortedSeries = series.results;
  
    const results = sortedMovies.concat(sortedSeries);
    return results.slice(offset, offset + pageSize);
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
    movieQuery.matches("name", searchText, 'i');
    movieQuery.limit(6);

    const Series = Parse.Object.extend("Show");
    const seriesQuery = new Parse.Query(Series);
    seriesQuery.select("name", "objectId", "image", "type");
    seriesQuery.matches("name", searchText, 'i');
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