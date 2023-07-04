//import data from data.js

import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

//track current page and matching books
let page = 1;
let matches = books;

const selectors = {
     listItems : document.querySelector('[data-list-items]'),
     searchGenres : document.querySelector('[data-search-genres]'),
     searchAuthors : document.querySelector('[data-search-authors]'),
     settingsTheme : document.querySelector('[data-settings-theme]'),
     listButton : document.querySelector('[data-list-button]'),
     searchCancel : document.querySelector('[data-search-cancel]'),
     searchOverlay : document.querySelector('[data-search-overlay]'),
     headerSearch : document.querySelector('[data-header-search]'),
     headerSettings : document.querySelector('[data-header-settings]'),
     searchTitle : document.querySelector('[data-search-title]'),
     settingsOverlay : document.querySelector('[data-settings-overlay]'),
     listClose : document.querySelector('[data-list-close]'),
     listActive : document.querySelector('[data-list-active]'),
     searchForm : document.querySelector('[data-search-form]'),
     settingsForm : document.querySelector('[data-settings-form]'),
     settingsCancel: document.querySelector('[data-settings-cancel]'),
     listMessage : document.querySelector('[data-list-message]'),
     listDescription : document.querySelector('[data-list-description]'),
     listBlur : document.querySelector('[data-list-blur]'),
     listImage : document.querySelector('[data-list-image]'),
     listSubtitle : document.querySelector('[data-list-subtitle]'),
     listTitle : document.querySelector('[data-list-title]'),
     save : document.querySelector('[form="settings"]'),
 }

 /**
  * This function creates a book preview element
  * Extract necessary data from the book object
  * creates a button element for the preview 
  * set inner HTML of the button with book data
  * @param {object} - book 
  * @returns {element} 
 */
 function createBookPreview(book) {
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
     `

     return element;

 }

 /**
  * create the initial book previews
  * append the previews to a list 
  */
 const starting = document.createDocumentFragment();

 for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
     const previewElement = createBookPreview(book);
     starting.appendChild(previewElement)
 }

// selectors.listItems.appendChild(starting)

// /**
//  * Function to create an option element for a dropdown
//  * @param {string} value - The value of the option
//  * @param {string} text - The text content of the option
//  * @returns {Element} - The created option element
//  */

// function createOptionElement(value, text) {
//     const element = document.createElement('option');
//     element.value = value;
//     element.innerText = text;
//     return element;

// }

// // Create option elements for genres and authors dropdown menus

// const genreHtml = document.createDocumentFragment();
// const authorsHtml = document.createDocumentFragment();

// genreHtml.appendChild(createOptionElement('any', 'All Genres'));
// authorsHtml.appendChild(createOptionElement('any', 'All Authors'))

// for (const [id, name] of Object.entries(genres)) {
//     genreHtml.appendChild(createOptionElement(id, name))
// }

// for (const [id, name] of Object.entries(authors)) {
//     authorsHtml.appendChild(createOptionElement(id, name))
// }

// selectors.searchGenres.appendChild(genreHtml);
// selectors.searchAuthors.appendChild(authorsHtml);

// //Check and set user's prefered theme

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     selectors.settingsTheme.value = 'night'
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
// } else {
//     selectors.settingsTheme.value = 'day'
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
// }

// // Update the "Show more" button text and disable if no more books

// selectors.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
// selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 0;

// // Set the innerHtml

// selectors.listButton.innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining">
//         (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? 
//             (matches.length - (page * BOOKS_PER_PAGE)) : 0})
//     </span>
// `;
        
// // Add event listener for search and settings overlays and header buttons

// selectors.searchCancel.addEventListener('click', () => {
//     selectors.searchOverlay.open = false
// });

// selectors.settingsCancel.addEventListener('click', () => {
//     selectors.settingsOverlay.open = false
// })

// selectors.headerSettings.addEventListener('click', () => {
//     selectors.searchOverlay.open = true 
//     selectors.searchTitle.focus()
// });
                                                                                               
// selectors.headerSearch.addEventListener('click', () => {
//     selectors.searchOverlay.open = true 
//     selectors.searchTitle.focus()
// })

// selectors.listClose.addEventListener('click', () => {
//     selectors.listActive.open = false
// })

// //add an event listner to the settings form submit event

// selectors.settingsForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target)
//     const { theme } = Object.fromEntries(formData)

//     if (theme === 'night') {
//         document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//         document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//     } else {
//         document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//         document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//     }
    
//     selectors.settingsOverlay.open = false
// });

// /**
//  * function to handle the search form submission
//  * @param {event} - event
//  */

// function handleSearchFormSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const filters = Object.formEntries(formData);
//     const result = filterBooks(filters);

//     page = 1;
//     matches = result;
//     toggleListMessage(result.length < 1);
//     clearListItems();

//     const newItems = createBookPreview(result.slice(0, BOOKS_PER_PAGE));
//     appendItemsToList(newItems);

//     updateListButton();
//     scrollToTop();
//     closeSearchOverlay();
// };

// //Function to handle the "Show more"  button click

// function handleListButtonClicked() {
//     const fragment = document.createDocumentFragmentt();
//     const start = page * BOOKS_PER_PAGE;
//     const end = (page + 1) * BOOKS_PER_PAGE;

//     const previewElements = createBookPreview(matches.slice(start, end));
//     appendItemsToList(previewElements);

//     page += 1;
// }

// /**
//  * Function to filter books
//  * @param {Task} - filter
//  * @returns
//  */

// function filterBooks(filters) {
//     let genreMatch = filters.genre === 'any';

//     for (const singleGenre of book.genres) {
//         if (genreMatch) break;
//         if (singleGenre === filters.genre) {
//             genreMatch = true;
//         }
//     }

//     return (
//         (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
//         (filters.author === 'any' || book.author === filters.author) &&
//         genreMatch
//     );
// }


// /**
//  *  Function to toggle the display of the list message based on the number of matches
//  * @param { Task } - show
//  */   

// function toggleListMessage(show) {
//     selectors.listMessage.classList.toggle('list__message_show', show);
//   }

// // Function to clear the list items
// function clearListItems() {
//     selectors.listItems.innerHTML = '';
//   }

// /**
//  * Function to create book previews for a given array of books
//  * @param {object} books 
//  * @returns {fragment}
//  */
// function createBookPreview(book) {
//     const fragment = document.createDocumentFragment();
//     for (const book of books) {
//       const previewElement = createBookPreview(book);
//       fragment.appendChild(previewElement);
//     }
//     return fragment;

// }

// /**
//  * Function to append items to the list
//  * @param {*} items 
//  */
// function appendItemsToList(items) {
//   selectors.listItems.appendChild(items);
// }

// // Function to append items to the list
// function updateListButton() {
//   selectors.listButton.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

//   const remaining = Math.max(matches.length - page * BOOKS_PER_PAGE, 0);
//   selectors.listButton.innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${remaining})</span>
//   `;
// }

// // Function to scroll to the top of the page
// function scrollToTop() {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// function closeSearchOverlay() {
//   selectors.searchOverlay.open = false;
// }

// // Add event listeners for submitting search form and clicking list button
// selectors.listButton.addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()
    
//     for ( const book of matches.slice (page * BOOKS_PER_PAGE, (page +1) * BOOKS_PER_PAGE)) {
//     const previewElement = createBookPreview(book)
//         fragment.appendChild(previewElement)
//     }

//     selectors.listItems.appendChild(fragment)
//     page += 1
// });

// //Add event listener to show book details when preview button is clicked
// selectors.listItems.addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null

//     for (const node of pathArray) {
//         if (active) break

//         if (node?.dataset?.preview) {
//             let result = null
    
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             } 
        
//             active = result
//         }
//     }
// // Update book details in the active book display
//     if (active) {
//         selectors.listActive.open = true
//         selectors.listBlur.src = active.image
//         selectors.listImage.src = active.image
//         selectors.listTitle.innerText= active.title
//         selectors.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         selectors.listDescription.innerText = active.description
//     }
// });

// */
// /*import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

// function createBookPreview({ author, id, image, title }) {
//     const element = document.createElement('button');
//     element.classList = 'preview';
//     element.setAttribute('data-preview', id);
//     element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
        
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `
//     return element;

// }
// let page = 1;
// let matches = books
// //let BOOKS_PER_PAGE = 36

// const starting = document.createDocumentFragment()


// for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
//     const element = createBookPreview(book);
//     starting.appendChild(element);
// }

// document.querySelector('[data-list-items]').appendChild(starting)

// //Author and Genre tabs ABSTRACTION

// function createOptionElement(value, text) {
//   const element = document.createElement('option')
//   element.value = value
//   element.innerText = text
//   return element
// }

// function appendOptionsToContainer(container, options) {
//   const fragment = document.createDocumentFragment()
//   for (const [value, text] of Object.entries(options)) {
//     const element = createOptionElement(value, text)
//     fragment.appendChild(element)
//   }
//   container.appendChild(fragment)
// }

// const genreContainer = document.querySelector('[data-search-genres]')
// const genreOptions = {
//   any: 'All Genres',
//   ...genres
// }
// appendOptionsToContainer(genreContainer, genreOptions)

// const authorContainer = document.querySelector('[data-search-authors]')
// const authorOptions = {
//   any: 'All Authors',
//   ...authors
// }
// appendOptionsToContainer(authorContainer, authorOptions)


// /*const genreHtml = document.createDocumentFragment()
// const firstGenreElement = document.createElement('option')
// firstGenreElement.value = 'any'
// firstGenreElement.innerText = 'All Genres'
// genreHtml.appendChild(firstGenreElement)

// for (const [id, name] of Object.entries(genres)) {
//     const element = document.createElement('option')
//     element.value = id
//     element.innerText = name
//     genreHtml.appendChild(element)
// }

// document.querySelector('[data-search-genres]').appendChild(genreHtml)

// const authorsHtml = document.createDocumentFragment()
// const firstAuthorElement = document.createElement('option')
// firstAuthorElement.value = 'any'
// firstAuthorElement.innerText = 'All Authors'
// authorsHtml.appendChild(firstAuthorElement)

// for (const [id, name] of Object.entries(authors)) {
//     const element = document.createElement('option')
//     element.value = id
//     element.innerText = name
//     authorsHtml.appendChild(element)
// }

// document.querySelector('[data-search-authors]').appendChild(authorsHtml)

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.querySelector('[data-settings-theme]').value = 'night'
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
// } else {
//     document.querySelector('[data-settings-theme]').value = 'day'
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
// }

// document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
// document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

// document.querySelector('[data-list-button]').innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
// `

// document.querySelector('[data-search-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-header-search]').addEventListener('click', () => {
//     document.querySelector('[data-search-overlay]').open = true 
//     document.querySelector('[data-search-title]').focus()
// })

// document.querySelector('[data-header-settings]').addEventListener('click', () => {
//     document.querySelector('[data-settings-overlay]').open = true 
// })

// document.querySelector('[data-list-close]').addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = false
// })

// document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const { theme } = Object.fromEntries(formData)

//     if (theme === 'night') {
//         document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//         document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//     } else {
//         document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//         document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//     }
    
//     document.querySelector('[data-settings-overlay]').open = false
// })

// document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     const result = []

//     for (const book of books) {
//         let genreMatch = filters.genre === 'any'

//         for (const singleGenre of book.genres) {
//             if (genreMatch) break;
//             if (singleGenre === filters.genre) { genreMatch = true }
//         }

//         if (
//             (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
//             (filters.author === 'any' || book.author === filters.author) && 
//             genreMatch
//         ) {
//             result.push(book)
//         }
//     }

//     page = 1;
//     matches = result

//     if (result.length < 1) {
//         document.querySelector('[data-list-message]').classList.add('list__message_show')
//     } else {
//         document.querySelector('[data-list-message]').classList.remove('list__message_show')
//     }

//     document.querySelector('[data-list-items]').innerHTML = ''
//     const newItems = document.createDocumentFragment()

//     for (const book of result.slice(0, BOOKS_PER_PAGE)) {
//         const element = createBookPreview(book);
//         newItems.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(newItems)
//     document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

//     document.querySelector('[data-list-button]').innerHTML = `
//         <span>Show more</span>
//         <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
//     `

//     window.scrollTo({top: 0, behavior: 'smooth'});
//     document.querySelector('[data-search-overlay]').open = false
// })

// document.querySelector('[data-list-button]').addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()

//     for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
//         const element = createBookPreview(book);
//         fragment.appendChild(element);
// }

//     document.querySelector('[data-list-items]').appendChild(fragment)
//     page += 1
// })

// document.querySelector('[data-list-items]').addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null

//     for (const node of pathArray) {
//         if (active) break

//         if (node?.dataset?.preview) {
//             let result = null
    
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             } 
        
//             active = result
//         }
//     }
    
//     if (active) {
//         document.querySelector('[data-list-active]').open = true
//         document.querySelector('[data-list-blur]').src = active.image
//         document.querySelector('[data-list-image]').src = active.image
//         document.querySelector('[data-list-title]').innerText = active.title
//         document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         document.querySelector('[data-list-description]').innerText = active.description
//     }
// // })*/