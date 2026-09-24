


const EventEmitter = require('events');       //CLASS
const myemitter = new EventEmitter();         //OBJECT
myemitter.on('greet', (name) => {               
    console.log(`Hello, ${name}! Welcome to the Node.js.`);
});                                                            //EVENTS LISTENER 
myemitter.on('exist', (name) => {
    console.log("Application closed ");

});                                     //EVENTS LISTENER
myemitter.emit('greet', 'John');
myemitter.emit('exist');     //EXIST