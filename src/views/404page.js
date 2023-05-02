import { html } from '../../node_modules/lit-html/lit-html.js';

const page404Template = () => html`
 <div class='wrapper-404'>
 <section class="not-found">
        <div class='not-found-content'>
        <h2>404</h2>
        <h4>Opps! Page not found!</h4>
        <p>The page you are looking for could not be found.</p>
        <a href="/">Back to home</a>
        </div>
      </section>
 </div>
`;


export function pageNotFound(ctx) {
    const page404 = page404Template();

    ctx.render(page404);
};
