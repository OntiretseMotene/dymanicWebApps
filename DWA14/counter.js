import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// import {LitElement, html} from 'lit';

const MAX_NUMBER = 20;
const MIN_NUMBER = -10;
const STEP_AMOUNT = 2;

class TallyApp extends LitElement {
  static styles = css`
    :host {
      --color-green: #F49380;
      --color-white: #fff;
      --color-dark-grey: #333d;
      --color-medium-grey: #424250;
      --color-light--grey: #8D97A7;
    }
    {
      box-sizing: border-box;
    }
    html {
      height: 100vh;
    }
    body {
      margin: 0;
      background: var(--color-medium-grey);
      color: var(--color-white);
      font-family: Roboto, Arial, Helvetica, sans-serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    /* header */
    .header {
      text-align: center;
    }
    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-light--grey);
    }
    /* controls */
    .controls {
      background: black;
    }
    /* counter */
    .counter {
      background: var(--color-dark-grey);
    }
    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
      font-weight: 900;
      background: none;
      color: var(--color-white);
      border-width: 0;
      border-bottom: 1px solid var(--color-light--grey);
    }
    .counter__actions {
      display: flex;
    }
    .counter__button {
      background: none;
      width: 50%;
      border: 0;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light--grey);
      transition: transform 0.3s;
      transform: translateY(0);
    }
    .counter__button:disabled {
      opacity: 0.2;
    }
    .counter__button:active {
      background: var(--color-medium-grey);
      transform: translateY(2%);
    }
    .counter__button_first {
      border-right: 1px solid var(--color-light--grey);
    }
    .footer {
      background: var(--color-dark-grey);
      color: var(--color-light--grey);
      padding: 2rem;
      font-size: 0.8rem;
      text-align: center;
    }
    .footer__link {
      color: var(--color-white);
    }
  `;
  static properties = {
    count: { type: Number },
  };
  constructor() {
    super();
    this.count = 0;
  }
  subtractHandler() {
    this.count -= STEP_AMOUNT;
    
  }
  addHandler() {
    this.count += STEP_AMOUNT;
    
  }
  render() {
    return html`
      <div class="header">
        <h1 class="header__title">Tally Count App</h1>
      </div>
      <div class="controls">
        <div class="counter">
          <input
            class="counter__value"
            type="number"
            .value=${this.count}
            style=${this.count <= MIN_NUMBER ? 'color: red' : ''}
            disabled
          />
          <div class="counter__actions">
            <button
              class="counter__button counter__button_first"
              @click=${this.subtractHandler}
              ?disabled=${this.count <= MIN_NUMBER}
            >
              Subtract
            </button>
            <button
              class="counter__button"
              @click=${this.addHandler}
              ?disabled=${this.count >= MAX_NUMBER}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="footer">
      </div>
    `;
  }
}
customElements.define('tally-app', TallyApp);