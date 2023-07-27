import { handleValidationError, handleValidationSuccess } from "./handleValidationOutcome.js";

export function raiseCreateErrors(errorDetails) {
    let hasErrors = false;
    
    hasErrors = validateTitle(errorDetails.name) || hasErrors;
    hasErrors = validateGenre(errorDetails.genre) || hasErrors;
    hasErrors = validateImageUrl(errorDetails.imageUrl) || hasErrors;
    hasErrors = validateDirector(errorDetails.director) || hasErrors;
    hasErrors = validateStars(errorDetails.stars) || hasErrors;
    hasErrors = validateLength(errorDetails.length) || hasErrors;
    hasErrors = validateYear(errorDetails.year) || hasErrors;
    hasErrors = validateTrailer(errorDetails.trailer) || hasErrors;
    hasErrors = validateDescription(errorDetails.description) || hasErrors;
    
    if (errorDetails.type === 'series') {
        hasErrors = validateSeasons(errorDetails.seasons) || hasErrors;
        hasErrors = validateEpisodes(errorDetails.episodes) || hasErrors;
    }

    return hasErrors;
}


function validateTitle(titleErrors) {
    const errorField = document.querySelector('.incorrect-title-msg');
    const titleField = document.querySelector('#create-title-field');

    if (titleErrors) {
        handleValidationError(titleErrors, errorField, titleField, 'Title Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, titleField);
        return false;
    }
}

function validateGenre(genreErrors) {
    const errorField = document.querySelector('.incorrect-genre-msg');
    const genreField = document.querySelector('#create-genre');

    if (genreErrors) {
        handleValidationError(genreErrors, errorField, genreField, 'Genre Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, genreField);
    }
}

function validateImageUrl(imageUrlErrors) {
    const errorField = document.querySelector('.incorrect-imageUrl-msg');
    const imageUrlField = document.querySelector('#create-imageUrl');

    if (imageUrlErrors) {
        handleValidationError(imageUrlErrors, errorField, imageUrlField, 'Image URL Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, imageUrlField);
    }
}

function validateDirector(directorErrors) {
    const errorField = document.querySelector('.incorrect-director-msg');
    const directorField = document.querySelector('#create-director');

    if (directorErrors) {
        handleValidationError(directorErrors, errorField, directorField, 'Director Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, directorField);
    }
}

function validateStars(starsErrors) {
    const errorField = document.querySelector('.incorrect-stars-msg');
    const starsField = document.querySelector('#create-stars');

    if (starsErrors) {
        handleValidationError(starsErrors, errorField, starsField, 'Stars Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, starsField);
    }
}

function validateSeasons(seasonsErrors) {
    const errorField = document.querySelector('.incorrect-seasons-msg');
    const seasonsField = document.querySelector('#create-seasons');

    if (seasonsErrors) {
        handleValidationError(seasonsErrors, errorField, seasonsField, 'Seasons Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, seasonsField);
    }
}

function validateEpisodes(episodesErrors) {
    const errorField = document.querySelector('.incorrect-episodes-msg');
    const episodesField = document.querySelector('#create-episodes');

    if (episodesErrors) {
        handleValidationError(episodesErrors, errorField, episodesField, 'Episodes Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, episodesField);
    }
}

function validateLength(lengthErrors) {
    const errorField = document.querySelector('.incorrect-length-msg');
    const lengthField = document.querySelector('#create-length');

    if (lengthErrors) {
        handleValidationError(lengthErrors, errorField, lengthField, 'Length Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, lengthField);
    }
}

function validateYear(yearErrors) {
    const errorField = document.querySelector('.incorrect-year-msg');
    const yearField = document.querySelector('#create-year');

    if (yearErrors) {
        handleValidationError(yearErrors, errorField, yearField, 'Year Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, yearField);
    }
}

function validateTrailer(trailerErrors) {
    const errorField = document.querySelector('.incorrect-trailer-msg');
    const trailerField = document.querySelector('#create-trailer');

    if (trailerErrors) {
        handleValidationError(trailerErrors, errorField, trailerField, 'Trailer Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, trailerField);
    }
}

function validateDescription(descriptionErrors) {
    const errorField = document.querySelector('.incorrect-description-msg');
    const descriptionField = document.querySelector('#create-description');

    if (descriptionErrors) {
        handleValidationError(descriptionErrors, errorField, descriptionField, 'Description Error:');
        return true;
    } else {
        handleValidationSuccess(errorField, descriptionField);
    }
}
