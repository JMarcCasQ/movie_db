import { createContext, useState, useContext, useEffect } from "react"

const movieContext = createContext()

export const useMovieContext = () => useContext(movieContext)

export const MovieProvider = ({children}) => {
    const [favorite, setFavorite] = useState([])
    useEffect(() => {
        const storedFaves = localStorage.getItem("favorites")

        if(storedFaves) setFavorite(JSON.parse(storedFaves))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorite))
    }, [favorite])

    const addToFavorites = (movie) => {
        setFavorite(prev => {
            if (prev.some(m => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };


    const removeFromFavorites = (movieId) => {
        setFavorite(f => f.filter(movie => movie.id !== movieId));
    }


    const isFavorites = (movieId) => {
        return favorite.some(movie => movie.id === movieId)
    }

    const value = {
        favorite,
        addToFavorites,
        removeFromFavorites,
        isFavorites
    }

    return <movieContext.Provider value={value}>
        {children}
    </movieContext.Provider>
}