import DbServer from "./db_server.js";
const URL = "http://localhost:3000/movies";


let moviesMainSection = document.querySelector(".movies_main_section")
let moviesContainer = document.querySelector(".movies_container")

function ratings(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return (sum / arr.length).toFixed()
}

function getDuration(str) {
    return str.slice(2, -1);
}
const moviesDb = new DbServer();
moviesDb.getMovies(URL + "?_page=1&_limit=4").then(moviesList => {
    moviesList.forEach((element) => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie_card";

        const imgCard = document.createElement("div");
        imgCard.className = "img_card";

        const image = document.createElement("img");
        image.className = "img";
        image.src = element.posterurl
        imgCard.append(image)
        movieCard.append(imgCard)

        const infoMovie = document.createElement("div")
        infoMovie.className = "info_movie"

        const filmTitle = document.createElement("h1")
        filmTitle.className = "film_title"
        filmTitle.textContent = element.title

        const movieDescriptions = document.createElement("div");
        movieDescriptions.className = "movie-descriptions"

        const movieRating = document.createElement("span");
        movieRating.className = "movie-rating";
        movieRating.textContent = ratings(element.ratings);

        const iRating = document.createElement("i");
        iRating.className = "fa fa-star";
        movieRating.prepend(iRating)

        const movieTime = document.createElement("span");
        movieTime.className = "movie-time";
        movieTime.textContent = getDuration(element.duration)

        const iTime = document.createElement("i");
        iTime.className = "fa fa-clock-o";
        movieTime.prepend(iTime)
        const movieQualit = document.createElement("span");
        movieQualit.className = "movie-qualit";
        movieQualit.textContent = "HD"

        const movieAge = document.createElement("span");
        movieAge.className = "movie-age";
        movieQualit.textContent = "16+"

        movieDescriptions.append(movieRating)
        movieDescriptions.append(movieTime)
        movieDescriptions.append(movieQualit)
        movieDescriptions.append(movieAge)
        infoMovie.append(movieDescriptions);

        infoMovie.prepend(filmTitle);
        movieCard.append(infoMovie);

        console.log(element.ratings)

        moviesContainer.append(movieCard)
        moviesMainSection.append(moviesContainer)
    })
})






