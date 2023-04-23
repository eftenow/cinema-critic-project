export function backToTopHandler() {
  window.scrollTo({top: 0});
};

window.addEventListener("scroll", () => {
  const topBtn = document.querySelector('#back-to-top-btn');
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;

  const thirtyPercentHeight = scrollHeight * 0.3;

  if (scrollTop > thirtyPercentHeight) { 
    topBtn.classList.add('show');
    topBtn.addEventListener('click', backToTopHandler);
  } else {
    topBtn.classList.remove('show');
  }
});

export function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
};

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}