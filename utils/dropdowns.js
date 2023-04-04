export function toggleMenu() {
    let subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
}


export const showHideOptions = () => {
    const select = document.querySelector(".select");
    const options_list = document.querySelector(".options-list");
    options_list.classList.toggle("active");
    select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
};



export const selectOption = (ev) => {
    const select = document.querySelector(".select");
    const options_list = document.querySelector(".options-list");
    const option = ev.target;
    select.querySelector("span").innerHTML = option.innerHTML;
    option.classList.add("selected");
    options_list.classList.toggle("active");
    select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
    option.classList.remove("selected");
};

