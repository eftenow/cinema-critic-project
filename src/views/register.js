import { html } from '../../node_modules/lit-html/lit-html.js';
import { registerUser, usernameIsTaken } from '../services/authServices.js';


const registerTemplate = (ctx) => html`
<section class="register-section">
<h2 class="register-title">Register</h2>
    <form class="register-form" @submit="${(ev) => onRegisterHandler(ev, ctx)}">
      <label for="username" class="register-label">Username:</label>
      <input @input=${usernameInputHandler} type="text" id="username" name="username" class="register-input">
      <p class='incorrect-username-msg'></p>

      <label for="email" class="register-label">Email:</label>
      <input @input=${emailInputHandler} type="email" id="email" name="email" class="register-input">
      <p class='incorrect-email-msg'></p>

      <label for="password" class="register-label">Password:</label>
      <input type="password" id="password" name="password" class="register-input">

      <label for="rePassword" class="register-label">Repeat password:</label>
      <input type="password" id="rePassword" name="rePassword" class="register-input">
      
      <button type="submit" class="register-button" disabled>Create account</button>
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

async function usernameInputHandler(ev) {
    const inputField = ev.target;
    const usename = ev.target.value;
    const errorField = document.querySelector('.incorrect-username-msg'); //paragraph
    const usernameIsTaken = await usernameIsTaken(usename);

    if (usename.length < 3 || usename.length > 12) {
        errorField.textContent = 'Username must be between 3 and 12 characters long.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else if (usernameIsTaken) {
        errorField.textContent = 'This username is already taken.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else {
        errorField.textContent = ''
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');
    }
};

async function emailInputHandler(ev) {
    const inputField = ev.target;
    const email = inputField.value;
    const errorField = document.querySelector('.incorrect-email-msg'); 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailIsTaken = await usernameIsTaken(email);
    
    console.log(email);
    if (!email) {
        errorField.textContent = 'Email is required.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
      } else if (!emailRegex.test(email)) {
        errorField.textContent = 'Invalid email format.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
      } else if (emailIsTaken) {
        errorField.textContent = 'This email is already taken.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else{
        errorField.textContent = ''
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');
      }
}

