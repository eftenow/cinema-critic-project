export function displayPages(currentPage, totalPages) {
    let first = Math.max(currentPage - 1, 1);
    let second = first + 1;
    let third = first + 2;
    
    let pages = [first];
    if (second <= totalPages){
        pages.push(second);
    };
    if (third <= totalPages){
        pages.push(third);
    } else if(third > totalPages && first - 1 > 0){
        pages.unshift(first-1);
    }
    return pages;
};

