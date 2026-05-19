// 1. Define and Use an Interface

interface User {
  username: string;
  password: string;
}

function login(user: User): void {
  console.log(`Logging in user: ${user.username}`);
}

const user: User = {
  username: "eng-honest",
  password: "12345678",
};

login(user);


// 2. ❓ Use Optional Properties

interface User {
  username: string;
  password: string;
  email?: string;
}

function loginWithEmail(user: User): void {
  console.log(`Logging in user: ${user.username}`);
  if (user.email) {
    console.log(`Email: ${user.email}`);
  }
}

const userWithEmail: User = {
  username: "eng-honest",
  password: "12345678",
  email: "injineerdaacad@gmail.com",
};

const userWithoutEmail: User = {
  username: "eng-honest",
  password: "12345678",
};

loginWithEmail(userWithEmail);
loginWithEmail(userWithoutEmail);


// 3. Readonly in Action

interface User {
  readonly id: number;
  username: string;
  password: string;
  email?: string;
}

const userWithId: User = {
  id: 1,
  username: "eng-honest",
  password: "12345678",
};

userWithId.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.