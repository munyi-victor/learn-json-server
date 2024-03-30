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
          "profile-name"
        ).innerHTML = `${user.fullname}`;

        document.getElementById("profile-username").innerHTML = `${user.username}`;
        
        if (user.profPic.length > 0) {
          document.getElementById("preview").src = user.profPic;
        } else {
          document.getElementById("prof").innerHTML = user.fullname[0];
        }
      } else {
        document.getElementById("errorMessage").innerHTML = `User not found`;
      }
    })
    .catch((error) => console.error("Error fetching user data:", error));
});

function uploadPic() {
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];

  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var imageData = e.target.result;
      saveToServer(imageData);
    };
  } else {
    alert("Please select a file");
  }

  document.getElementById("editProf").style.display = "none";
  document.getElementById("editProfBtn").style.display = "flex";
}


function editProfBtn() {
  document.getElementById("editProf").style.display = "flex";
  document.getElementById("editProfBtn").style.display = "none";
}

async function saveToServer(imageData) {
  try {
    const loggedInUserId = sessionStorage.getItem("loggedInUserId");

    const response = await fetch(
      `http://localhost:3000/users/${loggedInUserId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profPic: imageData }),
      }
    )
    
    if (response.ok) {
      console.log("Profile picture updated successfully!");
    } else {
      console.error("Failed to update profile picture");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}