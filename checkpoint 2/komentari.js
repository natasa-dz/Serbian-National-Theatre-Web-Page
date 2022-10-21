const commentSection = document.getElementById("comment-section");
const textArea = document.getElementById("text-area");
const addBtn = document.getElementById("add");

addBtn.onclick = () => {
  if (!textArea.value.trim()) {
    textArea.value = "";
    alert("Molimo Vas unesite Vas komentar!");
  } else {
    add(commentSection, textArea);
  }
};

const add = (parent, reference) => {
  const newCommentSection = document.createElement("div");
  newCommentSection.setAttribute("class", "new-comment-section");
  parent.appendChild(newCommentSection);
  const newComment = document.createElement("textarea");
  newCommentSection.appendChild(newComment);

  newComment.setAttribute("class", "new-comment");
  newComment.innerHTML = reference.value;

  // replybutton
  const commentReply = document.createElement("button");
  commentReply.innerHTML = "Reply";
  newCommentSection.appendChild(commentReply);

  reply(newCommentSection, commentReply);

  /*like button
  const like = document.createElement("span");
  newCommentSection.appendChild(like);
  const CommentLike = document.createElement("button");
  CommentLike.innerHTML = "Like";
  newCommentSection.appendChild(CommentLike);
  let counter = 0;
  CommentLike.addEventListener("click", () => {
    counter += 1;
    like.innerHTML = counter;
  });*/

  /* delete button
  const CommentDelete = document.createElement("button");
  CommentDelete.innerHTML = "Delete";
  newCommentSection.appendChild(CommentDelete);
  CommentDelete.onclick = () => {
    parent.remove();
  };*/

  reference.value = "";
};

const reply = (parent, button) => {
  button.onclick = () => {
    const childCommentSection = document.createElement("div");
    childCommentSection.setAttribute("class", "child-comment-section");
    parent.appendChild(childCommentSection);

    const newTextArea = document.createElement("textarea");
    newTextArea.setAttribute("class", "new-text-area");
    newTextArea.setAttribute("placeholder", "Unesite Vas reply");
    childCommentSection.appendChild(newTextArea);

    const childAdd = document.createElement("button");
    childAdd.innerHTML = "Add";
    childCommentSection.appendChild(childAdd);

    childAdd.onclick = () => {
      if (!newTextArea.value.trim()) {
        newTextArea.value = "";
        alert("Please Enter Your Comment!!");
      } else {
        newTextArea.remove();
        childAdd.remove();
        cancel.remove();
        add(childCommentSection, newTextArea);
      }
    };

    const cancel = document.createElement("button");
    cancel.innerHTML = "Cancel";
    childCommentSection.appendChild(cancel);
    cancel.onclick = () => {
      childCommentSection.remove();
    };
  };
};