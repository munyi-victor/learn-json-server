document.getElementById("user-login").addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`http://localhost:3000/users?username=${username}&password=${password}`).then(response => response.json()).then(users => {
    if (users.length > 0) {
      const loggedInUser = users[0];
      console.log('Login successful: ', loggedInUser);

      localStorage.setItem("loggedInUserId", loggedInUser.id);

      window.location.href = "../home/home.html";
    } else {
      console.error("Invalid username or password");
    }
  }).catch(error => console.error('Error during login:', error));
});