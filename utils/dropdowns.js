import { showNotification } from "../src/services/reviewServices.js";

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


// event handler for selectBtnGenre
function selectBtnGenreHandler(e) {
    e.currentTarget.classList.toggle("open");
  }
  
  function itemGenreHandler(e) {
    const checkedGenre = document.querySelectorAll('.item-genre.checked');
    if (!e.target.classList.contains('checked') && checkedGenre.length >= 4) {
      showNotification(`You can select up to 4 genres.`, 'red')
      return;
    }
    e.target.classList.toggle('checked');
    e.target.classList.toggle('checked-genre');
    const newCheckedGenre = Array.from(document.querySelectorAll('.item-genre.checked'));
    const btnTextGenre = document.querySelector('.btn-text-genre');
    if (newCheckedGenre && newCheckedGenre.length > 0) {
      btnTextGenre.innerText = newCheckedGenre.map(item => item.innerText).join(', ');
    } else {
      btnTextGenre.innerText = 'Select Genre';
    }
  }
  
  export function handleGenreSelection() {
    const selectBtnGenre = document.querySelector(".select-btn-genre");
    const itemsGenre = document.querySelectorAll(".item-genre");
  
    selectBtnGenre.addEventListener("click", selectBtnGenreHandler);
    itemsGenre.forEach(itemGenre => {
      itemGenre.addEventListener("click", itemGenreHandler);
    });
  }
  
  export function removeGenreSelectionHandlers() {
    const selectBtnGenre = document.querySelector(".select-btn-genre");
    const itemsGenre = document.querySelectorAll(".item-genre");
  
    selectBtnGenre.removeEventListener("click", selectBtnGenreHandler);
    itemsGenre.forEach(itemGenre => {
      itemGenre.removeEventListener("click", itemGenreHandler);
    });
  }