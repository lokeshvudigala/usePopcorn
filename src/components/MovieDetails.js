import { useEffect, useState } from "react";
import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StarRating from "./StarRating";

const KEY = "4a0bd481";

export default function MovieDetails({
  movieId,
  watched,
  onCloseMovie,
  onAddMovieToWatchedList,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(null);

  useKey("Escape", onCloseMovie);

  const isWatched = watched.some((m) => m.imdbID === movieId);
  const watchedMovieUserRating = watched.find(
    (m) => m.imdbID === movieId
  )?.userRating;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: movieId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ")[0]),
      userRating,
    };
    onAddMovieToWatchedList(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    onSetRating={setUserRating}
                    size={24}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedMovieUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
