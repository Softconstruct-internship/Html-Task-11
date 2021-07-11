export default function createHtmlSearch(element, sectionName) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie_card";

    const imgCard = document.createElement("div");
    imgCard.className = "img_card";

    const image = document.createElement("img");
    image.className = "img";
    image.src = element.posterurl;
    imgCard.append(image);
    movieCard.append(imgCard);

    const infoMovie = document.createElement("div");
    infoMovie.className = "info_movie";

    const filmTitle = document.createElement("h2");
    filmTitle.className = "film_title";
    filmTitle.textContent = element.title;

    const filmActorsName = document.createElement("span");
    filmActorsName.className = "film_actors_name";
    filmActorsName.textContent = element.actors;

    const filmActors = document.createElement("span");
    filmActors.className = "film_actors";
    filmActors.textContent = "Actors - ";

    infoMovie.prepend(filmActorsName);
    infoMovie.prepend(filmActors);

    const storyLine = document.createElement("p");
    storyLine.className = "story_line";
    storyLine.textContent = element.storyline;

    infoMovie.prepend(storyLine);

    infoMovie.prepend(filmActorsName);
    infoMovie.prepend(filmActors);

    infoMovie.prepend(filmTitle);
    movieCard.append(infoMovie);

    document.querySelector(sectionName).append(movieCard);
}