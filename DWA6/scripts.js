

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

function createPreviewButton({ author, id, image, title }) {
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

let page = 1;
let matches = books;

function appendBooksToPage(books) {
  const fragment = document.createDocumentFragment();

  for (const book of books) {
    const element = createPreviewButton(book);
    fragment.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(fragment);
}

function updateShowMoreButton() {
  const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
  const showMoreButton = document.querySelector('[data-list-button]');
  showMoreButton.disabled = remainingBooks <= 0;
  showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
  `;
}

// Initial setup
const starting = document.createDocumentFragment();
const initialBooks = matches.slice(0, BOOKS_PER_PAGE);
appendBooksToPage(initialBooks);

document.querySelector('[data-list-items]').appendChild(starting);
updateShowMoreButton();

// Add event listener to "Show more" button
document.querySelector('[data-list-button]').addEventListener('click', () => {
  page++;
  const nextPageBooks = matches.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);
  appendBooksToPage(nextPageBooks);
  updateShowMoreButton();
});

function createSearchOptionElement([id, name]) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;

  return element;
}

const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

for (const search of Object.entries(genres)) {
  const element = createSearchOptionElement(search);
  genreHtml.appendChild(element);
}

document.querySelector('[data-search-genres]').appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.innerText = 'All Authors';
authorsHtml.appendChild(firstAuthorElement);

for (const search of Object.entries(authors)) {
  const element = createSearchOptionElement(search);
  authorsHtml.appendChild(element);
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector('[data-settings-theme]').value = 'night';
  document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
  document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
  document.querySelector('[data-settings-theme]').value = 'day';
  document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

document.querySelector('[data-list-close]').addEventListener('click', () => {
  document.querySelector('[data-list-active]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = true;
});

document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
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
  
  document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
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
    document.querySelector('[data-list-message]').classList.add('list__message_show');
  } else {
    document.querySelector('[data-list-message]').classList.remove('list__message_show');
  }

  document.querySelector('[data-list-items]').innerHTML = '';
  const newItems = document.createDocumentFragment();

  const newBooks = matches.slice(0, BOOKS_PER_PAGE);
  appendBooksToPage(newBooks);
  updateShowMoreButton();

  document.querySelector('[data-list-items]').appendChild(newItems);
  document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

  document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-list-items]').addEventListener('click', (event) => {
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
    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = active.image;
    document.querySelector('[data-list-image]').src = active.image;
    document.querySelector('[data-list-title]').innerText = active.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = active.description;
  }
});
