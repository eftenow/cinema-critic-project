import { html } from '../../node_modules/lit-html/lit-html.js';


const homeTempalte = () => html`
<div class="home-page">
    <div class='home-page-background'>
        <img src='../../images/marvel-endgame.jpg' class='home-page-background-img'>
    </div>
    <section class="about-section">
        <h1>Cinema Critic</h1>
        <h3>The ultimate platform for movie and TV show enthusiasts to share their
            thoughts and opinions! </h3>

        <article>Join our community of film and TV lovers and share your thoughts on the latest
            blockbusters, hidden
            gems, and classic favorites. Start exploring Cinema Critic today and let your voice be heard!
            
        </article>
        <a href="/dashboard" class="button start-btn">Get Started</a>
    </section>


</div>`

export function renderHome(ctx) {
    const home = homeTempalte();
    ctx.render(home);
}