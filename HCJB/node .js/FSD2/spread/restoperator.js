const arr1=[1,2,3];
const arr2=[4,5,6];

const combined=[...arr1,...arr2]; // here dots(...) is used to spread
//  the elements of arr1 and arr2 into a new array
console.log(combined); //[1,2,3,4,5,6]

function sumAll(nums){
    return nums.reduce((a,b) => a + b, 0);
}
console.log(sumAll([1,2,3,4])); // 10
