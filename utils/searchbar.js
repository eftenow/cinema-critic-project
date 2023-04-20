import { getSearchMatches, getSearchedMovies} from '../src/services/itemServices.js';
import { moviesTemplate } from '../src/views/movies.js';

export async function searchHandler(ev, ctx) {
    ev.preventDefault();
    const searchForm = new FormData(ev.target);
    const searchText = searchForm.get('search-text');
    console.log(searchText);
    ctx.redirect(`/dashboard/search?match=${encodeURIComponent(searchText)}`);
    ev.target.reset();
};

export async function searchedMoviesPage(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchText = searchParams.get('match');
    console.log(searchText);
    const result = await getSearchedMovies(searchText);

    const moviesFound = moviesTemplate(result);

    ctx.render(moviesFound);
    // const teamsThatMeetCriteria = await getSpecificTeam(searchText);
    // showTeams(teamsThatMeetCriteria, ctx);
};




//SEARCH BAR SUGGESTIONS LOGIC///
export async function searchSuggestionsHandler(e) {
    const searchText = e.target.value;
    const autocomBox = e.target.nextElementSibling;
  
    if (searchText.length > 1) {
      const results = await getSearchMatches(searchText);
      const suggestionsHTML = results
        .map(
          (item) => `
        <a href="/${item.type}/${item.objectId}" class="suggestion">
          <div id="s-image"><img src="${item.image}" alt="${item.name}" /></div>
          <span id="s-name">${item.name}</span>
        </a>`
        )
        .join('');
      autocomBox.innerHTML = suggestionsHTML ? suggestionsHTML : `<span id="no-matches-text-span">${searchText}</span>`;
      autocomBox.style.display = 'block';
    } else {
      autocomBox.style.display = 'none';
    }
  };


  export function suggestionClickHandler(ev) {
    const movieTitle = ev.target.textContent;
    const autoCompleteBox = ev.target.closest('.autocom-box');
    const searchField = document.querySelector('input[name=search-text]');
    searchField.value = movieTitle;
    autoCompleteBox.style.display = 'none';

  }


// const searchWrapper = document.querySelector(".search-input");
// const inputBox = searchWrapper.querySelector("input[name='search-text']");
// const suggBox = searchWrapper.querySelector(".autocom-box");
// const icon = searchWrapper.querySelector(".icon");
// let linkTag = searchWrapper.querySelector("a");


// // if user press any key and release
// inputBox.onkeyup = (e)=>{
//     let userData = e.target.value; //user enetered data
//     let emptyArray = [];
//     if(userData){
//         icon.onclick = ()=>{
//             webLink = `https://www.google.com/search?q=${userData}`;
//             linkTag.setAttribute("href", webLink);
//             linkTag.click();
//         }
//         emptyArray = suggestions.filter((data)=>{
//             //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
//             return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
//         });
//         emptyArray = emptyArray.map((data)=>{
//             // passing return data inside li tag
//             return data = `<li>${data}</li>`;
//         });
//         searchWrapper.classList.add("active"); //show autocomplete box
//         showSuggestions(emptyArray);
//         let allList = suggBox.querySelectorAll("li");
//         for (let i = 0; i < allList.length; i++) {
//             //adding onclick attribute in all li tag
//             allList[i].setAttribute("onclick", "select(this)");
//         }
//     }else{
//         searchWrapper.classList.remove("active"); //hide autocomplete box
//     }
// }
// function select(element){
//     let selectData = element.textContent;
//     inputBox.value = selectData;
//     icon.onclick = ()=>{
//         webLink = `https://www.google.com/search?q=${selectData}`;
//         linkTag.setAttribute("href", webLink);
//         linkTag.click();
//     }
//     searchWrapper.classList.remove("active");
// }
// function showSuggestions(list){
//     let listData;
//     if(!list.length){
//         userValue = inputBox.value;
//         listData = `<li>${userValue}</li>`;
//     }else{
//       listData = list.join('');
//     }
//     suggBox.innerHTML = listData;
// }


