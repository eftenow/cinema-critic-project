export function backToTopHandler() {
  window.scrollTo({top: 0});
};

window.addEventListener("scroll", (ev) => {
  const topBtn = document.querySelector('#back-to-top-btn');
  console.log('asd');
  if (ev.target.documentElement.scrollTop > 300) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});
