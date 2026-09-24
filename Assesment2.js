const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {
        let event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,
            stopPropagation() {
                this.stopped = true;
            }
        };

        let element = this;

        while (element) {
            event.currentTarget = element;
            element.emit(type, event);

            if (event.stopped)
                break;

            element = element.parent;
        }
    }
}

let document = new Element("document");
let form = new Element("form", document);
let button = new Element("button", form);

function clickHandler(e) {
    console.log(e.currentTarget.name, "target:", e.target.name,
        "currentTarget:", e.currentTarget.name);
}

function formHandler(e) {
    console.log(e.currentTarget.name, "target:", e.target.name,
        "currentTarget:", e.currentTarget.name);
}

function stopHandler(e) {
    console.log(e.currentTarget.name, "target:", e.target.name,
        "currentTarget:", e.currentTarget.name);
    e.stopPropagation();
}

document.addEventListener("click", clickHandler);
form.addEventListener("click", formHandler);
button.addEventListener("click", clickHandler);

console.log("Scenario A");
button.dispatchEvent("click", "Button clicked");

console.log("Scenario B");
form.removeEventListener("click", formHandler);
form.addEventListener("click", stopHandler);
button.dispatchEvent("click", "Button clicked");

console.log("Scenario C");
button.removeEventListener("click", clickHandler);
button.dispatchEvent("click", "Button clicked");

form.addEventListener("keypress", clickHandler);
console.log("Keypress");
form.dispatchEvent("keypress", "A");