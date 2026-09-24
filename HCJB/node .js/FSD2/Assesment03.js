const fs = require('fs');

console.log('Script start');

setTimeout(()=>{
    console.log('setTimeout with 0 ms delay');
},0);

setImmediate(()=>{
    console.log('setImmediate call back');
});

Promise.resolve().then(()=>{
    console.log('a promise.reolve().then(...)')
});

process.nextTick(()=>{
    console.log('a process.nextTick')
});
console.log('Script end');









