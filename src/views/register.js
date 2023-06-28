import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllEmails, getAllUsernames, registerUser, getUser } from '../services/authServices.js';


const registerTemplate = (ctx, usernames, emails) => html`
<section class="register-section">
<h2 class="register-title">Register</h2>
    <form class="register-form" @submit="${(ev) => onRegisterHandler(ev, ctx)}">
      <label for="username" class="register-label">Username:</label>
      <span class="form-input-field">
      <input @input=${(e) => usernameInputHandler(e, usernames)} type="text" id="username" name="username" class="register-input">
      <span class="icon-container">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <i class="fa-solid fa-circle-check"></i>
        </span>
      </span>
      <p class='incorrect-username-msg'></p>

      <label for="email" class="register-label">Email:</label>  
      <span class="form-input-field">
      <input @input=${(e) => emailInputHandler(e, emails)} type="email" id="email" name="email" class="register-input">
      <span class="icon-container">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <i class="fa-solid fa-circle-check"></i>
        </span>
      </span>
      <p class='incorrect-email-msg'></p>

      <label for="password" class="register-label">Password:</label>   
      <span class="form-input-field">
      <input @input=${passwordInputHandler} type="password" id="password" name="password" class="register-input">
      <span class="icon-container">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <i class="fa-solid fa-circle-check"></i>
        </span>
      </span>
      <p class='incorrect-password-msg'></p>

      <label for="rePassword" class="register-label">Repeat password:</label>
      <span class="form-input-field">
      <input @input=${passwordsMatchHandler} type="password" id="rePassword" name="rePassword" class="register-input">
      <span class="icon-container">
    <i class="fa-solid fa-triangle-exclamation"></i>
    <i class="fa-solid fa-circle-check"></i>
        </span>
      </span>

      <p class='incorrect-repeat-msg'></p>

      <button  type="submit" class="register-button" disabled>Create account</button>
      <p class="register-register-text">Already have an account?<br><a href="/login" class="register-login-link">Login here</a></p>
    </form>
</section>
`

export async function renderRegister(ctx) {
    const userAlreadyLogged = getUser();
    if (userAlreadyLogged) {
        ctx.redirect('/myProfile');
    } else {
        try {
            const [usernames, emails] = await Promise.all([getAllUsernames(), getAllEmails()]);

            const registerPage = registerTemplate(ctx, usernames, emails);
            ctx.render(registerPage);
        } catch (error) {

            console.error(error);
        }
    }
}


async function onRegisterHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let username = form.get('username');
    let emailAddress = form.get('email');
    let password = form.get('password');

    await registerUser(password, username, emailAddress);
    ctx.redirect('/');
}

async function usernameInputHandler(ev, existingUsernames) {
    const inputField = ev.target;
    const usename = ev.target.value;
    const errorField = document.querySelector('.incorrect-username-msg'); //paragraph
    const takenUsername = existingUsernames.includes(usename);

    if (usename.length < 3 || usename.length > 12) {
        errorField.textContent = 'Username must be between 3 and 12 characters long.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else if (takenUsername) {
        errorField.textContent = 'This username is already taken.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else {
        errorField.textContent = ''
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');
    }
    enableRegisterButton();
};

async function emailInputHandler(ev, existingEmails) {
    const inputField = ev.target;
    const email = inputField.value;
    const errorField = document.querySelector('.incorrect-email-msg');
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const takenEmail = existingEmails.includes(email);

    if (!email) {
        errorField.textContent = 'Email is required.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else if (!emailRegex.test(email)) {
        errorField.textContent = 'Invalid email format.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else if (takenEmail) {
        errorField.textContent = 'This email is already taken.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else {
        errorField.textContent = ''
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');
    }
    enableRegisterButton();
}

function passwordInputHandler(ev) {
    const inputField = ev.target;
    const password = ev.target.value;
    const errorField = document.querySelector('.incorrect-password-msg');
    passwordsMatchHandler();

    if (password.length < 4) {
        errorField.textContent = 'Password must atleast 4 characters long.'
        inputField.classList.add('invalid');
        inputField.classList.remove('valid');
    } else {
        errorField.textContent = ''
        inputField.classList.remove('invalid');
        inputField.classList.add('valid');
    }
    enableRegisterButton();

};

function passwordsMatchHandler() {
    const password = document.getElementById('password');
    const rePassword = document.getElementById('rePassword');
    const errorField = document.querySelector('.incorrect-repeat-msg');

    if (password.value !== rePassword.value) {
        errorField.textContent = 'Passwords do not match.'
        rePassword.classList.add('invalid');
        rePassword.classList.remove('valid');
    } else if (!rePassword) {
        errorField.textContent = 'Repeat password is required.'
        rePassword.classList.add('invalid');
        rePassword.classList.remove('valid');
    } else {
        errorField.textContent = ''
        rePassword.classList.remove('invalid');
        rePassword.classList.add('valid');
    }
    enableRegisterButton();
};

function enableRegisterButton() {
    const registerButton = document.querySelector('.register-button');
    const inputs = document.querySelectorAll('.register-input');

    const hasInvalidInput = Array.from(inputs).some(input => !input.classList.contains('valid'));
    registerButton.disabled = hasInvalidInput;
};