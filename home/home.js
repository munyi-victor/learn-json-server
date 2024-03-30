document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserId = sessionStorage.getItem("loggedInUserId");
  const loggedInUsername = sessionStorage.getItem("loggedInUsername");
  const loggedInFullname = sessionStorage.getItem("loggedInFullname");

  if (!loggedInUserId || !loggedInUsername) {
    window.location.href = "../auth/login.html";
  }

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
