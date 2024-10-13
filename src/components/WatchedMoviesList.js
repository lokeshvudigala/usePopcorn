import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({
  watched,
  onRemoveMovieFromWatchedList,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveMovieFromWatchedList={onRemoveMovieFromWatchedList}
        />
      ))}
    </ul>
  );
}
