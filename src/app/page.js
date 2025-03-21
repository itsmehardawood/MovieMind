"use client";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const placeholderImage = "https://via.placeholder.com/200";

  // Fetch movies
  const fetchMovies = useCallback(async (query = "", genreId = "") => {
    try {
      let endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

      if (query) {
        endpoint = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
      } else if (genreId) {
        endpoint = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
      }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Reset movies on error
    }
  }, []);

  // Initial fetch on component mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Search handler with debounce to reduce API calls
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 2 || query === "") {
      fetchMovies(query);
    }
  };

  return (
    <div className="min-h-screen w-full  bg-gray-900 text-white p-6">
      <h1
        className="text-5xl font-extrabold text-center my-6 
               bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 
               text-transparent bg-clip-text flicker"
      >
        🎥 The Ultimate Movie Explorer – MovieMind 🎬
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg"
      />

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-400">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <a
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
