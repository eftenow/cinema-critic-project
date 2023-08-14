const displayRating = (rating) => {
    const numberRating = Number(rating);
    return Number.isInteger(numberRating) ? parseInt(numberRating) : numberRating.toFixed(2);
}


export default displayRating;