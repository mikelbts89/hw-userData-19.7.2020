async function getUsers() {
    try {
        let usersData = await fetch("https://randomuser.me/api/?results=50");
        let usersContent = await usersData.json();
        let finalContent = usersContent.results.filter(u => u.name)
        getUserContent(finalContent);
    } catch (err) {
        alert(`message: ${err.statusText} , status: ${err.status}`);
    }
}
getUsers();

function getUserContent(users) {
    let key;
    for (key in users) {
        let firstName = users[key].name.first;
        let lastName = users[key].name.last;
        let userGender = users[key].gender;
        draw(firstName, lastName, userGender);
    }
}

function draw(first, last, gender) {
    let mainTbody = $("#tBody");
    let tdFirstName = $("<td/>");
    let trLayout = $("<tr/>");
    let tdLastName = $("<td/>");
    let tdGender = $("<td/>");
    tdFirstName.text(first);
    tdLastName.text(last);
    tdGender.text(gender);
    mainTbody.append(trLayout);
    trLayout.append(tdFirstName);
    trLayout.append(tdLastName);
    trLayout.append(tdGender);
}