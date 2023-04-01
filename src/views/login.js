import { html } from '../../node_modules/lit-html/lit-html.js';
import { loginUser } from '../services/authServices.js';


const loginTemplate = (ctx) => html`
<section class="login-section">
<h2 class="login-title">Login</h2>
    <form class="login-form" @submit="${(ev) => onLoginHandler(ev, ctx)}">
      <label for="username" class="login-label">Username:</label>
      <input type="text" id="username" name="username" class="login-input" required><br><br>
      
      <label for="password" class="login-label">Password:</label>
      <input type="password" id="password" name="password" class="login-input" required><br><br>
      
      <input type="submit" value="Login" class="login-button">
      <p class="login-register-text">Don't have an account? <a href="/register" class="login-register-link">Register here</a></p>
    </form>
</section>
`

export function renderLogin(ctx) {
    const login = loginTemplate(ctx);
    ctx.render(login);
};

async function onLoginHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let username = form.get('username');
    let password = form.get('password');
    
    if (!username || !password) {
        alert('All fields must be filled!')
        throw new Error();
    }
    
    await loginUser(username, password);
    ctx.redirect('/');
}