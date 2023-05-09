const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Empêche la soumission du formulaire par défaut
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
    try {
      const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // Stocke les données de connexion dans le local storage
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('token', data.token);
      // Redirige vers la page de profil de l'utilisateur
      window.location.href = '../index.html';
    } catch (error) {
      console.error(error);
    }
  } else {
    // Affiche un message d'erreur à l'utilisateur
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Email ou mot de passe incorrect';
    form.insertBefore(errorDiv, form.lastElementChild.nextSibling);
  }
});
