// 1. Define and Use an Interface
function login(user) {
    console.log(`Logging in user: ${user.username}`);
}
const user = {
    username: "eng-honest",
    password: "12345678",
};
login(user);
function loginWithEmail(user) {
    console.log(`Logging in user: ${user.username}`);
    if (user.email) {
        console.log(`Email: ${user.email}`);
    }
}
const userWithEmail = {
    username: "eng-honest",
    password: "12345678",
    email: "injineerdaacad@gmail.com",
};
const userWithoutEmail = {
    username: "eng-honest",
    password: "12345678",
};
loginWithEmail(userWithEmail);
loginWithEmail(userWithoutEmail);
const userWithId = {
    id: 1,
    username: "eng-honest",
    password: "12345678",
};
export {};
// userWithId.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
