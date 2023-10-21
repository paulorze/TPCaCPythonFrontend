// Declaramos el ojebto correspondiente al contenedor HTML de las cards
const container = document.getElementById('trabajos__container')

// Declaramos la funcion correspondiente al constructor de las cards
const cardConstructor = (result) => {
    const imgURL = result.urls.small;
    const title = result.description || result.alt_description || "Trabajo";

    const card = document.createElement('div');
    card.setAttribute("class", "card");
    const card_top = document.createElement('div');
    card_top.setAttribute("class", "card__top");
    const img = document.createElement('img');
    img.setAttribute("src", imgURL);
    img.setAttribute("alt", title);
    card_top.appendChild(img);
    const card_bottom = document.createElement('div');
    card_bottom.setAttribute("class", "card__bottom");
    const img_title = document.createElement('p');
    img_title.innerText = title;
    card_bottom.appendChild(img_title);
    card.appendChild(card_top);
    card.appendChild(card_bottom);
    container.appendChild(card);
}

container.innerHTML = "";

const apiKey = "LDIKRH5S1BjwC4sCBuOGxwIM8FRM_aeu1-UgDBfZyQc";
const searchQuery = "construction site"
const apiUrl = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&client_id=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.results.forEach(result => {
            cardConstructor(result);
        });
    })
    .catch(error => console.error(error));