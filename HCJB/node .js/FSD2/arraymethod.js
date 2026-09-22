const numbers=[1,2,3,4,5];
const doubled=numbers.map(num=>num*2);
const evenNumbers=numbers.filter(num=>num%2===0);
const sum = numbers.reduce((total,num)=> total+num,0);
console.log(doubled);
console.log(evenNumbers);
console.log(sum);