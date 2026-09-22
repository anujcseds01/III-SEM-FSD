const fs = require('fs');

console.log('1: start (sync)');

setTimeout(() => {
    console.log('2: inside setTimeout (macrotask - runs after microtasks)');
}, 0);

Promise.resolve().then(() => {
    console.log('3: inside promise.then (microtask - runs before setTimeout)');
});

fs.readFile(__filename, () => {
    console.log('4: inside fs.readFile callback (I/O callback)');
});

console.log('5: end (sync)');