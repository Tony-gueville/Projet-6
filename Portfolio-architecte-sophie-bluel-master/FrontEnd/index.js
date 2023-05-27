const worksDiv = document.querySelector(".gallery");
let categories = [];
let works = [];

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    categories = data;
    updateWorksDisplay();
    createCategoryButtons();
  });

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    works = data;
    updateWorksDisplay();
  });
  

// Mettre à jour l'affichage des travaux en fonction de la catégorie sélectionnée
function updateWorksDisplay(categoryId = null) {
  // Vider la div "works"
  worksDiv.innerHTML = "";

  // Parcourir le tableau "works" pour récupérer les travaux correspondant à la catégorie sélectionnée
  const filteredWorks = categoryId
    ? works.filter((work) => work.categoryId === categoryId)
    : works;

  // Créer un élément d'image pour chaque travail correspondant et l'ajouter à la div "works"
  for (const work of filteredWorks) {
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    img.id = work.id;
    // console.log(img);

    // Créer un élément de légende pour le titre et l'ajouter à la div "works"
    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    // Créer un élément de figure et y ajouter l'image et la légende, puis l'ajouter à la div "works"
    const figure = document.createElement("figure");
    figure.appendChild(img);
    figure.appendChild(caption);
    worksDiv.appendChild(figure);
  }
}
// Créer un élément de bouton pour chaque catégorie et l'ajouter au div de boutons
function createCategoryButtons() {
  const buttonsDiv = document.querySelector("#buttons");

  // Ajouter le bouton "Tous"
  const allCategoryButton = document.createElement("button");
  allCategoryButton.textContent = "Tous";
  allCategoryButton.setAttribute("data-category-id", null);
  allCategoryButton.classList.add("category-button");
  allCategoryButton.classList.add("category-button-active"); // Ajouter la classe "active" par défaut
  buttonsDiv.appendChild(allCategoryButton);

  // Ajouter l'écouteur d'événements au bouton "Tous"
  allCategoryButton.addEventListener("click", () => {
    updateWorksDisplay(null);
    setActiveButton(allCategoryButton);
  });

  // Ajouter les boutons de catégorie
  for (const category of categories) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.setAttribute("data-category-id", category.id);
    button.classList.add("category-button");
    buttonsDiv.appendChild(button);

    // Ajouter l'écouteur d'événements au bouton de catégorie
    button.addEventListener("click", () => {
      const categoryId = category.id;
      updateWorksDisplay(categoryId);
      setActiveButton(button);
    });
  }
}

// Fonction pour gérer l'ajout et la suppression de la classe "category-button-active"
function setActiveButton(activeButton) {
  const buttons = document.querySelectorAll(".category-button");

  for (const button of buttons) {
    if (button === activeButton) {
      button.classList.add("category-button-active");
    } else {
      button.classList.remove("category-button-active");
    }
  }
}
// Récupération des éléments à afficher/masquer
const editBar = document.querySelector(".edit-bar");
const editIntroduction = document.querySelector(".edit-introduction");
const R = document.querySelector(".R");
const loginListItem = document.querySelector("nav ul li:nth-child(3)");

const loginLink = loginListItem.querySelector("a");

// Vérification de la présence du jeton dans le localStorage
const token = localStorage.getItem("token");
const boutonfiltre = document.getElementById("buttons");

if (token) {
  // Si le jeton est présent, afficher les éléments
  boutonfiltre.style.display = "none";
  editBar.style.display = "flex";
  editIntroduction.style.display = "block";
  R.style.display = "block";
  loginLink.textContent = "Log out";
} else {
  // Sinon, masquer les éléments
  editBar.style.display = "none";
  editIntroduction.style.display = "none";
  R.style.display = "none";
  loginLink.textContent = "Login";
}

loginLink.addEventListener("click", () => {
  // Suppression du jeton du localStorage
  localStorage.removeItem("token");

  // Rechargement de la page principale
  location.href = "./index.html";
});

// -------------modal--------------

// Récupération des éléments HTML pertinents
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");
const closeButton2 = document.querySelector(".close2");

const openButton = document.querySelector(".R");

const addImg = document.getElementById('add-img');
const elementHide = document.querySelector('.modal-images');
const modalShow = document.querySelector('.testclose');
const inputModal = document.querySelector('.modal-content');
const modalclose2 = document.querySelector('.modal-close2');
const iconeRetour = document.getElementById('icone-retour');

iconeRetour.addEventListener('click', function() {
  hideModal(); // Exécute hideModal() en premier
  showModal(); // Exécute showModal() ensuite
});

addImg.addEventListener('click',  ()=>{
  elementHide.style.display = 'none';
  modalShow.style.display = 'none';
  inputModal.style.display ='block';
  modalclose2.style.display ='flex';
});

// Fonction pour afficher la modale
function showModal() {
  modalOverlay.classList.remove("hidden");

  elementHide.innerHTML = ""; // Réinitialise le contenu de la div "modal-images"
  
  // Parcourir les images de la div "gallery" et les cloner dans la div "modal-images" avec un figcaption
  const galleryImages = document.querySelectorAll(".gallery img");
 
  for (let i = 0; i < galleryImages.length; i++) {
    const image = galleryImages[i];
    
    const container = document.createElement("div");
    container.classList.add("image-container");
    const clonedImage = image.cloneNode(true);
    container.appendChild(clonedImage);
  
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = "Éditer";
    container.appendChild(figcaption);
  
    const trashIcon = document.createElement("i");

    trashIcon.setAttribute("ImageID",image.getAttribute("id") );
    trashIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
    container.appendChild(trashIcon);
  
    // Ajouter une deuxième icône uniquement à la première image
    if (i === 0) {
      const secondIcon = document.createElement("i");
      secondIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right", "second-icon");
      container.appendChild(secondIcon);
    }
  
    elementHide.appendChild(container);
    trashIcon.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const imageId = trashIcon.getAttribute("ImageID");
      
      fetch(`http://localhost:5678/api/works/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.ok) {
          // Suppression réussie, effectuez ici les actions nécessaires (rafraîchissement de la galerie, etc.)
          console.log("Image supprimée avec succès");
        } else {
          // Gestion des erreurs en cas d'échec de la suppression
          console.error("Erreur lors de la suppression de l'image");
        }
      })
      .catch(error => {
        // Gestion des erreurs de la requête
        console.error("Erreur de la requête de suppression", error);
      });
    }); 
  }  
}
const deleteButton = document.getElementById("deleteImage");
deleteButton.addEventListener("click",event => {
  event.preventDefault();
  event.stopPropagation();
  const imageContainers = document.querySelectorAll(".image-container");
  
  imageContainers.forEach(container => {
    const trashIcon = container.querySelector(".delete-icon");
    const imageId = trashIcon.getAttribute("ImageID");
     
    fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.ok) {
        // container.remove();
        console.log("Image supprimée avec succès");
      } else {
        console.error("Erreur lors de la suppression de l'image");
      }
    })
    .catch(error => {
      console.error("Erreur de la requête de suppression", error);
    });
  });
});




// Fonction pour cacher la modale
function hideModal() {
  elementHide.style.display = 'flex';
  modalShow.style.display ='block';
  inputModal.style.display ='none';
  modalclose2.style.display ='none';
  modalOverlay.classList.add("hidden");
  
  // Supprimer l'élément de l'image du conteneur
  const imageElement = imageContainer.querySelector('img');
  if (imageElement) {
    imageElement.remove();
  }
}

// Écouteur d'événement pour ouvrir la modale lorsque l'utilisateur clique sur le bouton d'ouverture
openButton.addEventListener("click", showModal);

// Écouteur d'événement pour fermer la modale lorsque l'utilisateur clique sur le bouton de fermeture
closeButton.addEventListener("click", hideModal);
closeButton2.addEventListener("click", hideModal);
// Écouteur d'événement pour fermer la modale lorsque l'utilisateur clique en dehors de la modale
modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    hideModal();
  }
});
document.getElementById("photo-button").addEventListener("click", function() {
  document.getElementById("photo-input").click();
});

const photoInput = document.getElementById('photo-input');
const imageContainer = document.getElementById('image-container');

photoInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const imageUrl = e.target.result;
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageContainer.appendChild(imageElement);
    };

    reader.readAsDataURL(file);
  }
});


  // ---------


  const titreInput = document.getElementById('titre');
  const categorieSelect = document.getElementById('categorie');
  const photoInputes = document.getElementById('photo-input');
  const validerButton = document.querySelector('.modal-button');
  
  validerButton.addEventListener('click', () => {
    const categoryId = categorieSelect.value;
    const file = photoInputes.files[0];
  
    // Vérifier la taille du fichier
    if (file && file.size > 4194304) {
      console.error('La taille de l\'image dépasse la limite de 4 Mo');
  
      // Colorer en rouge le span
      const spanElement = document.querySelector('#photo-input ~ span');
      if (spanElement) {
        spanElement.style.background = 'red';
  
        // Ajouter l'animation de wizz
        spanElement.classList.add('wizz-animation');
  
        // Rétablir la couleur et supprimer l'animation après 5 secondes
        setTimeout(() => {
          spanElement.style.background = ''; // Utilise une chaîne vide pour rétablir la couleur par défaut
          spanElement.classList.remove('wizz-animation');
        }, 2000);
  
        // Supprimer l'image en prévisualisation
        const imageElement = imageContainer.querySelector('img');
        if (imageElement) {
          imageElement.remove();
        }
      }
  
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', titreInput.value);
    formData.append('category', categoryId);
  
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        // Traiter la réponse de l'API ici
      })
      .catch(error => {
        console.error('Une erreur s\'est produite:', error);
      });
  });
  