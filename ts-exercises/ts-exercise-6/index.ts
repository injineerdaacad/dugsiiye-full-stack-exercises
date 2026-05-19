// 1. UserRole Enum Usage

enum UserRole {
  SuperAdmin = "superadmin",
  Moderator = "moderator",
  Viewer = "viewer",
}

function canEdit(role: UserRole): boolean {
  return role !== UserRole.Viewer;
}

console.log(canEdit(UserRole.SuperAdmin));
console.log(canEdit(UserRole.Moderator));
console.log(canEdit(UserRole.Viewer));


// 2. Type Assertion with `as`

if (typeof document !== "undefined") {
  const button = document.querySelector("button");

  if (button) {
    (button as HTMLButtonElement).disabled = true;
  }
} else {
  console.log("DOM example skipped: document is only available in the browser.");
}
