document
  .getElementById("user-registration")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const profPic = "";

    var id = 1;
    var uid = id++;

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, username, password, fullname, profPic }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful: ", data);

        window.location.href = "login.html";
      })
      .catch((error) => console.error("Error during registration:", error));
  });
