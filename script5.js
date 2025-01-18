const shiftUp = (e) => {
  const currentDiv =
    e.target.closest(".reply-input-wrp") || e.target.closest(".comment-wrp");
  const parentDiv =
    e.target.closest(".replies") || e.target.closest(".comment-container");
  let childrenDiv = parentDiv.children;
  let activeDiv;
  for (const div of childrenDiv) {
    if (div == currentDiv) {
      activeDiv = div;
      break;
    }
  }

  const activeDivScore = parseInt(
    activeDiv.querySelector(".score").textContent
  );
  for (let i = 0; i < childrenDiv.length - 1; i++) {
    const childrenDivScore = parseInt(
      childrenDiv[i].querySelector(".score").textContent
    );
    if (childrenDiv[i] === activeDiv || activeDivScore === childrenDivScore)
      break;
    if (activeDivScore > childrenDivScore) {
      parentDiv.insertBefore(activeDiv, childrenDiv[i]);
      break;
    }
  }
};

const shiftDown = (e) => {
  const currentDiv =
    e.target.closest(".reply-input-wrp") || e.target.closest(".comment-wrp");
  const parentDiv =
    e.target.closest(".replies") || e.target.closest(".comment-container");
  const childrenDiv = parentDiv.children;
  let activeDiv;
  for (const div of childrenDiv) {
    if (div == currentDiv) {
      activeDiv = div;
      break;
    }
  }

  const activeDivScore = parseInt(
    activeDiv.querySelector(".score").textContent
  );
  for (let i = childrenDiv.length - 1; i >= 0; i--) {
    const childrenDivScore = parseInt(
      childrenDiv[i].querySelector(".score").textContent
    );
    if (childrenDiv[i] === activeDiv || activeDivScore === childrenDivScore)
      break;
    if (activeDivScore < childrenDivScore) {
      parentDiv.insertBefore(activeDiv, childrenDiv[i + 1]);
      break;
    }
  }
};

window.addEventListener("resize", flex);

const users = (getUsers) => {
  console.log("1");
  document.querySelector(".avatars").addEventListener("dblclick", () => {
    // document.querySelector(".avatars span").styles.display = "block";
    console.log("2");
    document.querySelectorAll(".comment-flex").forEach((input) => {
      input.remove();
    });
    Array.from(document.querySelector(".avatars").children).forEach((e) => {
      e.dataset.user = true;
    });
    Array.from(document.querySelector(".avatars").children).forEach((e) => {
      e.onclick = (event) => {
        // console.log(e);
        const user = getUsers.find((user) => user.id == e.id);
        localStorage.currentUser = JSON.stringify(user);
        Array.from(document.querySelector(".avatars").children).forEach(
          (el) => {
            if (el.id === JSON.parse(localStorage.currentUser).id) {
              el.dataset.user = "true";
            } else {
              el.dataset.user = "false";
            }
          }
        );
        D_E_R();
        // event.stopPropagation();
      };
    });
  });
};
