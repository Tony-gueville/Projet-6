fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(data => {
  const galleryDiv = document.querySelector(".gallery");
  data.forEach(work => {
    const imgElement = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    imgElement.src = work.imageUrl;
    figCaption.textContent = work.title;
    imgElement.alt = work.title;
    const figure = document.createElement("figure");
    figure.appendChild(imgElement);
    figure.appendChild(figCaption);
    galleryDiv.appendChild(figure);
  });
})
.catch(error => console.error(error));


fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));