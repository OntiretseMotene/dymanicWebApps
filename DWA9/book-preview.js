export class BookPreview extends HTMLElement {
    constructor () {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
      <style>
        .preview {
            border-width: 0;
            width: 100%;
            font-family: Roboto, sans-serif;
            padding: 0.5rem 1rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            text-align: left;
            border-radius: 8px;
            border: 1px solid rgba(var(--color-dark), 0.15);
            background: rgba(var(--color-light), 1);
        }

        .preview__image {
          width: 48px;
            height: 70px;
            object-fit: cover;
            background: grey;
            border-radius: 2px;
            box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
            0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
        }

        .preview__info {
            padding: 1rem;
        }

        .preview__title {
            margin: 0 0 0.5rem;
            font-weight: bold;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
            color: rgba(var(--color-dark), 0.8)
        }

        .preview__author {
            color: rgba(var(--color-dark), 0.4);
        }
      </style>
      <button class="preview" data-preview="">
        <img class="preview__image" src="" />
        <div class="preview__info">
          <h3 class="preview__title"></h3>
          <div class="preview__author"></div>
        </div>
      </button>
    `;
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const { author, id, image, title } = this.dataset;
        this.setAttribute('data-preview', id);
        this.shadowRoot.querySelector('.preview__image').setAttribute('src', image);
        this.shadowRoot.querySelector('.preview__title').innerText = title;
        this.shadowRoot.querySelector('.preview__author').innerText = author;
      }
    }
    
    customElements.define('book-preview', BookPreview);


