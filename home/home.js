document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (loggedInUserId === null) {  
    window.location.href = "../auth/login.html";
  }

  const users = fetch("http://localhost:3000/users").then(response => response.json())
  console.log(users)


  fetch(`http://localhost:3000/users/${loggedInUserId}`)
    .then((response) => response.json())
    .then((user) => {
      if (user) {
        document.getElementById(
          "welcomeMessage"
        ).innerHTML = `Welcome, ${user.fullname}!`;

        if (user.profPic.length > 0) {
          document.getElementById("preview").src = user.profPic;
        } else {
          document.getElementById("profile").innerHTML = `${user.fullname[0]}`;
        }
      } else {
        document.getElementById("errorMessage").innerHTML = `User not found`;
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
});