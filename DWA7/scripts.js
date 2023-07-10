import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

/**
 * This function is responsible for displaying book previews
 * 
 * @param {*} param0 
 * @returns - element
 */
function createPreviewElement({ author, id, image, title }) {
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

    return element
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
    headerSearch: document.querySelector('[data-header-search'),
    headerSettings: document.querySelector('[data-header-settings]'),
    listClose: document.querySelector('[data-lust-close]'),
    settingsForm: document.querySelector('[data-settings-form]'),
    searchForm: document.querySelector('[data-search-form]'),
    listMessage: document.querySelector('[data-list-message]'),
    listActive: document.querySelector('[adata-list-active]'),
    listBlur: document.querySelector('[data-list-blur]'),
    listImage: document.querySelector('[data-list-image]'),
    listTitle: document.querySelector('[data-list-title]'),
    listSubTitle: document.querySelector('[data-list-subtitle]'),
    listDescription: document.querySelector('[data-list-description]'),
}

let page = 1;
let matches = books;

const starting = document.createDocumentFragment()

for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
    const element = createPreviewElement(book)

    starting.appendChild(element)
}

selectors.listItems.appendChild(starting);

//function createSearchOptionElement([id, name]) {
//    const element = document.createElement('option')
//    element.value = id
//    element.innerText = name

//    return element

//}

/**
 * The createSearchOptions function generates HTML for search options
 * Alinged to the Single Responsibility Principle
 * It creates the options element and appends it to the container element
 * @param {HTMLElement} container 
 * @param {Object} data 
 * @param {String} defaultOptionText 
 */
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

/**
 * The initialiseSearchOptions function is an entry point for initialising the search options
 * The function is an abstraction of the initialisation process into a separate function
 * It is an application of the Open/Close Principle which allows for easy code extension or behaviour modification
 */
function initialiseSearchOptions() {
    const genreContainer = selectors.searchGenres;
    createSearchOptions(genreContainer, genres, 'All Genres');

    const authorContainer = selectors.searchAuthors;
    createSearchOptions(authorContainer, authors, 'All Authors');
}

initialiseSearchOptions();
//const genreHtml = document.createDocumentFragment()
//const firstGenreElement = document.createElement('option')
//firstGenreElement.value = 'any'
//firstGenreElement.innerText = 'All Genres'
//genreHtml.appendChild(firstGenreElement)

//for (const search of Object.entries(genres)) {
//    const element = createSearchOptionElement(search)

//    genreHtml.appendChild(element)
//}

//document.querySelector('[data-search-genres]').appendChild(genreHtml)

//const authorsHtml = document.createDocumentFragment()
//const firstAuthorElement = document.createElement('option')
//firstAuthorElement.value = 'any'
//firstAuthorElement.innerText = 'All Authors'
//authorsHtml.appendChild(firstAuthorElement)

//for (const search of Object.entries(authors)) {
//    const element = createSearchOptionElement(search)
//    authorsHtml.appendChild(element)
//}

//document.querySelector('[data-search-authors]').appendChild(authorsHtml)

/**
 * The setTheme function sets the theme according to the CSS colour styling.
 * It is called when the theme is changed through the settings form
 * @param {string} theme 
 */

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
    selectors.settingsTheme.value = 'night'
    setTheme('night');
} else {
    selectors.settingsTheme.value = 'day'
    setTheme('day');
}

selectors.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);
    setTheme(theme);
    selectors.settingsOverlay.open = false;
});


selectors.listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

selectors.listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`

selectors.searchCancel.addEventListener('click', () => {
    selectors.searchOverlay.open = false
})

selectors.settingsCancel.addEventListener('click', () => {
    selectors.settingsOverlay.open = false
})

selectors.headerSearch.addEventListener('click', () => {
    selectors.searchOverlay.open = true 
    selectors.searchTitle.focus()
})

selectors.headerSettings.addEventListener('click', () => {
    selectors.settingsOverlay.open = true 
})

selectors.listClose.addEventListener('click', () => {
    selectors.listActive.open = false
})

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

selectors.searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        selectors.listMessage.classList.add('list__message_show')
    } else {
        selectors.listMessage.classList.remove('list__message_show')
    }

    selectors.listItems.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const book of result.slice(0, BOOKS_PER_PAGE)) {
        const element = createPreviewElement(book)

        newItems.appendChild(element)
    }

    selectors.listItems.appendChild(newItems)
    selectors.listButton.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    selectors.listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    selectors.searchOverlay.open = false
})

selectors.listButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createPreviewElement(book);

        fragment.appendChild(element)
    }

    selectors.listItems.appendChild(fragment)
    page += 1
})

selectors.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        selectors.listActive.open = true
        selectors.listBlur.src = active.image
        selectors.listImage.src = active.image
        selectors.listTitle.innerText = active.title
        selectors.listSubTitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        selectors.listDescription.innerText = active.description
    }
})