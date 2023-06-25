export function showSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.style.display = 'flex';
  spinner.classList.remove("loader--hidden");
  console.log('show spinner');
}

export function hideSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.classList.add("loader--hidden");
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 400);
  console.log('hide spinner');
}
