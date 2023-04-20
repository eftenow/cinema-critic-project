import { html } from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../services/authServices.js';


const loginTemplate = (ctx) => html`
<section class="login-section">
    <h2 class="login-title">Login</h2>
    <form class="login-form" @submit="${(ev) => onLoginHandler(ev, ctx)}">
        
        <label for="username" class="login-label">Username:</label>
        <input type="text" id="login-username" name="username" class="login-input"><br><br>
      
        <label for="password" class="login-label">Password:</label>
        <input type="password" id="password" name="password" class="login-input"><br><br>
      
        <input type="submit" value="Login" class="login-button">
        <p id="login-error" class="login-error"></p>
        <p class="login-register-text">Don't have an account? <a href="/register" class="login-register-link">Register here</a></p>
    </form>
</section>
`;

export function renderLogin(ctx) {
    const login = loginTemplate(ctx);
    ctx.render(login);
};

async function onLoginHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let username = form.get('username');
    let password = form.get('password');
    let loginError = ev.target.querySelector('.login-error');
    checkFulfilledFields(loginError);

    try {
        await loginUser(username, password);
        ctx.redirect('/');
    } catch (error) {
        loginError.textContent = 'Invalid username or password.';
    };
};


function checkFulfilledFields(loginError) {
    const username = document.querySelector('#login-username');
    const password = document.querySelector('#password');

    if (!username.value) {
        username.classList.add('invalid');
        username.addEventListener('focus', () => username.classList.remove('invalid'));
    } else {
        username.classList.remove('invalid');
    };

    if (!password.value) {
        password.classList.add('invalid');
        password.addEventListener('focus', () => password.classList.remove('invalid'));
    } else {
        password.classList.remove('invalid');
    };

    if (!username || !password) {
        loginError.textContent = 'Please enter both a username and password.';
        return;
    };

}