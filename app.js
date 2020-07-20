const DOM = {};

async function getUsers() {
  if (DOM.init) return;
  try {
    let usersData = await fetch("https://randomuser.me/api/?results=50");
    let usersContent = await usersData.json();
    let finalContent = usersContent.results.filter((u) => u.name);
    DOM.init = $("#mainContent");
    DOM.init.append(drawHeaders(), getUserContent(finalContent));
  } catch (err) {
    alert("Oooops something goes wrong");
  }
}

function getUserContent(users) {
  let key;
  for (key in users) {
    let firstName = users[key].name.first;
    let lastName = users[key].name.last;
    let userGender = users[key].gender;
    let userPhoto = users[key].picture.thumbnail;
    draw(firstName, lastName, userGender, userPhoto);
  }
}

function draw(first, last, gender, photo) {
  let mainTbody = $("#tBody");
  let tdFirstName = $("<td/>");
  let trLayout = $("<tr/>");
  let tdLastName = $("<td/>");
  let tdGender = $("<td/>");
  let tdPhoto = $("<img/>", {
    src: photo,
  });
  tdFirstName.text(first);
  tdLastName.text(last);
  tdGender.text(gender);
  mainTbody.append(trLayout);
  trLayout.append(tdFirstName);
  trLayout.append(tdLastName);
  trLayout.append(tdGender);
  trLayout.append(tdPhoto);
}

function drawHeaders() {
  let thRow = $("#tHead");
  let trLayoutHeaders = $("<tr/>");
  let thFirstName = $("<th/>", {
    text: "First Name",
  });
  let thLastName = $("<th/>", {
    text: "Last Name",
  });
  let thGender = $("<th/>", {
    text: "Gender",
  });
  let thPhoto = $("<th/>", {
    text: "Photo",
  });
  thRow.append(trLayoutHeaders);
  trLayoutHeaders.append(thFirstName);
  trLayoutHeaders.append(thLastName);
  trLayoutHeaders.append(thGender);
  trLayoutHeaders.append(thPhoto);
}

(function getList() {
  $("#getUsersList").on("click", getUsers);
  $("#reset").on("click", () => {
    window.location.reload();
  });
})();
