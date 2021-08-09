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
  Checking github dp by username using fetch and promises which also shows error message when given wrong user name
  -------------------------------------------------------------------------------------------------- */

/* this variable stores the user datas */
let users = [
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
window.onload = () => {
  let table = "";

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
const addAgeInForm = (event) => {
  let dob = document.getElementById("dob").value;
  let age = ageCalculation(dob);
  document.getElementById("answer-for-age").innerHTML = age;
};

/*This function adds user to users variable */
const addUser = (event) => {
  event.preventDefault();
  //taking values from form element
  let id = users.length + 1;
  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let dob = document.getElementById("dob").value;
  let age = ageCalculation(dob);
  let gender = document.querySelector('input[name="gender"]:checked').value;
  let bloodGroup = document.getElementById("blood-group").value;
  let email = document.getElementById("email").value;

  //if values are valid,then pushed to users variable and append them to table
  if (userValidation(firstName, lastName, age, email)) {
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
    let table = "";
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
};

/*This function calculates age from date of birth */
const ageCalculation = (dob) => {
  return new Date(Date.now()).getFullYear() - new Date(dob).getFullYear();
};

/*This function validates the inputs given by the user */
const userValidation = (firstName, lastName, age, email) => {
  let name_regex = /^[a-zA-Z]{3,}$/;
  if (!(name_regex.test(firstName) && name_regex.test(lastName))) {
    alert("Check your name");
    return false;
  }
  if (age < 18) {
    alert("Age must be atleast 18");
    return false;
  }
  let exists = users.some((user) => user.email == email);
  if (exists) {
    alert("email exists");
    return false;
  }
  return true;
};

/*This function searches the user by name */
const searchUser = (event) => {
  event.preventDefault();
  let email = document.getElementById("search-email").value;
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
};

/*This function deletes users */
const deleteRow = (e) => {
  users = users.filter((user) => user.id !== e);
  document.getElementById("row" + e).remove();
  status();
};

/*This function givees the status of the users */
const status = () => {
  let totalUsers = users.length,
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
};

/* **************************************************************************************
Using jquery to get output 

 This Jquery function accepts the username and adds src attribute of github dp to the image 
$(document).ready(function (e) {
  $("#github-dp").hide();
  $("#sform").on("submit", function () {
    let userName = $("#username").val();
    $.get(`https://api.github.com/users/${userName}`, function (data) {
      $("#github-dp").attr("src", `${data.avatar_url}`);
    }).done($("#github-dp").show());
  });
});
*****************************************************************************************/

/*Get dp of github from this function */
const getGithubDp = (event) => {
  event.preventDefault();
  let userName = document.getElementById("username").value;
  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Username not available");
      }
    })
    .then((response) => {
      document.getElementById("github-dp").src = response.avatar_url;
      document.getElementById("fail-message").innerHTML = "";
    })
    .catch((error) => {
      document.getElementById("fail-message").innerHTML = error;
      document.getElementById("github-dp").src = "";
    });
};
