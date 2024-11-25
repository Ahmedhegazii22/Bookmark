var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkUrl");
var submitBtn = document.getElementById("submitBtn");
var website = document.querySelector(" .website");

var closeBtn = document.getElementById("closeBtn");
var bookmarkList = [];
var layer = document.getElementById("layer");

if (localStorage.getItem("websites") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("websites"));
  displayWebsite();
}

submitBtn.addEventListener("click", function () {
  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    bookmarkUrlInput.classList.contains("is-valid")
  ){
    addWebsite();
  }
else{
    layer.classList.remove("d-none")
}
    
});

closeBtn.addEventListener("click", function () {
  layer.classList.add("d-none");
});
function addWebsite() {
  if (validationName()) {
    var bookmarks = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    bookmarkList.push(bookmarks);
    localStorage.setItem("websites", JSON.stringify(bookmarkList));
    displayWebsite();
    clearInputs();
  }
}
function displayWebsite() {
  var container = `  `;
  for (i = 0; i < bookmarkList.length; i++) {
    container += `
               <tr>
              <th scope="row">${i + 1}</th>
              <td>${bookmarkList[i].name}</td> 
                <td><button type="button" onclick="visit('${
                  bookmarkList[i].url
                }')" class="btn btn-success" id="visitBtn"><i class="fa-regular fa-eye"></i> Visit</button>
              </td>
              <td><button type="button" onclick="deleteBookmark(${i})" class="btn btn-danger" id="deleteBtn"><i class="fa-solid fa-trash-can"></i> Delete</button>
              </td>
            
            </tr>
              
              `;
    website.innerHTML = container;
  }
}

function clearInputs() {
  bookmarkNameInput.value = null;
  bookmarkUrlInput.value = null;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);

  localStorage.setItem("websites", JSON.stringify(bookmarkList));

  displayWebsite();
}

function visit(bookmarkUrlInput) {
  window.open(bookmarkUrlInput, "_blank");
}

bookmarkNameInput.addEventListener("keyup", function () {
  validationName();
});
bookmarkUrlInput.addEventListener("keyup", function () {
  validationUrl();
});

function validationName() {
  var regexName = /^[a-zA-Z0-9]{3,}$/;

  var test = bookmarkNameInput.value;

  if (regexName.test(test)) {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");

    return false;
  }
}

function validationUrl() {
  var regexUrl =
    /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

  var test = bookmarkUrlInput.value;

  if (regexUrl.test(test)) {
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
  } else {
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
  }
}
