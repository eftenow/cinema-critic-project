import { getSearchMatches} from '../src/services/itemServices.js';
import { moviesTemplate } from '../src/views/movies.js';
import { truncateTextByChars, truncateTextByWords } from './stringModifiers.js';

export async function searchHandler(ev, ctx) {
    ev.preventDefault();
    const searchForm = new FormData(ev.target);
    const searchText = searchForm.get('search-text');
    if (searchText) {
      ctx.redirect(`/dashboard/search?match=${encodeURIComponent(searchText)}`);
      ev.target.reset();
    }
};

export async function searchedMoviesPage(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const searchText = searchParams.get('match');
    console.log(searchText);
    const result = await getSearchMatches(searchText);
    console.log(result);
    const moviesFound = moviesTemplate(result, ctx);
    
    ctx.render(moviesFound);
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
        <a href="/${item.type}/${item.id}" class="suggestion">
          <div id="s-image"><img src="${item.image}" alt="${item.name}" /></div>
          <span id="s-name">${truncateTextByChars(item.name, 24)}</span>
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

  };
