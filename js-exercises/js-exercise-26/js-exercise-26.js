function blocking() {
  alert("Fariinta ma arkeysid ilaa ok riixdo!");
  return "Waa tan fariinta soo daahday, ee Blocking-ka ah!";
}

console.log("Fariinta marka hore la arkaayo!");
console.log(blocking());
console.log("Fariintaan waxay sugeysay ilaa howsha ka dhamaato! ");

function nonBlocking(callback) {
  setTimeout(() => {
    const message = "Waa tan fariinta soo daahday, ee non Blocking-ka ah!";
    callback(message);
  }, 2000);
}

console.log("Fariinta marka hore la arkaayo!");
nonBlocking((display) => {
  console.log(display);
});
console.log("Fariintaan waxay kasoo hormareysaa inta aysan howsha dhamaanin!");
