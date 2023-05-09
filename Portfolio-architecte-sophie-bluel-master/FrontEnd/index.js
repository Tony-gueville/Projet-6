const worksDiv = document.querySelector(".gallery");

// Récupérer les données depuis l'API
let categories = [];
let works = [];

fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(data => {
    categories = data;
    updateWorksDisplay();
    createCategoryButtons();
  });

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    works = data;
    updateWorksDisplay();
  });

// Mettre à jour l'affichage des travaux en fonction de la catégorie sélectionnée
function updateWorksDisplay(categoryId = null) {
  // Vider la div "works"
  worksDiv.innerHTML = "";

  // Parcourir le tableau "works" pour récupérer les travaux correspondant à la catégorie sélectionnée
  const filteredWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works;

  // Créer un élément d'image pour chaque travail correspondant et l'ajouter à la div "works"
  for (const work of filteredWorks) {
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

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





