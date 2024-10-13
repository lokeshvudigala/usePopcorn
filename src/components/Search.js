import { useRef } from "react";
import { useKey } from "../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputRef = useRef(null);
  useKey("Enter", () => {
    if (document.activeElement === inputRef.current) return;
    setQuery("");
    inputRef.current.focus();
  });

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
