/*Below function will be called onload of save-later page
session storage values will be used to create a new anchor tag attributes
the anchor tag is then appeneded to div tag in the save-later page
*/

function getSave() {
  let savedItems = JSON.parse(sessionStorage.getItem("savedArticle"));
  let savedAmount = document.getElementById("saved-amount");
  savedAmount.innerHTML = savedItems.length; //value of savedItems.length will be displayed in save-later page to show amount of articles saved
  for (let i = 0; i < savedItems.length; i++) {
    const item = savedItems[i];

    let savedTitle = item.title;
    let savedArticle = item.aLink;

    let newATag = document.createElement("a");
    newATag.setAttribute("href", savedArticle);
    newATag.classList.add("saved-title");
    newATag.innerText = savedTitle;

    let savedDiv = document.getElementById("saved-items");
    savedDiv.append(newATag);
  }
}

/*I was guided by mentor, Chad, in understanding that the above function has to be called in a seperate page
the values for the anchor tag had to be created prior to creating the anchor tag in order to append successfully*/
