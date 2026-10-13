let data = JSON.parse(localStorage.getItem("problems")) || [];

let container = document.getElementById("problemsContainer");

data.forEach(p => {
  let card = document.createElement("div");
  card.className = "card";

  let content = document.createElement("div");
  content.className = "content";

  let img = document.createElement("img");
  img.src = p.image || "";

  let name = document.createElement("h3");
  name.textContent = "Name:" +p.name;

  let area = document.createElement("p");
  area.textContent = "Area: " + p.area;

  let type = document.createElement("p");
  type.textContent = "Type: " + p.type;

  let details = document.createElement("p");
  details.textContent = "Details"+p.details;

  content.appendChild(name);
  content.appendChild(area);
  content.appendChild(type);
  content.appendChild(details);

  if (p.location) {
    let link = document.createElement("a");
    link.href = p.location;
    link.textContent = "View Location";
    link.target = "_blank";
    content.appendChild(link);
  }

  card.appendChild(content);
  card.appendChild(img);

  container.appendChild(card);
});