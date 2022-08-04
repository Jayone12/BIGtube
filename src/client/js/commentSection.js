import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const removeBtn = document.querySelectorAll(".commentRemoveBtn");

const videoId = videoContainer.dataset.id;

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = text;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.addEventListener("click", handleRemove);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}

const handleRemove = async (event) => {
  event.preventDefault();
  const commentId = event.target.parentNode.dataset.id;
  await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
  });
  event.target.parentNode.remove();
};

removeBtn.forEach((remove) => remove.addEventListener("click", handleRemove));
