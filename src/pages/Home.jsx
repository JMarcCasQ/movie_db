import { useEffect, useState } from "react";
import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {

    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(true);
    
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                isLoading(false)
            }
        }
        loadPopularMovies()
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return
        isLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        }
        finally {
            isLoading(false)
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="" id="" placeholder="Search for movie..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">🔍</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading movies...</div>)
                : (
                    <div className="movies-grid">
                        {movies.map((movie) =>
                            (movie.title.toLowerCase().startsWith(searchQuery) || movie.release_date.startsWith(searchQuery)) && (
                                <MovieCard movie={movie} key={movie.id} />
                            )
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default Home