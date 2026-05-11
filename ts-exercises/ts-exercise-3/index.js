// 1. Add Types to a Function
function fullName(first, last) {
    return first + " " + last;
}
console.log("Full Name:", fullName("Mohamed Ahmed", "Yusuf"));
// 2. Optional and Default Parameters
function registerUser(username, isAdmin, language = "so") {
    console.log("Username:", username);
    console.log("Is Admin:", isAdmin);
    console.log("Language:", language);
}
registerUser("Mohamed");
registerUser("Ahmed", true, "en");
// 3. Create a Safe Rest Function
function average(...scores) {
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}
console.log(average(90, 80, 100));
export {};
