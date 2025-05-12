async function fetchUserData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Qalad baajiro xaga HTTP-ga, Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Xogta waatan:", data);
  } catch (error) {
    console.error(error);
  }
}

fetchUserData();
