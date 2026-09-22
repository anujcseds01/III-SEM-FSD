// import evnetemiiter class 
const EventEmitter = require('events');

// create button class 
class Button extends EventEmitter { }


// create button object
const button = new Button();

// Click event listener
button.on('click', () => {
    console.log("button clicked!");
})


// mouseover event listener
button.on('mouseover', () => {
    console.log("mouse over the button.");

});


// triggger events 
button.emit('click');
button.emit('mouseover');

