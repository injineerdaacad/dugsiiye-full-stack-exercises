// 1. Echo Function with Generics

function echo<T>(input: T): T {
  return input;
}

const echoedString = echo("Hello, TypeScript!");
const echoedNumber = echo(42);
const echoedArray = echo([1, 2, 3]);
const echoedObject = echo({ name: "Eng. Honest", age: 30 });

console.log(echoedString);
console.log(echoedNumber);
console.log(echoedArray);
console.log(echoedObject);


// 2. Generic Interface

interface ApiResult<T> {
  status: string;
  data: T;
}

const stringResult: ApiResult<string> = {
  status: "success",
  data: "This is a string result",
};

const objectResult: ApiResult<{ id: number; name: string }> = {
  status: "success",
  data: { id: 1, name: "Eng. Honest" },
};

console.log(stringResult);
console.log(objectResult);


// 3. First Element Function

function first<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = first([10, 20, 30]);
const firstString = first(["apple", "banana", "cherry"]);
const firstObject = first([{ id: 1 }, { id: 2 }, { id: 3 }]);

console.log(firstNumber);
console.log(firstString);
console.log(firstObject);
