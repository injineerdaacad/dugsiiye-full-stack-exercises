const people = [
  { name: "Mohamed", age: 20, city: "Mogadishu" },
  { name: "Ahmed", age: 40, city: "London" },
  { name: "Yusuf", age: 60, city: "California" },
];

console.log("Properties and values of each person:");
for (let person of people) {
  for (let key in person) {
    console.log(`${key}: ${person[key]}`);
  }
  console.log("---");
}
