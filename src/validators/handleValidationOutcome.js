export function handleValidationError(errorDetails, errorField, inputField, errorMsgPrefix) {
    let errors = [];
    console.log(errorDetails);
    errorDetails.forEach(errorMsg => {
        console.error(`${errorMsgPrefix} ${errorMsg}`);
        errors.push(errorMsg)
    });

    inputField.classList.add('invalid');
    errorField.innerHTML = errors.join('<br>');
}

export function handleValidationSuccess(errorField, inputField) {
    inputField.classList.remove('invalid');
    errorField.innerHTML = '';
}