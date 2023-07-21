var siteName = document.getElementById("formGroupExampleInput");
var siteLink = document.getElementById("formGroupExampleInput2");
var btn = document.getElementById("submit");
var tableRow = document.getElementById("tableRow");
var dialog = document.getElementById("dialog");
var closeDialogBtn = document.getElementById("close-dialog");
var sitesList;
if (localStorage.getItem("sitesList")) {
  sitesList = JSON.parse(localStorage.getItem("sitesList"));
  display();
} else {
  sitesList = [];
}


btn.addEventListener("click", function () {
  if (nameValidation() && urlValidation()) {
    addSite();
    siteLink.classList.remove("is-valid");
    siteName.classList.remove("is-valid");
  } else {
    invalidInputs();
  }
});

function addSite() {
  var site = {
    sName: siteName.value,
    sUrl: siteLink.value,
  };
  sitesList.push(site);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
  display();
  clearInputs();
}

function display() {
  var content = "";
  for (var i = 0; i < sitesList.length; i++) {
    content += `
  <tr>
  <td>${i + 1}</td>
  <td>${sitesList[i].sName}</td>
  <td><a class="visit" href="${sitesList[i].sUrl}" target="_blank">Visit</a></td>
  <td><button class="delete" onclick="deleteSite(${i})">Delete</button></td>
</tr>
  `;
  }
  tableRow.innerHTML = content;
}
function clearInputs() {
  siteName.value = "";
  siteLink.value = "";
}
function deleteSite(i) {
  sitesList.splice(i, 1);
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
  display();
}
function nameValidation() {
  var siteNameRegex = /^[a-zA-Z]{3,}/gi;
  return siteNameRegex.test(siteName.value);
}
function urlValidation() {
  var siteUrlRegex = /^(https?:\/\/)?(www)?\.?[a-zA-Z]{2,}\..{2,}/gi;
  return siteUrlRegex.test(siteLink.value);
}

function notVaild() {
  console.log("erorr");
}

siteName.addEventListener("keyup", () => {
  if (nameValidation()) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  } else if (!nameValidation()) {
    siteName.classList.add("is-invalid");
  }
});

siteLink.addEventListener("keyup", () => {
  if (urlValidation()) {
    siteLink.classList.remove("is-invalid");
    siteLink.classList.add("is-valid");
  } else if (!urlValidation()) {
    siteLink.classList.add("is-invalid");
  }
});

function invalidInputs() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

