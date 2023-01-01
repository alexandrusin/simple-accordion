const simpleAccordionTemplate = document.createElement('template');
simpleAccordionTemplate.innerHTML = `
<style>
:host(simple-accordion) {
    display: block;
}
</style>
<div class="accordion">
<slot></slot>
</div>
`

// this component adds extra functionality to a group of SimpleToggle components
class SimpleAccordion extends HTMLElement {
    constructor() {
        // always call super first in the constructor
        super();

        // create a shadow root
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(simpleAccordionTemplate.content.cloneNode(true));

        this.onlyOneOpened = this.hasAttribute('only-one-opened', '');
    }
    
    // attached lifecycle
    connectedCallback() {
        if (this.onlyOneOpened) {
            this.shadowRoot.addEventListener( 'click', this );
        }
    }

    // detached lifecycle
    disconnectedCallback() {
        if (this.onlyOneOpened) {
            this.shadowRoot.removeEventListener( 'click', this );
        }
    }

    handleEvent(event) {
        if (!event.target.open) return;
        this.checkDetails(event);
    }

    checkDetails(event) {
        let elements = [...this.children];

        for (let element of elements) {
            if (element === event.target) continue;
            element.removeAttribute('open', '');
        }
    }
}

// Define the new element
customElements.define('simple-accordion', SimpleAccordion)