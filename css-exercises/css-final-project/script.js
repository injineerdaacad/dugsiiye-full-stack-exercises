document.addEventListener("DOMContentLoaded", function () {
  // ===== Shaqada Menu Toggle-ka =====
  const menuToggle = document.getElementById("menu-toggle");
  const menuLinks = document.getElementById("menu-links");
  const menuIcons = menuToggle.querySelectorAll("i");

  // Markaad menu-toggle gujiso, wuxuu beddelayaa muuqaalka liiska (menu links)
  menuToggle.addEventListener("click", () => {
    const isVisible = menuLinks.getAttribute("data-visible") === "true";
    menuLinks.setAttribute("data-visible", !isVisible);
    menuIcons[0].setAttribute("data-visible", isVisible); // bars
    menuIcons[1].setAttribute("data-visible", !isVisible); // close
  });

  // ===== Shaqada Table Filter-ka =====
  const filters = document.querySelectorAll(".schedule-filter li");
  const scheduleBody = document.getElementById("schedule-body");

  // Table-ka qiimaha laka gelinaaayo
  const scheduleData = [
    {
      class: "Fitness Class",
      instructor: "William G. Stewart",
      schedule: {
        monday: ["10:00AM - 11:30AM"], // Waqtiga 1 aad
        tuesday: [, "2:00PM - 3:30PM"], // Waqtiga 2 aad
      },
    },
    {
      class: "Muscle Training",
      instructor: "Paul D. Newman",
      schedule: {
        friday: ["10:00AM - 11:30AM"], // Waqtiga 1 aad
        thursday: [, "2:00PM - 3:30PM"], // Waqtiga 2 aad
      },
    },
    {
      class: "Body Building",
      instructor: "Boyd C. Harris",
      schedule: {
        tuesday: ["10:00AM - 11:30AM"], // Waqtiga 1 aad
        monday: [, "2:00PM - 3:30PM"], // Waqtiga 2 aad
      },
    },
    {
      class: "Yoga Training Class",
      instructor: "Hector T. Daigle",
      schedule: {
        wednesday: ["10:00AM - 11:30AM"], // Waqtiga 1 aad
        friday: [, "2:00PM - 3:30PM"], // Waqtiga 2 aad
      },
    },
    {
      class: "Advanced Training",
      instructor: "Bret D. Bowers",
      schedule: {
        wednesday: [, "2:00PM - 3:30PM"], // Waqtiga 1 aad
        thursday: ["10:00AM - 11:30AM"], // Waqtiga 2 aad
      },
    },
  ];

  // Meelaha la doorto in la iftiimiyo jadwalka (active cell)
  const highlightMap = {
    monday: [
      [0, 1], // row 1, col 2
      [2, 2], // row 3, col 3
    ],
    tuesday: [
      [0, 2], // row 1, col 3
      [2, 1], // row 3, col 2
    ],
    wednesday: [
      [3, 1], // row 4, col 2
      [4, 2], // row 5, col 3
    ],
    thursday: [
      [1, 2], // row 2, col 3
      [4, 1], // row 5, col 2
    ],
    friday: [
      [1, 1], // row 2, col 2
      [3, 2], // row 4, col 3
    ],
  };

  // Function: Soo bandhig jadwalka maalinta la doortay
  function renderSchedule(day) {
    scheduleBody.innerHTML = "";

    scheduleData.forEach((item, index) => {
      const times = item.schedule[day] || [];
      const time1 = times[0] || "-"; // Table column 2 (Time Slot 1)
      const time2 = times[1] || "-"; // Table column 3 (Time Slot 2)

      // Haddii unugga loo baahanyahay inuu noqdo "active"
      const isActive = (row, col) =>
        highlightMap[day]?.some(([r, c]) => r === row && c === col);

      // Abuur saf cusub (row) oo ku dar jadwalka
      const row = `
            <tr>
              <td>${item.class}</td>

              <td class="${isActive(index, 1) ? "active" : ""}">${time1}</td>

              <td class="${isActive(index, 2) ? "active" : ""}">${time2}</td>
              
              <td>${item.instructor}</td>
            </tr>
          `;
      scheduleBody.insertAdjacentHTML("beforeend", row);
    });
  }

  // Dhageyso marka la gujiyo tab-yada si loo badalo jadwalka
  filters.forEach((filter) => {
    filter.addEventListener("click", function () {
      filters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");
      const day = this.getAttribute("data-tsfilter").toLowerCase();
      renderSchedule(day);
    });
  });

  // Soo bandhig jadwalka maalinta Isniinta marka boggu furmo
  renderSchedule("monday");
});

// ===== Function: Soo bandhig qeybta tab-ka =====
function showTab(tabId, element) {
  // Tirtir "active" tab-yada kale
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Samee tab-ka la doortay inuu noqdo "active"
  document.getElementById(tabId).classList.add("active");

  // Tirtir "active" link-yada kale
  document.querySelectorAll(".class-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Samee link-ga hadda la doortay inuu noqdo "active"
  if (element) {
    element.classList.add("active");
  }
}
