const simpleToggleTemplate = document.createElement('template');
simpleToggleTemplate.innerHTML = `
    <style>
        :host(toggle-details) {
            display: block;
        }
        .details { display: none }
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 5px 0;
            border-bottom: 1px solid #EEE;
            cursor: pointer;
        }
        .icon {
            font-weight: bold;
            font-size: 20px;
            background: #FFF;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
        }
        .name {
            padding: 0;
            margin: 0;
        }
        .details {
            padding: 5px 0;
        }
        .wrapper {
            margin-bottom: 5px;
        }
        .arrow {
            border-style: solid;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;
            transition: transform .1s ease-in;
        }
        .up {
            border-color: #111;
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);
        }
          
        .down {
            border-color: #666;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }

    </style>
    <div class="wrapper">
        <div class="title">
            <h3 class="name"></h3>
            <span class="arrow down"></span>
        </div>
        <div class="details">
            <slot></slot>
        </div>
    </div>    
`

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
        let title = this.shadowRoot.querySelector('h3');
        title.innerHTML = this.getAttribute('title');
    }

    // attached lifecycle
    connectedCallback() {
        this.shadowRoot.querySelector('.title').addEventListener('click', () => this.toggleDetails());
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
        const toggleIcon = this.shadowRoot.querySelector('.arrow');

        if (this.open) {
            details.style.display = 'block';
            toggleIcon.classList.replace("down", "up");
        } else {
            details.style.display = 'none';
            toggleIcon.classList.replace("up", "down");
        }
    }
}

// Define the new element
customElements.define('simple-toggle', SimpleToggle)