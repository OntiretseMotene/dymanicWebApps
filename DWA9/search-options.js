export class SearchOptions extends HTMLElement {
    constructor() {
      super();
      const template = document.createElement('template');
      template.innerHTML = `
        <template id="search-options-template">
        <div>
            <label for="searchGenres">Select Genre:</label>
            <select id="searchGenres" data-search-genres>
            <!-- Options will be added here dynamically -->
            </select>
        </div>
        <div>
            <label for="searchAuthors">Select Author:</label>
            <select id="searchAuthors" data-search-authors>
            <!-- Options will be added here dynamically -->
            </select>
        </div>
        </template>
    `;


      // Create a shadow DOM for the component
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    // Initialize the search options
      //this.initialiseSearchOptions();

    createSearchOptions(container, data, defaultOptionText) {
       const fragment = document.createDocumentFragment();
       const defaultOption = document.createElement('option');
       defaultOption.value = 'any';
       defaultOption.innerText = defaultOptionText;
       fragment.appendChild(defaultOption);

       for (const [id, name] of Object.entries(data)) {
         const option = document.createElement('option');
         option.value = id;
         option.innerText = name;
         fragment.appendChild(option);
       }

       container.appendChild(fragment);
    

    initialiseSearchOptions() 

    connectedCallback() 
      
      const genreContainer = this.shadowRoot.getElementById('searchGenres');
      this.createSearchOptions(genreContainer, genres, 'All Genres');

      const authorContainer = this.shadowRoot.getElementById('searchAuthors');
      this.createSearchOptions(authorContainer, authors, 'All Authors');
    }
  }

  customElements.define('search-options', SearchOptions);

