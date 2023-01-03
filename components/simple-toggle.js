const styles = `
    :host(simple-toggle) {
        display: block;
    }
    .details { display: none }
    .title {
        padding: 5px 0;

        display: list-item;
        counter-increment: list-item 0;          
        list-style: inside;

        border-bottom: 1px solid #EEE;
        cursor: pointer;
    }

    .title.closed {  
        list-style-type: disclosure-closed ;
    }

    .title.open {
        list-style-type: disclosure-open;
    }

    .details {            
        padding: 5px 0;
    }
    .wrapper {
        margin-bottom: 5px;
    }
`;

const simpleToggleTemplate = document.createElement('template');

simpleToggleTemplate.innerHTML = `
    <style>${styles}</style>
    <div class="wrapper">
        <div class="title"></div>
        <div class="details">
            <slot></slot>
        </div>
    </div>    
`;


// show/hide extra content under a title
class SimpleToggle extends HTMLElement {
    static observedAttributes = ['open'];

    constructor() {
        // always call super first in the constructor
        super();

        // create a shadow root
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(simpleToggleTemplate.content.cloneNode(true));
        // set the title attribute
        let title = this.shadowRoot.querySelector('.title');
        title.innerHTML = this.getAttribute('title');
    }

    // attached lifecycle
    connectedCallback() {
        this.shadowRoot.querySelector('.title').addEventListener('click', () => this.toggleDetails());
        this.setDetails();
    }

    // detached lifecycle
    disconnectedCallback() {
        this.shadowRoot.querySelector('.title').removeEventListener();
    }

    // this is called whenever an observed attribute is changed
    attributeChangedCallback() {
        this.setDetails();
    }

    // always update the value of open based on the attribute
    get open() {
        return this.hasAttribute('open');
    }

    // set the open attribute
    toggleDetails() {
        this.open ? this.removeAttribute('open') : this.setAttribute('open', '');
    }

    // show/hide details based on the open attribute
    setDetails() {
        const details = this.shadowRoot.querySelector('.details');
        const title = this.shadowRoot.querySelector('.title');

        if (this.open) {
            details.style.display = 'block';
            title.classList.add("open");
            title.classList.remove("closed");
        } else {
            details.style.display = 'none';
            title.classList.add("closed");
            title.classList.remove("open");
        }
    }
}

// Define the new element
customElements.define('simple-toggle', SimpleToggle)