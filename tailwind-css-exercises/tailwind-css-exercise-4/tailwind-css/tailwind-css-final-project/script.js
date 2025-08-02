// Mobile Menu
const btn = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");

btn?.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Active
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-link").forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("text-yellow-400", "font-semibold");
  }
});
