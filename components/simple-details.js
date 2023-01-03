
// this component extends the default details html element
class SimpleDetails extends HTMLDetailsElement {

    // always update the value of open based on the attribute
    get open() {
        return this.hasAttribute('open');
    }

    constructor() {
        // always call super first in the constructor
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('toggle', e => {
            console.log("Drawer is 1", open);
        });

    }

    // attached lifecycle
    connectedCallback() {
        const title = this.getElementsByTagName("summary")[0];
        title.style.cursor = 'pointer';
        title.style.borderBottom = '1px solid #EEE';
        title.style.padding = '5px 0';
        title.style.fontSize = '16px';        
    }
}

// Define the new element
customElements.define('simple-details', SimpleDetails, { extends: 'details' })