import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MoviesList from "./components/MoviesList";
import MovieDetails from "./components/MovieDetails";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";


export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorage("watchedMovies", []);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((prevSelectedMovie) =>
      prevSelectedMovie === id ? null : id
    );
  };

  const handleCloseMovie = () => setSelectedMovieId(null);

  const handleAddMovieToWatchedList = (movie) => {
    setWatched((prevWatchedMovies) => [...prevWatchedMovies, movie]);
  };

  const handleRemoveMovieFromWatchedList = (movieId) => {
    setWatched((prevWatchedMovies) =>
      prevWatchedMovies.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              movieId={selectedMovieId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddMovieToWatchedList={handleAddMovieToWatchedList}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveMovieFromWatchedList={handleRemoveMovieFromWatchedList}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
