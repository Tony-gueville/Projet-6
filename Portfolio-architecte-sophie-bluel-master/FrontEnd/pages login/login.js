document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var data = { email: email, password: password };

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        } else {
          throw new Error("Erreur lors de la connexion");
        }
      })
      .then((data) => {
        var token = data.token;
        localStorage.setItem("token", data.token);
        window.location.href = "../index.html";
        // console.log(data.token)
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        );
      });
  });
