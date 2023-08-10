export class SearchOptions extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
       <style>
         /* Add your custom styles here */
       </style>
      <div>
        <label for="genre">Genre:</label>
        <select id="genre">
          <option value="any">All Genres</option>
        </select>
        <label for="author">Author:</label>
        <select id="author">
          <option value="any">All Authors</option>
        </select>
      </div>
    `;
  }

  connectedCallback() {
    const genreSelect = this.shadowRoot.getElementById('genre');
    const authorSelect = this.shadowRoot.getElementById('author');

    // Populate genre and author options
    for (const [id, name] of Object.entries(window.genres)) {
      const option = document.createElement('option');
      option.value = id;
      option.innerText = name;
      genreSelect.appendChild(option);
    }

    for (const [id, name] of Object.entries(window.authors)) {
      const option = document.createElement('option');
      option.value = id;
      option.innerText = name;
      authorSelect.appendChild(option);
    }

    // Add event listeners for filtering on selection change
    genreSelect.addEventListener('change', this.handleFilterChange.bind(this));
    authorSelect.addEventListener('change', this.handleFilterChange.bind(this));
  }

  handleFilterChange() {
    const genre = this.shadowRoot.getElementById('genre').value;
    const author = this.shadowRoot.getElementById('author').value;

    // Dispatch an event with selected filters
    this.dispatchEvent(new CustomEvent('filters-changed', { detail: { genre, author } }));
  }
}

// Define the custom element
customElements.define('search-options', SearchOptions);
