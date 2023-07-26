export function raiseProfileEditErrors(errorDetails) {
    validateUsername(errorDetails.username);
    validateEmail(errorDetails.email);
    validateFirstName(errorDetails.profile.first_name);
    validateLastName(errorDetails.profile.last_name);
    validateCountry(errorDetails.profile.country);
    validateCity(errorDetails.profile.city);
    validateDescription(errorDetails.profile.description);
}

function validateUsername(usernameErrors) {
    const errorField = document.querySelector('.incorrect-username-msg');
    const usernameField = document.querySelector('#username');

    if (usernameErrors) {
        handleValidationError(usernameErrors, errorField, usernameField, 'Username Error:');
    } else {
        handleValidationSuccess(errorField, usernameField);
    }
}

function validateEmail(emailErrors) {
    const errorField = document.querySelector('.incorrect-email-msg');
    const emailField = document.querySelector('#email');

    if (emailErrors) {
        handleValidationError(emailErrors, errorField, emailField, 'Email Error:');
    } else {
        handleValidationSuccess(errorField, emailField);
    }
}

function validateFirstName(firstNameErrors) {
    const errorField = document.querySelector('.incorrect-fname-msg');
    const fnameField = document.querySelector('#fname');

    if (firstNameErrors) {
        handleValidationError(firstNameErrors, errorField, fnameField, 'First Name Error:');
    } else {
        handleValidationSuccess(errorField, fnameField);
    }
}

function validateLastName(lastNameErrors) {
    const errorField = document.querySelector('.incorrect-lname-msg');
    const lnameField = document.querySelector('#lname');

    if (lastNameErrors) {
        handleValidationError(lastNameErrors, errorField, lnameField, 'Last Name Error:');
    } else {
        handleValidationSuccess(errorField, lnameField);
    }
}

function validateCountry(countryErrors) {
    const errorField = document.querySelector('.incorrect-country-msg');
    const countryField = document.querySelector('#country');

    if (countryErrors) {
        handleValidationError(countryErrors, errorField, countryField, 'Country Error:');
    } else {
        handleValidationSuccess(errorField, countryField);
    }
}

function validateCity(cityErrors) {
    const errorField = document.querySelector('.incorrect-city-msg');
    const cityField = document.querySelector('#city');

    if (cityErrors) {
        handleValidationError(cityErrors, errorField, cityField, 'City Error:');
    } else {
        handleValidationSuccess(errorField, cityField);
    }
}

function validateDescription(descriptionErrors) {
    const errorField = document.querySelector('.incorrect-description-msg');
    const descriptionField = document.querySelector('#description');

    if (descriptionErrors) {
        handleValidationError(descriptionErrors, errorField, descriptionField, 'Description Error:');
    } else {
        handleValidationSuccess(errorField, descriptionField);
    }
}


///////////////////////////

function handleValidationError(errorDetails, errorField, inputField, errorMsgPrefix) {
    let errors = [];
    console.log(errorDetails);
    errorDetails.forEach(errorMsg => {
        console.error(`${errorMsgPrefix} ${errorMsg}`);
        errors.push(errorMsg)
    });

    inputField.classList.add('invalid');
    errorField.innerHTML = errors.join('<br>');
}

function handleValidationSuccess(errorField, inputField) {
    inputField.classList.remove('invalid');
    errorField.innerHTML = '';
}