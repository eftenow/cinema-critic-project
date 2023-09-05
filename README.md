<hr>

<h1><font color="#8e47f8"><a href="https://cinema-critics.web.app/">Cinema Critic</a></font></h1>

<p><strong>Cinema Critic</strong> is my first personal project. This Single-page application boasts a front-end constructed exclusively with Vanilla JS, HTML, and CSS. Originally, the back-end was based on a service solution from <a href='https://www.back4app.com' target='_blank' rel='noopener noreferrer'>back4app</a>, which utilizes MongoDB as its database. I have since transitioned the back-end to Python/Django with PostgreSQL as the database. You can find the backend repository <a href='https://github.com/eftenow/cinema-critic-server' target='_blank' rel='noopener noreferrer'>here</a>.</p></p>

<h2><font color="#8e47f8">Description</font></h2>

<p>Cinema Critic offers you detailed information about any movie or series you are interested in. Explore the cast and crew, discover the runtime, read captivating descriptions, and more. Above all, don't forget to create an account and share your thoughts and opinions by leaving reviews for your favorite movies and series. Rate the films, write detailed critiques, and engage in discussions with fellow movie enthusiasts.</p>

<p>Visit Cinema Critic <a href="https://cinema-critics.web.app/"><font color="#8e47f8">here</font></a> and be sure to register and leave a review for your favorite movie or series.</p>

<hr>

<h2><font color="#8e47f8">Main Features</font></h2>

<ul>
    <li>User authentication system with dynamic username/email/password validation during registration and relevant error messages.</li>
    <li>Fully customizable profile page for a personalized user experience.</li>
    <li>Efficient filtration system that allows easy discovery of movies or series based on user preferences.</li>
    <li>Search bar with movie/series suggestions that appear as you type more than one letter.</li>
    <li>Popular page showcasing the most visited movies/series.</li>
    <li>'Add to watchlist' button for bookmarking selected movies/series, adding them to the user's "Watchlist," which can be accessed from the user page.</li>
    <li>'Add review' functionality that enables users to review movies/series, providing a score from 1 to 10 and an optional comment. Each user can find their reviews in the "My Reviews" section on the user page.</li>
    <li>Ranking system where each movie/series has its own score, based on the arithmetic mean of all user reviews. The scoring system is dynamic, instantly updating the movie/series rating upon creating, editing, or deleting a review.</li>
    <li>Pop-up notifications for successful creation, editing, or deletion of a review.</li>
    <li>Custom admin panel/monitoring system for efficient management.</li>
    <li>Fully responsive design for a seamless user experience across devices.</li>
</ul>

<hr>

<h2>Technology Stack</h2>
<p>The main client application is built using Vanilla JS, utilizing limited external libraries for routing, templating, bundling. This approach allowed us to practice and apply core JavaScript concepts effectively.</p>
<ul>
    <li>
        <b>Templating engine</b>
        <p>I used lit-html as the templating engine due to its lightweight, simplicity, and speed. Having prior experience with the library made it a comfortable choice.</p>
    </li>
    <li>
        <b>Routing</b>
        <p>For client-side routing in the Single Page Application, I selected a simple and straightforward router that fulfilled the requirement.</p>
    </li>
    <li>
        <b>Bundler</b>
        <p>Webpack served as the primary bundler, although I utilized it at a basic level, employing "npx webpack" for the job.</p>
    </li>
    <li>
        <b>Deployment</b>
        <p>To deploy the client, I leveraged Firebase for its user-friendly interface and ease of use.</p>
    </li>
</ul>





