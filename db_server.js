const URL = "http://localhost:3000/movies"
export default class DbServer {
    async getMovies(URL) {
        // const response = await fetch(URL + "?_page=1&_limit=4");
        // const moviesList = await response.json();
        // return moviesList


        if (this.moviesList) {
            return Promise.resolve(this.moviesList);
        }
        const moviesList = fetch(URL).then((data) => data.json());

        moviesList.then((movies) => (this.moviesList = movies));
        return moviesList;
    }


}

