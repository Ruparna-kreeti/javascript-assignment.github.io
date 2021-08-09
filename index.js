/* Functions and variables for the index file */

/* Things which are done : */
/*---------------------------------------------------------------------------------------------------
 User validation:-valid name with atleast 3 characters in firstname and 3characters in last name
                  -age to be atleast 18
                  -email to be unique
  Age calculation when date is given
  A table where we can see the users and can delete them
  Search user by email where the user can be searched
  User status which shows total users,male users,female users
  Checking github dp by username which is built with jquery
  -------------------------------------------------------------------------------------------------- */

/* this variable stores the user datas */
var users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dob: new Date("12/12/1999").toISOString().split("T")[0],
    age: 22,
    gender: "male",
    bloodGroup: "A-",
    email: "john@example.com",
  },
];

/*add the existing users to the table when loading window */
window.onload = function setTable() {
  var table = "";

  users.forEach((user) => {
    table += `<tr id="row${user.id}">`;
    table += `<td>${user.id}</td>`;
    table += `<td>${user.firstName}</td>`;
    table += `<td>${user.lastName}</td>`;
    table += `<td>${user.dob}</td>`;
    table += `<td>${user.age}</td>`;
    table += `<td>${user.gender}</td>`;
    table += `<td>${user.bloodGroup}</td>`;
    table += `<td>${user.email}</td>`;
    table += `<td onclick="deleteRow(${user.id})"><button>Delete Record</button></td>`;
    table += `</tr>`;
  });
  document.getElementById("table-body").innerHTML = table;
  status();
};

/*This function adds the age when date is given in the form */
function AddAgeInForm(event) {
  var dob = document.getElementById("dob").value;
  var age = AgeCalculation(dob);
  document.getElementById("answer-for-age").innerHTML = age;
}

/*This function adds user to users variable */
function AddUser() {
  //taking values from form element
  var id = users.length + 1;
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var dob = document.getElementById("dob").value;
  var age = AgeCalculation(dob);
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var bloodGroup = document.getElementById("blood-group").value;
  var email = document.getElementById("email").value;

  //if values are valid,then pushed to users variable and append them to table
  if (UserValidation(firstName, lastName, age, email)) {
    users.push({
      id: id,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      age: age,
      gender: gender,
      bloodGroup: bloodGroup,
      email: email,
    });
    var table = "";
    table += `<tr id="row${id}">`;
    table += `<td>${id}</td>`;
    table += `<td>${firstName}</td>`;
    table += `<td>${lastName}</td>`;
    table += `<td>${dob}</td>`;
    table += `<td>${age}</td>`;
    table += `<td>${gender}</td>`;
    table += `<td>${bloodGroup}</td>`;
    table += `<td>${email}</td>`;
    table += `<td onclick="deleteRow(${id})"><button>Delete Record</button></td>`;
    table += "</tr>";
    document
      .getElementById("table-body")
      .insertAdjacentHTML("beforeend", table);
  }
  status();
}

/*This function calculates age from date of birth */
function AgeCalculation(dob) {
  return new Date(Date.now()).getFullYear() - new Date(dob).getFullYear();
}

/*This function validates the inputs given by the user */
function UserValidation(firstName, lastName, age, email) {
  var name_regex = /^[a-zA-Z]{3,}$/;
  if (!(name_regex.test(firstName) && name_regex.test(lastName))) {
    alert("Check your name");
    return false;
  }
  if (age < 18) {
    alert("Age must be atleast 18");
    return false;
  }
  var exists = users.some((user) => user.email == email);
  if (exists) {
    alert("email exists");
    return false;
  }
  return true;
}

/*This function searches the user by name */
function searchUser() {
  var email = document.getElementById("search-email").value;
  user = users.find(function (user, index) {
    if (user.email == email) return user;
  });
  document.getElementById(
    "searched-name"
  ).innerHTML = `Name:${user.firstName} ${user.lastName}`;
  document.getElementById("searched-dob").innerHTML = `Birthdate: ${user.dob}`;
  document.getElementById(
    "searched-gender"
  ).innerHTML = `Gender:${user.gender}`;
  document.getElementById("searched-age").innerHTML = `Age:${user.age}`;
  document.getElementById(
    "searched-dob"
  ).innerHTML = `Blood-Group:${user.bloodGroup}`;
}

/*This function deletes users */
function deleteRow(e) {
  users = users.filter((user) => user.id !== e);
  document.getElementById("row" + e).remove();
  status();
}

/*This function givees the status of the users */
function status() {
  var totalUsers = users.length,
    maleUsers = 0,
    femaleUsers = 0;
  users.forEach(function (user) {
    user.gender == "male" ? maleUsers++ : femaleUsers++;
  });
  document.getElementById(
    "total-users"
  ).innerHTML = `Total number of users:${totalUsers}`;
  document.getElementById("male-users").innerHTML = `Male users:${maleUsers}`;
  document.getElementById(
    "female-users"
  ).innerHTML = `Female users:${femaleUsers}`;
}

/* Using jquery to get output */

/* This Jquery function accepts the username and adds src attribute of github dp to the image */
$(document).ready(function (e) {
  $("#github-dp").hide();
  $("#sform").on("submit", function () {
    var userName = $("#username").val();
    $.get(`https://api.github.com/users/${userName}`, function (data) {
      $("#github-dp").attr("src", `${data.avatar_url}`);
    }).done($("#github-dp").show());
  });
});
