const list = document.querySelector("#list");
const addBtn = document.querySelector(".add");
const delBtn = document.querySelector(".del");

function addItem() {
  const newItem = document.createElement("li");
  newItem.textContent = "Istanbul";
  list.appendChild(newItem);
}

function removeItem() {
  if (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  } else {
    alert("Wax la delete gareeyo malahan!");
  }
}
