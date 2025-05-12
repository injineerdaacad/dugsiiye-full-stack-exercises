function operate(a, b, callback) {
  return callback(a, b);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Zero wax looma qeybiyo!";
  return a / b;
}

console.log(`Isku darka a iyo b waa: ${operate(5, 5, add)}`);
console.log(`Kalagoynta a iyo b waa: ${operate(5, 5, sub)}`);
console.log(`Isku dhufashada a iyo b waa: ${operate(5, 5, multiply)}`);
console.log(`Isku qeybinta a iyo b waa: ${operate(5, 5, divide)}`);
console.log(`Isku qeybinta a iyo b waa: ${operate(5, 0, divide)}`);
