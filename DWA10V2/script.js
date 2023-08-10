
class TallyButton extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 20px;
    }
  `;

  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    return html`
      <h1>Tally Counter App</h1>
      <sl-button @click=${this.addition}>Add</sl-button>
      <sl-button  @click=${this.subtraction}>Subtract</sl-button>
      <sl-button @click=${this.reset}>Reset</sl-button>
      <p>Counter: ${this.counter}.toString</p>
    `;
  }

  addition() {
    this.counter++;
    this.requestUpdate();
  }

  subtraction() {
    if (this.counter > 0) {
      this.counter--;
      this.requestUpdate();
    }
  }

  reset() {
    this.counter = 0;
    this.requestUpdate();
    alert('Counter has been reset.');
  }
}

customElements.define('sl-button', TallyButton);
