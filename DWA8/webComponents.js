import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

class BookPreview extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      const { author, id, image, title } = this.book;
  
      this.classList.add('preview');
      this.setAttribute('data-preview', id);
  
      this.innerHTML = `
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;
    }
  
    set book(value) {
      this._book = value;
    }
  
    get book() {
      return this._book;
    }
  }
  
  customElements.define('book-preview', BookPreview);

  
  function appendBooksToPage(books) {
    const fragment = document.createDocumentFragment();
  
    for (const book of books) {
      const element = document.createElement('book-preview');
      element.book = book;
      fragment.appendChild(element);
    }
  
    document.querySelector('[data-list-items]').appendChild(fragment);
  }
  
  const selectors = {
    listItems: document.querySelector('[data-list-items]'),
    searchGenres: document.querySelector('[data-search-genres]'),
    searchAuthors: document.querySelector('[data-search-authors]'),
    settingsTheme: document.querySelector('[data-settings-theme]'),
    settingsOverlay: document.querySelector('[data-settings-overlay]'),
    listButton: document.querySelector('[data-list-button]'),
    searchCancel: document.querySelector('[data-search-cancel]'),
    settingsCancel: document.querySelector('[data-settings-cancel]'),
    headerSearch: document.querySelector('[data-header-search]'),
    searchOverlay: document.querySelector('[data-search-overlay]'),
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
    listDescription: document.querySelector('[data-list-description]')
  };