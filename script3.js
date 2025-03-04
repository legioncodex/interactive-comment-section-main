const Comment = (comments, textarea, currentUser, container) => {
  const temp = document
    .querySelector(".comment-template")
    .content.cloneNode(true);

  const commentText = textarea.value.trim();

  const id = `${comments.length + 1}-${0}`;

  const newComment = new commentObj(
    id,
    commentText,
    new Date(),
    JSON.parse(localStorage.currentUser).image.png,
    JSON.parse(localStorage.currentUser).username,
    []
  );
  // console.log(newComment);
  comments.push(newComment);
  localStorage.setItem("comment", JSON.stringify(comments));

  const commentElement = temp.querySelector(".comment-wrp");
  commentElement.setAttribute("data-id", id);
  Create(newComment, container, temp, comments);
  commentElement.scrollIntoView({ behavior: "smooth", block: "end" });
  
  textarea.value = "";
  D_E_R(currentUser);

  const repliesContainer = commentElement.querySelector(".replies");
  if (newComment.replies.length > 0) {
    repliesContainer.dataset.empty = false;
  } else {
    repliesContainer.dataset.empty = true;
  }
};

const Reply = (comments, textarea, currentUser, container, commentId) => {
  const temp = document
    .querySelector(".replies-template")
    .content.cloneNode(true);

  const replyText = textarea.value.trim();
  const id = `${commentId + 1}-${comments[commentId].replies.length + 1}`;

  const newReply = new commentObj(
    id,
    replyText,
    new Date(),
    JSON.parse(localStorage.currentUser).image.png,
    JSON.parse(localStorage.currentUser).username,
    "",
    currentUser
  );
  comments[commentId].replies.push(newReply);
  localStorage.setItem("comment", JSON.stringify(comments));
  container.dataset.empty = false;

  const commentElement = temp.querySelector(".reply-input-wrp");
  commentElement.setAttribute("data-id", id);
  Create(newReply, container, temp, comments);
  commentElement.scrollIntoView({ behavior: "smooth", block: "end" });


  textarea.value = "";
  D_E_R(newReply.user.username);
};

const Delete = (event, comments) => {
  const commentElement =
    event.target.closest(".reply-input-wrp") ||
    event.target.closest(".comment-wrp");

  const commentId = commentElement.dataset.id;

  const parentComment = event.target.closest(".comment-wrp");
  const storedParentComment = comments.find(
    ({ id }) => id == parentComment.dataset.id
  );
  const storedParentCommentIndex = parseInt(
    comments.indexOf(storedParentComment)
  );
  if (storedParentComment.id != commentId) {
    let storedElement = storedParentComment.replies.find(
      ({ id }) => id == commentId
    );
    let storedElementIndex = parseInt(
      storedParentComment.replies.indexOf(storedElement)
    );
    comments[storedParentCommentIndex].replies.splice(storedElementIndex, 1);
  } else {
    comments.splice(storedParentCommentIndex, 1);
  }
  commentElement.remove();
  if (parentComment.querySelector(".replies").children.length === 0) {
    parentComment.querySelector(".replies").dataset.empty = true;
  }
  localStorage.setItem("comment", JSON.stringify(comments));
};

function findCommentIndex(comments, commentId) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      return { index: i, parent: null };
    }
    if (comments[i].replies) {
      const result = findCommentIndex(comments[i].replies, commentId);
      if (result) {
        return { index: result.index, parent: i };
      }
    }
  }
  return null;
}

const Edit = (target, comments) => {
  const commentText = target
    .closest(".input-wrp")
    .querySelector(".comment-text");
  const inputWrp = target.closest(".input-wrp");
  const replyToElement = inputWrp.querySelector(".replyTo");
  const replyTo = replyToElement ? replyToElement.textContent : "";
  let cText = target.closest(".input-wrp").querySelector(".c-text");
  const commentTextArea = document.createElement("textarea");
  const updateBtn = document.createElement("button");
  updateBtn.classList.add("update-input");
  updateBtn.textContent = "UPDATE";
  commentTextArea.value = `${replyTo} ${cText.textContent}`;
  const updateDiv = document.createElement("div");
  updateDiv.classList.add("update");
  updateDiv.append(commentTextArea);
  updateDiv.append(updateBtn);
  commentText.replaceWith(updateDiv);
  updateBtn.addEventListener("click", (e) => {
    Update(
      replyTo,
      comments,
      updateDiv,
      cText,
      commentTextArea,
      e,
      commentText
    );
  });
  commentTextArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      Update(
        replyTo,
        comments,
        updateDiv,
        cText,
        commentTextArea,
        event,
        commentText
      );
    }
  });
};
const Update = (
  replyTo,
  comments,
  updateDiv,
  cText,
  commentTextArea,
  e,
  commentText
) => {
  if (commentTextArea.value.trim()) {
    cText.textContent = commentTextArea.value.trim().replace(replyTo, "");
    const commentElement =
      e.target.closest(".reply-input-wrp") || e.target.closest(".comment-wrp");
    const commentId = commentElement.getAttribute("data-id");

    const parentComment = e.target.closest(".comment-wrp");
    const storedParentComment = comments.find(
      ({ id }) => id == parentComment.dataset.id
    );

    if (storedParentComment.id != commentId) {
      let storedElement = storedParentComment.replies.find(
        ({ id }) => id == commentId
      );
      storedElement.content = cText.textContent;
    } else {
      storedParentComment.content = cText.textContent;
    }
    localStorage.comment = JSON.stringify(comments);
    updateDiv.replaceWith(commentText);
  } else {
    updateDiv.replaceWith(commentText);
  }
};

const setScore = (event, score, comments) => {
  const scoreElement =
    event.target.closest(".reply-input-wrp") ||
    event.target.closest(".comment-wrp");
  const commentId = scoreElement.dataset.id;
  const parentComment = event.target.closest(".comment-wrp");
  const storedParentComment = comments.find(
    ({ id }) => id == parentComment.dataset.id
  );
  if (storedParentComment.id != commentId) {
    let storedElement = storedParentComment.replies.find(
      ({ id }) => id == commentId
    );
    storedElement.score = score;
  } else {
    storedParentComment.score = score;
  }
  comments.sort((a, b) => b.score - a.score);
  comments.forEach((comment) => {
    comment.replies.sort((a, b) => b.score - a.score);
  });
  localStorage.comment = JSON.stringify(comments);
};

const incrementDecrement = (comments) => {
  document.querySelectorAll(".increment-button").forEach((incrementButton) => {
    incrementButton.onclick = (e) => {
      const scoreSection = e.target.closest(".score-section");
      let scoreElement = scoreSection.querySelector(".score");
      let score = parseInt(scoreElement.textContent);
      score++;
      scoreElement.textContent = score;
      shiftUp(e);
      setScore(e, score, comments);
    };
  });

  document.querySelectorAll(".decrement-button").forEach((decrementButton) => {
    decrementButton.onclick = (e) => {
      const scoreSection = e.target.closest(".score-section");
      let scoreElement = scoreSection.querySelector(".score");
      let score = parseInt(scoreElement.textContent);
      if (score > 0) {
        score--;
      }
      scoreElement.textContent = score;
      shiftDown(e);
      setScore(e, score, comments);
    };
  });
};
