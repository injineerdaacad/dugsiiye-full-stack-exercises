async function fetchingData() {
  console.log("Waxyar sug xogta way soo socotaa ...");

  const response = await fetch("./data.json");
  const data = await response.json();

  console.log("Xogta waatan:", data);
}

fetchingData();

console.log("Fariintaan waxay kasoo hormari doontaa xogta aad sugeysid!");
