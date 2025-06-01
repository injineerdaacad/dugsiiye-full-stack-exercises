const form = document.getElementById("form-id");
const titleInput = document.getElementById("post-title");
const imgUrlInput = document.getElementById("img-url");
const contentInput = document.getElementById("post-content");
const postList = document.getElementById("post");

document.addEventListener("DOMContentLoaded", loadPosts);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const imgUrl = imgUrlInput.value.trim();
  const content = contentInput.value.trim();

  if (title === "" || content === "") {
    alert("Title-ka iyo Content-iga waa khasab!");
    return;
  }

  if (isDuplicateTitle(title)) {
    alert("Title-kan hore ayuu u jiraa, dooro mid kale.");
    return;
  }

  const post = {
    id: Date.now(),
    title,
    imgUrl,
    content,
  };

  savePostToLocal(post);
  addPostToDOM(post);

  form.reset();
});

function loadPosts() {
  const posts = getPostsFromLocal();
  posts.forEach((post) => addPostToDOM(post));
}

function addPostToDOM(post) {
  const li = document.createElement("li");
  li.dataset.id = post.id;

  let imgHtml = "";
  if (post.imgUrl) {
    imgHtml = `<img src="${post.imgUrl}" alt="Post Image" class="post-image">`;
  }

  li.innerHTML = `
    <h2>${post.title}</h2>
    ${imgHtml}
    <p>${post.content}</p>
    <button class="btn edit-btn">Edit</button>
    <button class="btn delete-btn">Delete</button>
  `;

  postList.appendChild(li);

  li.querySelector(".edit-btn").addEventListener("click", () =>
    editPost(post.id, li)
  );

  li.querySelector(".delete-btn").addEventListener("click", () =>
    deletePost(post.id, li)
  );
}

function editPost(id, li) {
  const posts = getPostsFromLocal();
  const post = posts.find((p) => p.id == id);

  const newTitle = prompt("Edit Title:", post.title);
  if (!newTitle || newTitle.trim() === "") return;

  if (newTitle !== post.title && isDuplicateTitle(newTitle)) {
    alert("Title-kan hore ayuu u jiraa!");
    return;
  }

  const newImgUrl = prompt("Edit Image URL (optional):", post.imgUrl);

  const newContent = prompt("Edit Content:", post.content);
  if (!newContent || newContent.trim() === "") return;

  post.title = newTitle.trim();
  post.imgUrl = newImgUrl ? newImgUrl.trim() : "";
  post.content = newContent.trim();

  localStorage.setItem("posts", JSON.stringify(posts));

  li.querySelector("h2").textContent = post.title;
  li.querySelector("p").textContent = post.content;

  const img = li.querySelector("img");
  if (post.imgUrl) {
    if (img) {
      img.src = post.imgUrl;
    } else {
      const newImg = document.createElement("img");
      newImg.src = post.imgUrl;
      newImg.alt = "Post Image";
      newImg.className = "post-image";
      li.insertBefore(newImg, li.querySelector("p"));
    }
  } else if (img) {
    img.remove();
  }
}

function deletePost(id, li) {
  let posts = getPostsFromLocal();
  posts = posts.filter((p) => p.id != id);
  localStorage.setItem("posts", JSON.stringify(posts));
  li.remove();
}

function savePostToLocal(post) {
  const posts = getPostsFromLocal();
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function getPostsFromLocal() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function isDuplicateTitle(title) {
  const posts = getPostsFromLocal();
  return posts.some((post) => post.title.toLowerCase() === title.toLowerCase());
}
