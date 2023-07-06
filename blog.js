//items are fetched from session storage
let savedArticle = JSON.parse(sessionStorage.getItem("savedArticle")) || [];

// empty global variables will be used to store each article object and previous comments
let savedCo = [];
let contactDetails = [];

// all html tags required to update site
let saveButton = document.getElementsByClassName("save-button");
let alertBox = document.querySelector(".alert");
let alertBoxTwo = document.getElementById("alertTwo");
let savedComments = document.getElementById("saved-comments");
let commentSubmit = document.getElementById("comment-submit");
let commTotal = document.getElementById("comm-total");
let likeBtn = document.getElementsByClassName("like-button");

/*myLoad function
 using hasCodeRunBefore key to confirm if page has been loaded before
*/

function myLoad() {
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    sessionStorage.setItem("comment", JSON.stringify(savedCo)); // initilising previous comments
    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    savedCo = JSON.parse(sessionStorage.getItem("comment"));
    likeBtn[0].classList.toggle(sessionStorage.getItem("likes")); // recovering like button status
    // previous comments are appended to html tag below//
    for (let i = 0; i < savedCo.length; i++) {
      let preComments = document.createElement("p");
      preComments.innerHTML = `GUEST: ${savedCo[i]}`;
      savedComments.appendChild(preComments);
      commTotal.innerHTML = JSON.parse(
        sessionStorage.getItem("comment")
      ).length;
    }
  }
}

function submitComment() {
  let comment = document.getElementById("commentInput").value;
  if (comment === "") {
    message = "Invalid input";
    displayAlert(message); //empty comments result in an alert
  } else {
    //to display a new comment, I have created an element and appended to savedComments section
    let commentDisplay = document.createElement("p");
    commentDisplay.innerHTML = `GUEST: ${comment}`;
    savedComments.appendChild(commentDisplay);

    // comments are stored in an array an the array is stored in sessionStorage
    savedCo.push(comment);
    sessionStorage.setItem("comment", JSON.stringify(savedCo));
    //total comments are based on the length of saved comments array
    commTotal.innerHTML = JSON.parse(sessionStorage.getItem("comment")).length;
  }
  //below line of code clears comment input area after submitting comments
  document.getElementById("commentInput").value = "";
}

/*Like button function
each like button has a function that toggles liked button class
*/

for (let i = 0; i < likeBtn.length; i++) {
  likeBtn[i].addEventListener("click", function () {
    likeBtn[i].classList.toggle("liked");
    sessionStorage.setItem("likes", "liked");
  });
}

// constructor function to help capture user's details in contact us form

function Contact(fullName, email, feedback) {
  this.fullName = fullName;
  this.email = email;
  this.feedback = feedback;
}

/* users contact details/feedback form will be stored as an object
 */

function addDetails(message) {
  {
    let newContact = new Contact(
      document.getElementById("fullName").value,
      document.getElementById("emailAdress").value,
      document.getElementById("feedback").value
    );

    contactDetails.push(newContact);
    sessionStorage.setItem("contacts", JSON.stringify(contactDetails));
    message = `Thank you for your feedback ${newContact.fullName}`;
    detailsConfirm(message);
  }
}

// Below function will confirm feedback is received

function detailsConfirm(message) {
  alertBoxTwo.innerText = message;
  alertBoxTwo.style.display = "block";
  setTimeout(function () {
    alertBoxTwo.style.display = "none";
  }, 3000);
  //form field is cleared below
  (document.getElementById("fullName").value = ""),
    (document.getElementById("emailAdress").value = ""),
    (document.getElementById("feedback").value = "");
}

/*displayAlert function
below function will assist with displaying alerts after user submits info
*/

function displayAlert(message) {
  alertBox.innerText = message;
  alertBox.style.display = "block";
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3000);
}

/*Save for later function
A new constructor function will be used to store article elements for the save-later page
*/

function SavedItem(title, aLink) {
  this.title = title;
  this.aLink = aLink;
}

for (let i = 0; i < saveButton.length; i++) {
  saveButton[i].addEventListener("click", function (e) {
    e.target.disabled = true;
    item = new SavedItem(
      e.target.parentElement.childNodes[5].innerText, //use of event objects to create class object values
      e.target.parentElement.childNodes[5].href
    );
    //item is stored in global array
    savedArticle.push(item);

    //global array stored in session storage
    sessionStorage.setItem("savedArticle", JSON.stringify(savedArticle));
    //number of saved articles will be displayed in a pop up message using displayAlert function
    message = `You have ${
      JSON.parse(sessionStorage.getItem("savedArticle")).length
    } Saved Articles`;
    displayAlert(message);
  });
}
