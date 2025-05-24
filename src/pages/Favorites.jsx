import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const {favorite} = useMovieContext();
    if(favorite) {
        return (
            <div className="favorites">
                <h2>Favorites</h2>
                <div className="movies-grid">
                    {favorite.map((movie) => {
                        return <MovieCard movie={movie} key={movie.id} />;
                    })}
                </div>
            </div>
        )
    }
    return <div className="favorites-empty">
        <h2>No Favorite favorites Yet</h2>
        <p>Start adding movies to your favorites to be displayed here</p>
    </div>
}

export default Favorites