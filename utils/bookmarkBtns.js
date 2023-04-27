import { getUser } from "../src/services/authServices.js";

export function toggleBookmarkIcon(ev) {
    ev.preventDefault();
    const selectedMovie = ev.target.closest('.add-to-watchlist');
    
    const toAddSpan = selectedMovie.querySelector('#to-add');
    const toRemoveSpan = selectedMovie.querySelector('#to-remove');

    toAddSpan.classList.toggle('hidden');
    toRemoveSpan.classList.toggle('hidden');

};

export async function addUserBookmark(ctx, movieId, toSection) {
    const currentUser = getUser();
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    const user = await query.get(currentUser.objectId);
    const userBookmarks = user.get('userBookmarks') || [];
    userBookmarks.push(movieId);
    user.set('userBookmarks', userBookmarks);

    await user.save();
    if (toSection) {
        ctx.redirect(toSection);
    }
};

export async function removeUserBookmark(ctx, movieId, toSection) {
    const currentUser = getUser();
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    const user = await query.get(currentUser.objectId);
    user.remove('userBookmarks', movieId);

    await user.save();
    if (toSection) {
        ctx.redirect(toSection);
    }
};