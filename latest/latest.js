document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (!loggedInUserId) {
    window.location.href = "../auth/login.html";
  }
  
  fetch(`http://localhost:3000/users/${loggedInUserId}`)
    .then((response) => response.json())
    .then((user) => {
      if (user) {
        if (user.profPic.length > 0) {
          document.getElementById("preview").src = user.profPic;
        } else {
          document.getElementById("profile").innerHTML = `${user.fullname[0]}`;
        }
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
});
