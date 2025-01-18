const Create = (comment, container, temp, comments) => {
  const { content, createdAt, score, user, replyingTo } = comment;
console.log(comment);
  let created = (new Date() - createdAt) / 1000;

  temp.querySelector(".score").textContent = score;
  temp.querySelector(".avatar").src = user.image.png;
  temp.querySelector(".username").textContent = user.username;
  temp.querySelector(".date").textContent = "Just now";
  temp.querySelector(".c-text").textContent = content;
  if (temp.querySelector(".replyTo"))
    temp.querySelector(".replyTo").textContent = `@${replyingTo}`;

  container.append(temp);

  document.querySelectorAll(".delete-input").forEach((deleteButton) => {
    deleteButton.onclick = (event) => {
      document.getElementById("dialog").style.display = "block";

      document.getElementById("cancelBtn").onclick = () => {
        document.getElementById("dialog").style.display = "none";
      };

      document.getElementById("deleteBtn").onclick = () => {
        Delete(event, comments);
        document.getElementById("dialog").style.display = "none";
      };
    };
  });

  document.querySelectorAll(".edit-input").forEach((editButton) => {
    editButton.onclick = ({ target }) => {
      Edit(target, comments);
    };
  });

  incrementDecrement(comments);

  flex();
};
