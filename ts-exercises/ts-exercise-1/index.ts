// 1. Declare Variables with Explicit Types

let productName: string = "Laptop";
let price: number = 1000.00;
let discountAvailable: boolean = true;

console.log(`Product: ${productName}`);
console.log(`Price: $${price}`);
console.log(`Discount Available: ${discountAvailable}`);


// 2. Fix this Broken JavaScript

function getDiscount(price: number, discount: number): number {
  return price - price * discount;
}

console.log(`Price after discount: $${getDiscount(price, 0.1)}`);


// 3. Dangerous any

function printLength(x: unknown) {
  if (typeof x === "string" || Array.isArray(x)) {
    console.log(x.length);
  } else {
    console.log("Length is not available");
  }
}

printLength("Hello, TypeScript!");
printLength(123);