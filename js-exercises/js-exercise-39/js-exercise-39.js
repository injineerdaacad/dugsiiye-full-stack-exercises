// Dhamaan DOM Elements-ka
const selectCountry1 = document.querySelector("#country-select-1");
const selectCountry2 = document.querySelector("#country-select-2");
const textArea = document.querySelector("#translate-content");
const translateBtn = document.querySelector("#translate-btn");
const translatedTextDiv = document.querySelector("#translated-text");

/*
 GROUP B MENTORS: Eng. Idiris and Eng. Juweyriya

 OGEYSIIS:
 Waxaa  ii shaqeynwaayay API ga Eng. MC Hamouda ii tilmaamay oo ahaa: https://rapidapi.com/apiship-apiship-default/api/microsoft-translator-text-api3/playground

 Waxaan isticmaalay API gaan: https://rapidapi.com/gatzuma/api/deep-translate1/playground
*/

async function fetchAllLanguages() {
  const url =
    "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "32e7975d0bmsh7a73587a8d051c6p1743afjsn7680a11ceed2",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Qaladbaa jiro xaga HTTP-ga, status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response JSON:", result);

    const languages = result.languages;
    if (!languages) {
      console.error("Ma helin luqadaha response-ka saxda ah:", result);
      return;
    }

    console.log("Luqadaha:", languages);

    for (const lang of languages) {
      const code = lang.language;
      const name = lang.name;

      const option1 = document.createElement("option");
      option1.value = code;
      option1.textContent = name;
      selectCountry1.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = code;
      option2.textContent = name;
      selectCountry2.appendChild(option2);
    }

    console.log("Luqadaha si guul ah ayaa loo soo helay!");
  } catch (error) {
    console.error(error);
  }
}

window.onload = fetchAllLanguages;

async function translation() {
  const text = textArea.value.trim();
  const toLang = selectCountry2.value;
  const fromLang = selectCountry1.value;

  if (!text || !toLang || !fromLang) {
    alert("Fadlan buuxi luqadaha iyo qoraalka!");
    return;
  }

  await fetchTranslation(text, toLang, fromLang);
}

async function fetchTranslation(text, toLang, fromLang) {
  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "32e7975d0bmsh7a73587a8d051c6p1743afjsn7680a11ceed2",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      q: text,
      source: fromLang,
      target: toLang,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Qaladbaa jiro xaga HTTP-ga, status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Natiijada:", result);

    const translatedText =
      result.data?.translations?.translatedText[0] || "Tarjumid lama helin";
    console.log("Tarjumida:", translatedText);

    translatedTextDiv.textContent = translatedText;

    return translatedText;
  } catch (error) {
    console.error(error);
    alert("Qalad ayaa dhacay, fadlan dib isku day!");
  }
}

translateBtn.addEventListener("click", (event) => {
  event.preventDefault();
  translation();
});
