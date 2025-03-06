const Render = (comment, currentUser, getUsers) => {
  comment.forEach((com) => {
    const { id, content, createdAt, score, user, replies } = com;

    const temp = document
      .querySelector(".comment-template")
      .content.cloneNode(true);
    temp.querySelector(".score").textContent = score;
    temp.querySelector(".avatar").src = user.image.png;
    temp.querySelector(".username").textContent = user.username;
    temp.querySelector(".date").textContent = time(createdAt);
    temp.querySelector(".c-text").textContent = content;

    const commentElement = temp.querySelector(".comment-wrp");
    commentElement.setAttribute("data-id", id);

    const repliesContainer = temp.querySelector(".replies");

    if (replies.length > 0) {
      repliesContainer.dataset.empty = false;
      replies.forEach((rep) => {
        const { id, content, createdAt, score, replyingTo, user } = rep;
        const replyTemp = document
          .querySelector(".replies-template")
          .content.cloneNode(true);
        replyTemp.querySelector(".score").textContent = score;
        replyTemp.querySelector(".username").textContent = user.username;
        replyTemp.querySelector(".avatar").src = user.image.png;
        replyTemp.querySelector(".date").textContent = time(createdAt);
        replyTemp.querySelector(".replyTo").textContent = `@${replyingTo}`;
        replyTemp.querySelector(".c-text").textContent = content;

        const commentElement = replyTemp.querySelector(".reply-input-wrp");
        commentElement.setAttribute("data-id", id);

        repliesContainer.appendChild(replyTemp);
      });
    } else {
      repliesContainer.dataset.empty = true;
    }
    document.querySelector(".comment-container").append(temp);
  });

  // Ensure that `localStorage.currentUser` is set correctly
if (!localStorage.currentUser) {
  localStorage.currentUser = JSON.stringify(getUsers[1]);
}

Array.from(document.querySelector(".avatars").children).forEach((e) => {
  if (e.id === JSON.parse(localStorage.currentUser).id) {
    e.dataset.user = "true";
  } else {
    e.dataset.user = "false";
  }
});


  D_E_R(currentUser);
  console.log(document.querySelector(".comment-container"));
  console.log(comment);

  flex();
};

const D_E_R = (currentUser) => {
  const der = document.querySelectorAll(".comment");
  der.forEach((d) => {
    const User = d.querySelector(".username").textContent;
    const Reply = d.querySelector(".reply-input");
    const Delete = d.querySelector(".delete-input");
    const Edit = d.querySelector(".edit-input");
    const you = d.querySelector(".you");

    if (User === JSON.parse(localStorage.currentUser).username) {
      // console.log(JSON.parse(localStorage.currentUser).username);
      Reply.classList.add("hidden");
      Delete.classList.remove("hidden");
      Edit.classList.remove("hidden");
      you.classList.remove("hidden");
    } else {
      Reply.classList.remove("hidden");
      Delete.classList.add("hidden");
      Edit.classList.add("hidden");
      you.classList.add("hidden");
    }
  });
};

const time = (createdAt) => {
  let create = Math.floor((new Date() - new Date(createdAt)) / 1000);
  if (create < 60) {
    return `${create} seconds ago`;
  } else if (create < 120) {
    return `${Math.floor(create / 60)} minute ago`;
  } else if (create < 3600) {
    return `${Math.floor(create / 60)} minutes ago`;
  } else if (create < 7200) {
    return `${Math.floor(create / 3600)} hour ago`;
  } else if (create < 86400) {
    return `${Math.floor(create / 3600)} hours ago`;
  } else if (create == 172800) {
    return `${Math.floor(create / 86400)} day ago`;
  } else if (create < 604800) {
    return `${Math.floor(create / 86400)} days ago`;
  } else if (create < 1209600) {
    return `${Math.floor(create / 604800)} week ago`;
  } else if (create < 2419200) {
    return `${Math.floor(create / 604800)} weeks ago`;
  } else if (create < 4838400) {
    return `${Math.floor(create / 2419200)} month ago`;
  } else if (create < 29030400) {
    return `${Math.floor(create / 2419200)} months ago`;
  } else if (create < 58060800) {
    return `${Math.floor(create / 29030400)} year ago`;
  } else if (create >= 58060800) {
    return `${Math.floor(create / 29030400)} years ago`;
  } else {
    return createdAt;
  }
};

const flex = () => {
  const thresholdWidth = 500;
  document.querySelectorAll(".input-wrp").forEach((input) => {
    let elementToAppend = input.querySelector(".responsive-div");
    if (!elementToAppend) {
      elementToAppend = document.createElement("div");
      elementToAppend.classList.add("responsive-div");
    }
    const scoreSection = input.querySelector(".score-section");
    const der = input.querySelector(".d-e-r");
    const comment = input.querySelector(".comment");
    const commentInfo = input.querySelector(".comment-info");

    if (window.innerWidth < thresholdWidth) {
      // elementToAppend.remove();
      if (!comment.contains(elementToAppend)) {
        comment.append(elementToAppend);
        elementToAppend.append(scoreSection);
        elementToAppend.append(der);
      }
    } else {
      if (!comment.contains(scoreSection) || !commentInfo.contains(der)) {
        comment.prepend(scoreSection);
        commentInfo.append(der);
        elementToAppend.remove();
      }
    }
  });

  document.querySelectorAll(".comment-flex").forEach((input) => {
    let element2ToAppend = input.querySelector(".responsive-div");
    if (!element2ToAppend) {
      element2ToAppend = document.createElement("div");
      element2ToAppend.classList.add("responsive-div");
    }
    const button = input.querySelector(".reply-cancel");
    const img = input.querySelector("img");
    if (window.innerWidth < thresholdWidth) {
      if (!input.contains(element2ToAppend)) {
        input.append(element2ToAppend);
        element2ToAppend.append(img);
        element2ToAppend.append(button);
      }
    } else {
      if (element2ToAppend.contains(img) || element2ToAppend.contains(button)) {
        input.prepend(img);
        input.append(button);
        element2ToAppend.remove();
      }
    }
  });

  document.querySelectorAll(".comment-flex1").forEach((input) => {
    let element2ToAppend = input.querySelector(".responsive-div");
    if (!element2ToAppend) {
      element2ToAppend = document.createElement("div");
      element2ToAppend.classList.add("responsive-div");
    }
    const button = input.querySelector("button");
    const img = input.querySelector(".avatars");
    if (window.innerWidth < thresholdWidth) {
      if (!input.contains(element2ToAppend)) {
        input.append(element2ToAppend);
        element2ToAppend.append(img);
        element2ToAppend.append(button);
      }
    } else {
      if (element2ToAppend.contains(img) || element2ToAppend.contains(button)) {
        input.prepend(img);
        input.append(button);
        element2ToAppend.remove();
      }
    }
  });
};
