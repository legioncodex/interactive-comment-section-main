fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    let myData=data
    const { currentUser, comments } = myData;
    UI(comments, currentUser);
  })
  // .catch((error) => console.log(error));

