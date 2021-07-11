import DbServer from "./db_server.js";
import createHtml from "./helpers/createHtml.js";

const URL = "http://localhost:3000/movies";

const moviesDb = new DbServer();
moviesDb.getMovies(URL + "?_page=1&_limit=4").then(resp => {
    resp.forEach((element) => {
        createHtml(element, '.movies_container');
    });
});

moviesDb.getMovies(URL + "?_page=1&_limit=4&year_gte=2017").then(resp => {
    resp.forEach((element) => {
        createHtml(element, '.latest_movies_container');
    });
});

moviesDb.getMovies(URL + "?_page=1&_limit=4&genres_like=Drama").then(resp => {
    resp.forEach((element) => {
        createHtml(element, '.latest_series_container');
    });
});

moviesDb.getMovies(URL + "?_page=1&genres_like=Animation").then(resp => {
    resp = resp.slice(0, 4);
    resp.forEach((cartoon) => {
        createHtml(cartoon, '.latest_cartoons_container');
    });
});


let listener = (pageId) => {
    document.querySelector('.latest_cartoons_container').innerHTML = '';
    moviesDb.getMovies(URL + `?_page=1&genres_like=Animation`).then(resp => {
        resp = resp.slice((pageId - 1) * 4, pageId * 4);
        resp.forEach((cartoon) => {
            createHtml(cartoon, '.latest_cartoons_container');
        });
    });
};

let getAllItemsCount = () => {
    return moviesDb.getMovies(URL + "?genres_like=Animation").then(resp => {
        return resp.length;
    });
};

let drawPaging = async () => {
    let count = await getAllItemsCount();
    let totalPages = count / 4;
    let pagingContainer = document.getElementById('paging_container');
    for (let i = 1; i <= totalPages; i++) {
        let pagingItem = document.createElement("span");
        pagingItem.textContent = i;
        pagingItem.addEventListener("click", () => {
            listener(i);
        });
        pagingContainer.append(pagingItem);
    };
};

drawPaging();

let searchBar = document.querySelector("#searchBar")
let sectionBody = document.querySelector(".section_body")
let searchContainerResults = document.querySelector(".search_container_results")

searchBar.addEventListener('keyup', (e) => {
    let value = e.target.value
    fetch(`http://localhost:3000/movies/?title_like=${value}`)
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            searchContainerResults.style.display = "block";
            sectionBody.style.display = "none";
            data.forEach((element) => {
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
                searchContainerResults.append(movieCard);
            });

        });
});
