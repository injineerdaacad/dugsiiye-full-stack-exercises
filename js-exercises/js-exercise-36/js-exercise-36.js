const colorPicker = document.querySelector("#colorPicker");
const colorPreview = document.querySelector("#colorPreview");
const colorHistory = document.querySelector("#colorHistory");
const clearBtn = document.querySelector("#clearHistoryButton");

colorPicker.addEventListener("input", function () {
  const selectedColor = colorPicker.value;
  colorPreview.style.backgroundColor = selectedColor;

  chooseColor(selectedColor);
});

function chooseColor(color) {
  const list = document.createElement("li");
  list.textContent = color;
  list.style.color = color;
  colorHistory.appendChild(list);
}

clearBtn.addEventListener("click", function () {
  colorHistory.innerHTML = "";
});
