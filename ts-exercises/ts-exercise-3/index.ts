// 1. Add Types to a Function

function fullName(first: string, last: string): string {
  return first + " " + last;
}

console.log("Full Name:", fullName("Mohamed Ahmed", "Yusuf"));


// 2. Optional and Default Parameters

function registerUser(username: string, isAdmin?: boolean, language: string = "so"): void {
  console.log("Username:", username);
  console.log("Is Admin:", isAdmin);
  console.log("Language:", language);
}

registerUser("Mohamed");
registerUser("Ahmed", true, "en");


// 3. Create a Safe Rest Function

function average(...scores: number[]): number {
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

console.log(average(90, 80, 100));