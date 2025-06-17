document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const navbarLinks = document.querySelector(".navbar-links");
  const darkBtn = document.getElementById("toggle-dark");
  const userDisplay = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });
  }
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  if (toggleButton && navbarLinks) {
    toggleButton.addEventListener("click", () => {
      navbarLinks.classList.toggle("active");
      toggleButton.classList.toggle("active");
    });
  }

  if (userDisplay) {
    if (currentUser) {
      userDisplay.textContent = currentUser.username;
    } else {
      alert("Fadlan login samee si aad u gasho bogga profile-ka.");
      window.location.href = "login.html";
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert("Si guul ah ayaad uga baxday!");
      window.location.href = "index.html";
    });
  }

  const registerForm = document.getElementById("register-form");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      ?.value.trim();
    if (!username || !password || !confirmPassword)
      return alert("Fadlan buuxi dhammaan meelaha.");
    if (password !== confirmPassword)
      return alert("Password-ka lama mid aha confirm-ka.");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username))
      return alert("Userkan wuu jirayaa.");
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Waa lagu diiwaangeliyay.");
    window.location.href = "login.html";
  });

  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      alert("Si guul ah ayaad u gashay!");
      window.location.href = "jobs.html";
    } else {
      alert("Magaca ama password-ka waa qalad.");
    }
  });

  const favouriteJobsContainer = document.getElementById("favourite-jobs");
  const clearBtn = document.getElementById("clear-favourites");
  if (favouriteJobsContainer && clearBtn && currentUser) {
    const key = `favourites_${currentUser.username}`;
    const favourites = JSON.parse(localStorage.getItem(key)) || [];

    if (!favourites.length) {
      favouriteJobsContainer.innerHTML = "<p>Ma jiraan shaqooyin kaydsan.</p>";
    } else {
      favourites.forEach((job) => {
        const card = document.createElement("div");
        card.className = "job-card";
        card.innerHTML = `
          <img src="${
            job.image || "https://via.placeholder.com/800x180"
          }" alt="Job Image" />
          <div class="job-card-content">
            <h3>${job.title}</h3>
            <p><strong>Shirkad:</strong> ${job.company}</p>
            <p><strong>Goobta:</strong> ${job.location}</p>
            <p><strong>Sharaxaad:</strong> ${job.description}</p>
            <p><strong>Kalaxiriir:</strong> ${job.contact}</p>
          </div>
        `;
        favouriteJobsContainer.appendChild(card);
      });
    }

    clearBtn.addEventListener("click", () => {
      if (confirm("Hubtaa in aad tirtirayso dhammaan shaqooyinka kaydsan?")) {
        localStorage.removeItem(key);
        favouriteJobsContainer.innerHTML =
          "<p>Shaqooyinka waa la tirtiray.</p>";
      }
    });
  }
});

const jobList = document.getElementById("job-list");
const filterInput = document.getElementById("job-filter");
let allJobs = [];

function loginPrompt() {
  alert("Fadlan login samee si aad u fuliso howshan!");
  window.location.href = "login.html";
}

function saveJob(job, user) {
  const key = `favourites_${user.username}`;
  const favourites = JSON.parse(localStorage.getItem(key)) || [];
  if (
    favourites.some((j) => j.title === job.title && j.company === job.company)
  )
    return alert("Shaqadan hore ayaad u kaydisay.");
  favourites.push(job);
  localStorage.setItem(key, JSON.stringify(favourites));
  alert("Shaqada waa la kaydiyay!");
}

function displayJobs(jobs) {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  jobList.innerHTML = "";
  if (!jobs.length) return (jobList.innerHTML = "<p>Shaqooyin lama helin.</p>");

  jobs.forEach((job) => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <img src="${
        job.image || "https://via.placeholder.com/800x180"
      }" alt="Job Image" />
      <div class="job-card-content">
        <h3>${job.title}</h3>
        <p><strong>Shirkad:</strong> ${job.company}</p>
        <p><strong>Goobta:</strong> ${job.location}</p>
        <p><strong>Sharaxaad:</strong> ${job.description}</p>
        <p><strong>Kalaxiriir:</strong> ${job.contact}</p>
        <textarea placeholder="${
          currentUser
            ? "Ku dar faallo..."
            : "Login samee si aad faallo u bixiso."
        }" ${currentUser ? "" : "disabled"}></textarea>
        <button class="save-btn" ${
          currentUser ? "" : "disabled title='Login si aad u kaydiso'"
        }>
          <i class="fas fa-bookmark"></i> Kaydi
        </button>
        <ul class="comment-list"></ul>
      </div>
    `;

    const saveBtn = card.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) return loginPrompt();
      saveJob(job, user);
    });

    const commentBox = card.querySelector("textarea");
    const commentList = card.querySelector(".comment-list");
    const commentKey = `comments_${job.title}_${job.company}`;
    const comments = JSON.parse(localStorage.getItem(commentKey)) || [];

    comments.forEach(({ text, username }, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${username}:</strong> <span class="comment-text">${text}</span>`;

      if (currentUser && username === currentUser.username) {
        const editBtn = document.createElement("button");
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        editBtn.title = "Edit";
        editBtn.style.marginLeft = "10px";

        const delBtn = document.createElement("button");
        delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        delBtn.title = "Delete";
        delBtn.style.marginLeft = "6px";

        delBtn.onclick = () => {
          comments.splice(index, 1);
          localStorage.setItem(commentKey, JSON.stringify(comments));
          displayJobs(allJobs);
        };

        editBtn.onclick = () => {
          const span = li.querySelector(".comment-text");
          const oldText = span.textContent;
          const input = document.createElement("input");
          input.type = "text";
          input.value = oldText;
          input.style.marginLeft = "10px";
          input.style.padding = "2px";
          input.style.width = "60%";

          const saveBtn = document.createElement("button");
          saveBtn.innerHTML = `<i class="fas fa-save"></i>`;
          saveBtn.title = "Save";
          saveBtn.style.marginLeft = "6px";

          li.innerHTML = `<strong>${username}:</strong>`;
          li.appendChild(input);
          li.appendChild(saveBtn);

          saveBtn.onclick = () => {
            const newText = input.value.trim();
            if (!newText) return alert("Qoraalka lama dhaafi karo");
            comments[index].text = newText;
            localStorage.setItem(commentKey, JSON.stringify(comments));
            displayJobs(allJobs);
          };
        };

        li.appendChild(editBtn);
        li.appendChild(delBtn);
      }

      commentList.appendChild(li);
    });

    commentBox?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && currentUser) {
        e.preventDefault();
        const text = commentBox.value.trim();
        if (!text) return;
        comments.push({ text, username: currentUser.username });
        localStorage.setItem(commentKey, JSON.stringify(comments));
        displayJobs(allJobs);
      }
    });

    jobList.appendChild(card);
  });
}

filterInput?.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const filtered = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
  );
  displayJobs(filtered);
});

async function fetchJobs() {
  try {
    const res = await fetch("jobs.json");
    if (!res.ok) throw new Error("Xog lama helin");
    allJobs = await res.json();
    displayJobs(allJobs);
  } catch (e) {
    jobList.innerHTML = "<p>Shaqooyin lama helin waqtigan.</p>";
  }
}

fetchJobs();
