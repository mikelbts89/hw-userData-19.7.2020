const DOM = {};

async function getUsers() {
  if (DOM.init) return;
  try {
    let usersData = await fetch("https://randomuser.me/api/?results=50");
    let usersContent = await usersData.json();
    const finalContent = usersContent.results.filter((u) => u.name);
    console.log(finalContent)
    DOM.init = $("#mainContent");
    DOM.init.append(drawHeaders(), getUserContent(finalContent), getGenderStatistic(finalContent), getCountryStatistic(finalContent));

  } catch (err) {
    alert("Oooops something goes wrong");
  }
}

function getCountryStatistic(country) {
  const getUsersCountrys = country.map(user => user.location.country)
  console.log(getUsersCountrys)

}

function getGenderStatistic(usersArr) {
  const usersGen = usersArr.map(user => user.gender)
  console.log(`Number of users : ${usersGen.length}`)
  const maleUsers = usersGen.filter(userMale => {
    return userMale === "male"
  })
  console.log(`Male users :  ${maleUsers.length}`)
  const femaleUsers = usersGen.filter(userFemale => {
    return userFemale === "female"
  })
  console.log(`Female users :  ${femaleUsers.length}`)
  getTableDraw(usersGen, femaleUsers, maleUsers)
}

function getTableDraw(num, female, male) {
  const statDiv = $("<div>")
  statDiv.addClass("statdiv")
  const h2Header = $("<h2>")
  h2Header.text("Statistic")
  const numberOFUsers = $("<h4>")
  const h4MaleUser = $("<h4>")
  const h4FemaleUser = $("<h4>")
  numberOFUsers.text(`Number of users : ${num.length}`)
  h4FemaleUser.text(`Female users :  ${female.length}`)
  h4MaleUser.text(`Male users :  ${male.length}`)
  $("#header").append(statDiv)
  statDiv.append(h2Header, numberOFUsers, h4FemaleUser, h4MaleUser)
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
  trLayout.append(tdFirstName, tdLastName, tdGender, tdPhoto);
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
  trLayoutHeaders.append(thFirstName, thLastName, thGender, thPhoto);
}

(function getList() {
  $("#getUsersList").on("click", getUsers);
  $("#reset").on("click", () => {
    window.location.reload();
  });
})();