export function handleValidationError(errorDetails, errorField, inputField, errorMsgPrefix) {
    let errors = [];
    errorDetails.forEach(errorMsg => {
        errors.push(errorMsg)
    });

    inputField.classList.add('invalid');
    errorField.innerHTML = errors.join('<br>');
}

export function handleValidationSuccess(errorField, inputField) {
    inputField.classList.remove('invalid');
    errorField.innerHTML = '';
}