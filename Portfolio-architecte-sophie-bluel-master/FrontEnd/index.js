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
  buttonsDiv.appendChild(allCategoryButton);

  // Ajouter l'écouteur d'événements au bouton "Tous"
  allCategoryButton.addEventListener("click", () => {
    updateWorksDisplay(null);
  });

  // Ajouter les boutons de catégorie
  for (const category of categories) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.setAttribute("data-category-id", category.id);
    buttonsDiv.appendChild(button);

    // Ajouter l'écouteur d'événements au bouton de catégorie
    button.addEventListener("click", () => {
      const categoryId = category.id;
      updateWorksDisplay(categoryId);
    });
  }
}


// const worksDiv = document.querySelector(".gallery");

// // Récupérer les données depuis l'API

// const getCategories = () => fetch("http://localhost:5678/api/categories").then(response => response.json());
// const getWorks = () => fetch("http://localhost:5678/api/works").then(response => response.json());

// Promise.all([getCategories(), getWorks()])
//   .then(([categoriesData, worksData]) => {
//     categories = categoriesData;
//     works = worksData;
//     updateWorksDisplay();
//     createCategoryButtons();
//   });

// // Mettre à jour l'affichage des travaux en fonction de la catégorie sélectionnée
// const updateWorksDisplay = (categoryId = null) => {
//   // Vider la div "works"
//   worksDiv.innerHTML = "";

//   // Parcourir le tableau "works" pour récupérer les travaux correspondant à la catégorie sélectionnée
//   const filteredWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works;

//   // Créer un élément d'image pour chaque travail correspondant et l'ajouter à la div "works"
//   for (const work of filteredWorks) {
//     const img = document.createElement("img");
//     img.src = work.imageUrl;
//     img.alt = work.title;

//     // Créer un élément de légende pour le titre et l'ajouter à la div "works"
//     const caption = document.createElement("figcaption");
//     caption.textContent = work.title;

//     // Créer un élément de figure et y ajouter l'image et la légende, puis l'ajouter à la div "works"
//     const figure = document.createElement("figure");
//     figure.appendChild(img);
//     figure.appendChild(caption);
//     worksDiv.appendChild(figure);
//   }
// };

// // Créer un élément de bouton pour chaque catégorie et l'ajouter au div de boutons
// const createCategoryButtons = () => {
//   const buttonsDiv = document.querySelector("#buttons");

//   // Ajouter le bouton "Tous"
//   const allCategoryButton = document.createElement("button");
//   allCategoryButton.textContent = "Tous";
//   allCategoryButton.dataset.categoryId = null;
//   buttonsDiv.appendChild(allCategoryButton);

//   // Ajouter l'écouteur d'événements au bouton "Tous"
//   allCategoryButton.addEventListener("click", () => {
//     updateWorksDisplay(null);
//   });

//   // Ajouter les boutons de catégorie
//   for (const { id, name } of categories) {
//     const button = document.createElement("button");
//     button.textContent = name;
//     button.dataset.categoryId = id;
//     buttonsDiv.appendChild(button);

//     // Ajouter l'écouteur d'événements au bouton de catégorie
//     button.addEventListener("click", () => {
//       updateWorksDisplay(id);
//     });
//   }
// };
