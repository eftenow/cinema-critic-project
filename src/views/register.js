import { html } from '../../node_modules/lit-html/lit-html.js';
import { registerUser } from '../services/authServices.js';


const registerTemplate = (ctx) => html`
<section class="register-section">
<h2 class="register-title">Register</h2>
    <form class="register-form" @submit="${(ev) => onRegisterHandler(ev, ctx)}">
      <label for="username" class="register-label">Username:</label>
      <input type="text" id="username" name="username" class="register-input" required><br><br>

      <label for="email" class="register-label">Email:</label>
      <input type="email" id="email" name="email" class="register-input" required><br><br>
      
      <label for="password" class="register-label">Password:</label>
      <input type="password" id="password" name="password" class="register-input" required><br><br>

      <label for="rePassword" class="register-label">Repeat password:</label>
      <input type="password" id="rePassword" name="rePassword" class="register-input" required><br><br>
      
      <input type="submit" value="Create account" class="register-button">
      <p class="register-register-text">Already have an account? <a href="/login" class="register-login-link">Login here</a></p>
    </form>
</section>
`

export function renderRegister(ctx) {
    const register = registerTemplate(ctx);
    ctx.render(register);
};

async function onRegisterHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);

    let username = form.get('username');
    let email = form.get('email');
    let password = form.get('password');
    let rePassword = form.get('rePassword');

    if (password !== rePassword) {
        alert('Passwords do not match!');
        throw new Error();
    } else if (!email || !password || !rePassword) {
        alert('All fields must be filled!')
        throw new Error();
    }
    await registerUser(password, username, email);

    ctx.redirect('/');
}