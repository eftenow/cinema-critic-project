import page from '../../node_modules/page/page.mjs';

let redirectTimeout;

export function showSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.style.display = 'flex';
  spinner.classList.remove("loader--hidden");

  redirectTimeout = setTimeout(() => {
    page.redirect('/404');
  }, 4000); 
}

export function hideSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.classList.add("loader--hidden");

  clearTimeout(redirectTimeout);

  setTimeout(() => {
    spinner.style.display = 'none';
  }, 400);
}
