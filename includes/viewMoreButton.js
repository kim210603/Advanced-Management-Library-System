class ViewMoreButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: #f8f9fa;
          border: 1px solid #f8f9fa;
          border-radius: 4px;
          color: #007bff;
          cursor: pointer;
          font-size: 14px;
          padding: 8px 16px;
        }
      </style>
      <button>View More</button>
    `;
  }
}
customElements.define('view-more-button', ViewMoreButton);