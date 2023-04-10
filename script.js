const users = [
    {username: "user1", password: "pass1", first_name: "John", last_name: "Doe"},
    {username: "user2", password: "pass2", first_name: "Jane", last_name: "Doe"}
  ];
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        if (response.exists) {
          document.getElementById("welcome-message").textContent = `Welcome, ${response.first_name} 
          ${response.last_name}!`;
        } else {
          alert("Sorry, you are not registered.");
        }
      }
    };
    xhr.open("POST", "check-user.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`username=${username}&password=${password}`);
  }
  
  document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    login();
  });