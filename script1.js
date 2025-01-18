function commentObj(
  id,
  content,
  createdAt,
  img,
  name,
  replies = null,
  replyingTo = null
) {
  this.id = id;
  this.content = content;
  this.createdAt = createdAt;
  this.score = 0;
  this.user = {
    image: {
      png: img,
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: name,
  };
  this.replies = replies;
  this.replyingTo = replyingTo;
}

const commentContainer = document.querySelector(".comment-container");
const textArea = document.querySelectorAll("textarea");
textArea.forEach((input) => {
  input.addEventListener(
    "input",
    (e) => (e.target.style.height = e.target.scrollHeight + "px")
  );
});

const UI = (comments, currentUser) => {
  // const { id, content, createdAt, score, user, replies } = comments;
  const getUsers = [
    {
      id: "user1",
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "amyrobson",
    },
    {
      id: "user2",
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    {
      id: "user3",
      image: {
        png: "./images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "maxblagun",
    },
    {
      id: "user4",
      image: {
        png: "./images/avatars/image-ramsesmiron.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "ramsesmiron",
    },
  ];

  const storedComment = JSON.parse(localStorage.getItem("comment"));
  comments = storedComment || comments;

  Render(comments, currentUser, getUsers);

  incrementDecrement(comments);

  users(getUsers);

  document.querySelectorAll(".reply-input").forEach((replyButton) => {
    replyButton.addEventListener("click", (event) => {
      const replyInput = event.target.closest(".input-wrp");
      const temp = document
        .querySelector(".input-template")
        .content.cloneNode(true);
      if (!replyInput.querySelector(".comment-input")) {
        temp.querySelector("img").src = JSON.parse(
          localStorage.currentUser
        ).image.png;
        replyInput.append(temp);
        flex();

        const textArea = replyInput.querySelector("textarea");
        textArea.focus();

        const sendReply = (event) => {
          const commentText = textArea.value.trim();
          if (commentText) {
            const commentElement = replyInput.closest(".comment-wrp");
            const commentId = parseInt(commentElement.getAttribute("data-id"));
            const commentIndex = comments.findIndex(
              (comment) => comment.id === commentId
            );

            const repliedTo = event.target
              .closest(".input-wrp")
              .querySelector(".username").textContent;

            Reply(
              comments,
              textArea,
              repliedTo,
              replyInput.closest(".comment-wrp").querySelector(".replies"),
              commentIndex
            );

            replyInput.querySelector(".comment-input").remove();
          } else {
            alert("Comment cannot be empty");
          }
        };

        replyInput
          .querySelector(".send-reply")
          .addEventListener("click", (event) => {
            sendReply(event);
          });

        textArea.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            sendReply(event);
          }
        });
      } else {
        replyInput.querySelector(".comment-input").remove();
      }
    });
  });

  document.querySelectorAll(".delete-input").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      document.getElementById("dialog").style.display = "block";

      document
        .getElementById("cancelBtn")
        .addEventListener("click", function () {
          document.getElementById("dialog").style.display = "none";
        });

      document
        .getElementById("deleteBtn")
        .addEventListener("click", function () {
          Delete(event, comments);
          document.getElementById("dialog").style.display = "none";
        });
    });
  });

  document.querySelectorAll(".edit-input").forEach((editButton) => {
    editButton.addEventListener("click", ({ target }) => {
      Edit(target, comments);
    });
  });

  document.querySelector(".send").addEventListener("click", sendComment);

  const textarea = document.querySelector(".comment-input-wrp2 textarea");
  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendComment();
    }
  });

  function sendComment() {
    const commentText = textarea.value.trim();
    if (commentText) {
      Comment(
        comments,
        textarea,
        currentUser,
        document.querySelector(".comment-container")
      );
    } else {
      alert("Comment cannot be empty");
    }

    document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
  }
};
