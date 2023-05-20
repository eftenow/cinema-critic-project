export function toggleMenu() {
    const subUserMenu = document.getElementById('subMenu');
    const subNavMenu = document.getElementById('subMenuOptions');
    subUserMenu.classList.toggle('open-menu');
    subNavMenu.classList.remove('open-menu');
}

export function toggleNavMenu() {
    const subUserMenu = document.getElementById('subMenu');
    const subNavMenu = document.getElementById('subMenuOptions');
    subNavMenu.classList.toggle('open-menu');
    subUserMenu.classList.remove('open-menu');
}


export const showHideOptions = () => {
    const select = document.querySelector(".select");
    const options_list = document.querySelector(".options-list");
    options_list.classList.toggle("active");
    select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
};

export const selectOption = (event) => {
    const option = event.target;
    const ratingValue = option.textContent.trim();
  
    const ratingInput = document.querySelector('#review-rating-input');
    ratingInput.value = ratingValue;
  
    const select = document.querySelector('.select');
    select.querySelector('span').innerHTML = option.innerHTML;
  
    const ratingOptions = document.querySelectorAll('.options-list .option');
    [...ratingOptions].map(option => option.classList.remove('selected'));  
    option.classList.add('selected');
  
    const optionsList = document.querySelector('.options-list');
    optionsList.classList.toggle('active');
  
    const angleIcon = select.querySelector('.fa-angle-down');
    angleIcon.classList.toggle('fa-angle-up');
  };