import { getUser } from "../src/services/authServices.js";
import { addBookmark, removeBookmark } from "../src/services/itemServices.js";

export function toggleBookmarkIcon(ev) {
    ev.preventDefault();
    const selectedMovie = ev.target.closest('.add-to-watchlist');
    
    const toAddSpan = selectedMovie.querySelector('#to-add');
    const toRemoveSpan = selectedMovie.querySelector('#to-remove');

    toAddSpan.classList.toggle('hidden');
    toRemoveSpan.classList.toggle('hidden');

};

export async function addUserBookmark(ctx, movieId, contentType, toSection) {
    await addBookmark(contentType, movieId)

    if (toSection) {
        ctx.redirect(toSection);
    }
};

export async function removeUserBookmark(ctx, movieId,contentType, toSection) {
    await removeBookmark(contentType, movieId)

    if (toSection) {
        ctx.redirect(toSection);
    }
};