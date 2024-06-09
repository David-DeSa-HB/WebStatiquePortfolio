// Fonction pour charger le fichier XML avec fetch
async function loadXMLDoc(filename) {
  try {
    let response = await fetch(filename);
    let data = await response.text();
    let parser = new DOMParser();
    return parser.parseFromString(data, "text/xml");
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour créer la query header et footer

function initHTML() {
  const script = document.createElement("script");
  script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
  document.getElementsByTagName("head")[0].appendChild(script);
}

initHTML();

// Charger et afficher les projets au chargement de la page

window.onload = function () {
  if (window.location.pathname.includes("realisations.html")) {
    loadXMLDoc("projets.xml")
      .then(displayProjects)
      .catch(function (error) {
        console.error(error);
      });
  }
  $("header.header").load("header.html");
  $("footer.footer").load("footer.html");
};

// Fonction pour afficher les projets

function displayProjects(xml) {
  const project_list = document.querySelector("#realisations-liste");
  project_list.className = "flex-col";

  const projects = xml.querySelectorAll("projet");

  projects.forEach((projet) => {
    var element = document.createElement("div");
    element.className = "realisations";

    var titre = document.createElement("h2");
    titre.textContent = projet.querySelector("titre").textContent;
    titre.className = "realisations kaushan-script-regular";

    var description = document.createElement("div");
    description.textContent = projet.querySelector("description").textContent;
    description.className = "realisations realisations-text";

    var lien = document.createElement("a");
    lien.textContent = projet.querySelector("lienVerbeux").textContent;
    lien.href = projet.querySelector("lien").textContent;
    lien.className = "realisations realisations-text";

    element.appendChild(titre);
    element.appendChild(description);
    element.appendChild(lien);
    project_list.append(element);
  });
}
