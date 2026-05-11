// 1. Declare Arrays with Explicit Types

let names: string[] = ["Mohamed", "Ahmed", "Yusuf"];
let grades: number[] = [99, 90, 95];
let status: boolean[] = [true, false, true];

console.log("Names:", names);
console.log("Grades:", grades);
console.log("Status:", status);


// 2. Fix this Broken JavaScript let products = ["Laptop", "Phone", 99];

let products: string[] = ["Laptop", "Phone"];
console.log("Products:", products);


// 3. Use Tuple with fixed types
let location: [string, number, number] = ["Mogadishu", 100, 200];
console.log("Location:", location);