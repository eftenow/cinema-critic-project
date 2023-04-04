import { html } from '../../node_modules/lit-html/lit-html.js';



const popularMoviesTemplate = (ctx) => html`
<section class="popular-movies">
    <h2 class="popular-heading">Popular this week</h2>
    <div class="leaderboard">
    <div class="movie-container">
        <div class="movie-info">
            <div class="movie-details">
                <div class="movie-thumbnail">
                    <img src="../../images/king-of-tulsa.jpg" alt="Movie Name">
                </div>
                <div class="movie-text">
                    <h4 class="popular-movie-title"> <span>1. </span>Tulsa King</h4>
                    <p class="movie-meta">93 min | Drama</p>
                    <div class="popular-movie-rating">
                        <p class="movie-score"><i class="fa-solid fa-star"></i> 8.5</p>
                        <button class="rate-button">Rate this</button>
                    </div>
                    <p class="movie-description">Following his release from prison, Mafia capo Dwight "The General"
                        Manfredi is exiled to Tulsa, Oklahoma, where he builds a new criminal empire with a group of
                        unlikely characters.</p>
                    <p class="movie-cast">Director: Francis Ford Coppola</p>
                    <p class="movie-cast">Stars: Marlon Brando, Al Pacino</p>
                </div>
            </div>
            <div class="movie-watchlist">
                <button class="add-to-watchlist">

                    <span class="fa-stack fa-2x">
                        <i id="bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
                        <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
                    </span>
                </button>
            </div>
        </div>
    </div>

    <div class="movie-container">
        <div class="movie-info">
            <div class="movie-details">
                <div class="movie-thumbnail">
                    <img src="../../images/vikings.jpg" alt="Movie Name">
                </div>
                <div class="movie-text">
                    <h4 class="popular-movie-title"><span>2. </span>Vikings</h4>
                    <p class="movie-meta">93 min | Drama</p>
                    <div class="popular-movie-rating">
                        <p class="movie-score"><i class="fa-solid fa-star"></i> 8.5</p>
                        <button class="rate-button">Rate this</button>
                    </div>
                    <p class="movie-description">Following his release from prison, Mafia capo Dwight "The General"
                        Manfredi is exiled to Tulsa, Oklahoma, where he builds a new criminal empire with a group of
                        unlikely characters.</p>
                    <p class="movie-cast">Director: Francis Ford Coppola</p>
                    <p class="movie-cast">Stars: Marlon Brando, Al Pacino</p>
                </div>
            </div>
            
            <div class="movie-watchlist">
                <button class="add-to-watchlist">
                <span class="fa-stack fa-2x">
                        <i id="bookmark" class="fa-solid fa-bookmark fa-stack-2x"></i>
                        <i id="plus" class="fa-solid fa-plus fa-stack-1x"></i>
                    </span>
                </button>
            </div>
        </div>
        
    </div>
    <div class="movie-container">
        <div class="movie-info">
            <div class="movie-details">
                <div class="movie-thumbnail">
                    <img src="../../images/vikings.jpg" alt="Movie Name">
                </div>
                <div class="movie-text">
                    <h4 class="popular-movie-title"><span>2. </span>Vikings</h4>
                    <p class="movie-meta">93 min | Drama</p>
                    <div class="popular-movie-rating">
                        <p class="movie-score"><i class="fa-solid fa-star"></i> 8.5</p>
                        <button class="rate-button">Rate this</button>
                    </div>
                    <p class="movie-description">Following his release from prison, Mafia capo Dwight "The General"
                        Manfredi is exiled to Tulsa, Oklahoma, where he builds a new criminal empire with a group of
                        unlikely characters.</p>
                    <p class="movie-cast">Director: Francis Ford Coppola</p>
                    <p class="movie-cast">Stars: Marlon Brando, Al Pacino</p>
                </div>
            </div>

</div>

</section>


`

export function renderPopular(ctx) {
    const register = popularMoviesTemplate(ctx);
    ctx.render(register);
};