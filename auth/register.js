document.getElementById("user-registration").addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/users").then(response => response.json()).then(users => {
    const userId = users.length > 0 ? Math.max(...users.map(user => isSecureContext.id)) + 1 : 1;
    
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, username, password, fullname }),
    }).then(response => response.json()).then(data => {
      console.log("Registration successful: ", data);

      window.location.href = 'login.html';
    }).catch(error => console.error('Error during registration:', error))
  }).catch(error => console.error("Error fetching users: ", error));
});