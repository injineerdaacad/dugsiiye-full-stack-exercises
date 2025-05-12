const array = [1, 2, 3];
const expandArray = [...array, 4, 5, 6];
console.log("Array-da qiimaheeda waa:", expandArray);

function multiply(...nums) {
  return nums.reduce((product, n) => product * n, 1);
}
const result = multiply(1, 2, 3, 4, 5);
console.log(`Isku dhufashada dhamaan qiimaha array-da waa: ${result}`);
