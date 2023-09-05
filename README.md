<hr>

<h1><a href="https://cinema-critics.web.app/">Cinema Critic</a></h1>

<p><strong>Cinema Critic</strong> is my first personal project. This Single-page application boasts a front-end constructed exclusively with Vanilla JS, HTML, and CSS. Originally, the back-end was based on a service solution from <a href='https://www.back4app.com' target='_blank' rel='noopener noreferrer'>back4app</a>, which utilizes MongoDB as its database. I have since transitioned the back-end to Python/Django with PostgreSQL as the database. You can find the backend repository <a href='https://github.com/eftenow/cinema-critic-server' target='_blank' rel='noopener noreferrer'>here</a>.</p>

<h2>Description</h2>

<p>Cinema Critic offers you detailed information about any movie or series you are interested in. Explore the cast and crew, discover the runtime, read captivating descriptions, and more. Above all, don't forget to create an account and share your thoughts and opinions by leaving reviews for your favorite movies and series. Rate the films, write detailed critiques, and engage in discussions with fellow movie enthusiasts.</p>

<p>Visit Cinema Critic <a href="https://cinema-critics.web.app/"><font color="#8e47f8">here</font></a> and be sure to register and leave a review for your favorite movie or series.</p>

<hr>

<h2><font color="#8e47f8">Main Features</font></h2>

<ul>
<li>
<p>User authentication system with dynamic username/email/password validation during registration and relevant error messages.</p>
<img src='images/project_screenshots/register-invalid.png' width='1080'>&nbsp;&nbsp;&nbsp;   
<img src='images/project_screenshots/register-valid.png' width='1080'>&nbsp;&nbsp;&nbsp;
</li>

<li>
<p>Fully customizable profile page for a personalized user experience.</p>
<img src='images/project_screenshots/logged-in.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/profile.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/edit-profile.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/edited-profile.png' width='1080'>&nbsp;&nbsp;&nbsp;
</li>

<li>
<p>Efficient filtration system that allows easy discovery of movies or series based on user preferences.</p>
<img src='images/project_screenshots/catalogue.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/catalogue-filters.png' width='1080'>&nbsp;&nbsp;&nbsp;
</li>

<li>
<p>Movie details page, including all the information about certain movie/series, its trailer and all the reviews given by users.</p>
<img src='images/project_screenshots/movie-details.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/movie-review.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/movie-review-submitted.png' width='1080'>&nbsp;&nbsp;&nbsp;
<p>After new review was submitted, the movie rating dynamically changed from 7.33 to 8.00</p>
<img src='images/project_screenshots/movie-rating-change.png' width='1080'>
</li>

<li>
    <p>Search bar with movie/series suggestions that appear as you type more than one letter.</p>
    <img src='images/project_screenshots/searchbar.png' width='1080'>
</li>

<li>
    <p>Popular page, ranking the most visited movies/series.</p>
    <img src='images/project_screenshots/popular-movies.png' width='1080'>
</li>


<li>
    <p>'Add to watchlist' button for bookmarking selected movies/series, adding them to the user's "Watchlist," which can be accessed from the user page.</p>
    <p>Non-bookmarked movie button looks like this</p>
    <img src='images/project_screenshots/non-bookmarked.png' width='1080'>
    <p>After we bookmark it, it looks like this</p>
    <img src='images/project_screenshots/bookmarked.png' width='1080'>
    <p>Each user can access his watchlist in his profile, it looks like this</p>
    <img src='images/project_screenshots/profile-watchlist.png' width='1080'>
</li>


<li>
    <p>'Add review' functionality that enables users to review movies/series, providing a score from 1 to 10 and an optional comment, which we saw earlier. Each user can find their reviews in the "My Reviews" section on the user page, similarly to user's Watchlist.</p>
    <img src='images/project_screenshots/profile-watchlist.png' width='1080'>
</li>
<li>
<p>Ranking system where each movie/series has its own score, based on the arithmetic mean of all user reviews. The scoring system is dynamic, instantly updating the movie/series rating upon creating, editing, or deleting a review.</p>
<img src='images/project_screenshots/review-rating-select.png' width='1080'>&nbsp;&nbsp;&nbsp;
<img src='images/project_screenshots/review-creation.png' width='1080'>
</li>

<li>
    <p>Pop-up notifications for successful creation, editing, or deletion of a review.</p>
    <img src='images/project_screenshots/review-creation-notification.png' width='1080'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/review-delete.png' width='1080'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/review-delete-notification.png' width='1080'>
</li>

<li>
    <p>Custom admin panel/monitoring system for efficient management and Administrator/Moderator roles, with additional permissions.</p>
    <p>Administrators and Moderators are allowed to Create Movies and Series</p>
    <p>Now lets hop in the administrator account and check some of the perks to it.</p>
    <img src='images/project_screenshots/admin-create.png' width='1080'>
    <p>Movie creation form</p>
    <img src='images/project_screenshots/admin-movie-creation.png' width='1080'>
    <p>Newly created movie, which was just created. As you can see there are edit/delte buttons beneath it, they are only visible to Moderators and Administrators. </p>
    <img src='images/project_screenshots/newly-created-movie.png' width='1080'>
    <p>Administrators are able to edit another users' data, there are 2 ways to do that, one is by accessing their profile, and the other is by doing it via the admin pannel, which we are going to check later.</p>
    <img src='images/project_screenshots/admin-edit-user-btn.png' width='1080'>
    <p>For the sake of the showcase, we are going to edit the first and the last name of a user.</p>
    <img src='images/project_screenshots/admin-rename-user.png' width='1080'>
    <p>Here's the same user with updated first name and last name.</p>
    <img src='images/project_screenshots/renamed-user.png' width='1080'>
    <p>Now lets look at the admin pannel.</p>
    <img src='images/project_screenshots/admin-menu-admin-pannel.png' width='1080'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/admin-pannel.png' width='1080'>
</li>

<li>
    <p>Fully responsive design for a seamless user experience across all devices.</p>
    <img src='images/project_screenshots/cc-responsiveness.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/cc-responsiveness2.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/cc-responsiveness3.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/cc-responsiveness4.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/admin-pannel-responsiveness.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
    <img src='images/project_screenshots/admin-pannel-responsiveness2.png' width='520' height='680'>&nbsp;&nbsp;&nbsp;
</li>
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





