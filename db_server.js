const URL = "http://localhost:3000/movies"
export default class DbServer {
    getMovies(URL) {
        if (this.moviesList) {
            return Promise.resolve(this.moviesList);
        }
        const moviesList = fetch(URL).then((data) => data.json());

        moviesList.then((movies) => (this.moviesList = movies));
        return moviesList;
    }
 

}

