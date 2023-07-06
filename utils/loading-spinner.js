export function showSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.style.display = 'flex';
  spinner.classList.remove("loader--hidden");
}

export function hideSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.classList.add("loader--hidden");
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 400);
}
