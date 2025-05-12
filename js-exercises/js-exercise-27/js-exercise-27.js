function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Xogta si sax ah ayaa loo helay!");
      } else {
        reject("Waxaa dhacday cilad, lama helin xogta isticmaalaha!");
      }
    }, 2000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
