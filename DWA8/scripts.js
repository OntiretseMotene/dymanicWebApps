
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

const selector = {
    listItems: document.querySelector('[data-list-items]'),
    searchGenres: document.querySelector('[data-search-genres]'),
    searchAuthors: document.querySelector('[data-search-authors]'),
    settingsTheme: document.querySelector('[data-settings-theme]'),
    settingsOverlay: document.querySelector('[data-settings-overlay]'),
    listButton: document.querySelector('[data-list-button]'),
    searchCancel: document.querySelector('[data-search-cancel]'),
    settingsCancel: document.querySelector('[data-settings-cancel]'),
    headerSearch: document.querySelector('[data-header-search'),
    searchOverlay:document.querySelector('[data-search-overlay]'),
    headerSettings: document.querySelector('[data-header-settings]'),
    listClose: document.querySelector('[data-list-close]'),
    settingsForm: document.querySelector('[data-settings-form]'),
    searchForm: document.querySelector('[data-search-form]'),
    listMessage: document.querySelector('[data-list-message]'),
    listActive: document.querySelector('[data-list-active]'),
    listBlur: document.querySelector('[data-list-blur]'),
    listImage: document.querySelector('[data-list-image]'),
    listTitle: document.querySelector('[data-list-title]'),
    listSubTitle: document.querySelector('[data-list-subtitle]'),
    listDescription: document.querySelector('[data-list-description]'),
}

export function createPreview(book) {
   const { author, id, image, title } = book;
   const element = document.createElement('button');
   element.classList = 'preview';
   element.setAttribute('data-preview', id);

  element.innerHTML = `
    <img
      class="preview__image"
      src="${image}"
    />

    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  return element;
}


export function appendBooksToPage(books) {
  const fragment = document.createDocumentFragment();

  for (const book of books) {
    const element = createPreview(book);
    fragment.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(fragment);
}

export function updateShowMoreButton() {
  const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
  const showMoreButton = document.querySelector('[data-list-button]');
  showMoreButton.disabled = remainingBooks <= 0;
  showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
}

// Initialise starting list of book items
const starting = document.createDocumentFragment();
const initialBooks = matches.slice(0, BOOKS_PER_PAGE);
appendBooksToPage(initialBooks);

selector.listItems.appendChild(starting);
updateShowMoreButton();

// Add event listener to "Show more" button

function createSearchOptions(container, data, defaultOptionText) {
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement('option');
    defaultOption.value = 'any'
    defaultOption.innerText = defaultOptionText;
    fragment.appendChild(defaultOption);

    for (const [id, name] of Object.entries(data)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        fragment.appendChild(option);

    }
    
    container.appendChild(fragment)
}

function initialiseSearchOptions() {

    const genreContainer = selector.searchGenres;
    createSearchOptions(genreContainer, genres, 'All Genres');

    const authorContainer = selector.searchAuthors;
    createSearchOptions(authorContainer, authors, 'All Authors');
}

initialiseSearchOptions();

function setTheme(theme) {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        selector.settingsTheme.value = 'night';
        setTheme('night');
    } else {
        selector.settingsTheme.value = 'day';
        setTheme('day');
    }

selector.listButton.addEventListener('click', () => {
  page++;
  const nextPageBooks = matches.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);
  appendBooksToPage(nextPageBooks);
  updateShowMoreButton();
});

selector.listClose.addEventListener('click', () => {
  selector.listActive.open = false;
});

selector.settingsCancel.addEventListener('click', () => {
  selector.settingsOverlay.open = false;
});

selector.headerSearch.addEventListener('click', () => {
  selector.searchOverlay.open = true;
  selector.searchTitle.focus();
});

selector.headerSettings.addEventListener('click', () => {
  selector.settingsOverlay.open = true;
});

selector.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }
  
  selector.settingsOverlay.open = false;
});

selector.searchCancel.addEventListener('click', () => {
  selector.searchOverlay.open = false;
});

selector.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
      let genreMatch = filters.genre === 'any';

     for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) { genreMatch = true; }
     }

     if (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
      (filters.author === 'any' || book.author === filters.author) && 
      genreMatch
     ) {
      result.push(book);
    }
 } 
page = 1;
matches = result;

  if (result.length < 1) {
    selector.listMessage.classList.add('list__message_show');
  } else {
    selector.listMessage.classList.remove('list__message_show');
  }

  selector.listItems.innerHTML = '';
  const newItems = document.createDocumentFragment();

  const newBooks = matches.slice(0, BOOKS_PER_PAGE);
  appendBooksToPage(newBooks);
  updateShowMoreButton();

  selector.listItems.appendChild(newItems);
  selector.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

  selector.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  selector.searchOverlay.open = false;
});

selector.listItems.addEventListener('click', (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      } 

      active = result;
    }
  }

  if (active) {
        selector.listActive.open = true;
        selector.listBlur.src = active.image;
        selector.listImage.src = active.image;
        selector.listTitle.innerText = active.title;
        selector.listSubTitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        selector.listDescription.innerText = active.description;
    }
});
