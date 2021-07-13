import DbServer from "./db_server.js";
import createHtml from "./helpers/createHtml.js";
import createHtmlSearch from "./helpers/createHtmlSearch.js"

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


const listener = (pageId) => {
    document.querySelector('.latest_cartoons_container').innerHTML = '';
    moviesDb.getMovies(URL + `?_page=1&genres_like=Animation`).then(resp => {
        resp = resp.slice((pageId - 1) * 4, pageId * 4);
        resp.forEach((cartoon) => {
            createHtml(cartoon, '.latest_cartoons_container');
        });
    });
};

const getAllItemsCount = () => {
    return moviesDb.getMovies(URL + "?genres_like=Animation").then(resp => {
        return resp.length;
    });
};

const drawPaging = async () => {
    let count = await getAllItemsCount();
    let totalPages = count / 4;
    const pagingContainer = document.getElementById('paging_container');
    for (let i = 1; i <= totalPages; i++) {
        const pagingItem = document.createElement("span");
        pagingItem.textContent = i;
        pagingItem.addEventListener("click", () => {
            listener(i);
        });
        pagingContainer.append(pagingItem);
    };
};

drawPaging();

const searchBar = document.querySelector("#searchBar")
const sectionBody = document.querySelector(".section_body")
const searchContainerResults = document.querySelector(".search_container_results")

searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        let value = e.target.value
        fetch(`http://localhost:3000/movies/?title_like=${value}`)
            .then(resp => {
                return resp.json();
            })
            .then(data => {
                searchContainerResults.style.display = "block";
                sectionBody.style.display = "none";
                data.forEach((element) => {
                    createHtmlSearch(element, ".search_container_results");

                });
        }).then(() => {
            e.target.value = ''
        })
    };
    return new Error("Movie Not found Try again");
});

