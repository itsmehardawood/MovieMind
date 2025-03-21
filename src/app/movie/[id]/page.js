export default async function MovieDetail({ params }) {
    const { id } = await params;

    if (!id) return <p className="text-center text-red-500">Invalid Movie ID</p>;

    try {
        const [movieRes, creditsRes, similarRes] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),
            fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
        ]);

        if (!movieRes.ok || !creditsRes.ok || !similarRes.ok) throw new Error("Failed to fetch movie details");

        const movie = await movieRes.json();
        const credits = await creditsRes.json();
        const similarMovies = await similarRes.json();

        // Extract Director & Writers
        const director = credits.crew.find(person => person.job === "Director");
        const writers = credits.crew.filter(person => person.job === "Writer" || person.job === "Screenplay");

        // Get Top 6 Cast Members
        const topCast = credits.cast.slice(0, 6);

        return (
            <div className="relative min-h-screen text-white">
                {/* Backdrop Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        filter: "brightness(50%)",
                    }}
                />

                <div className="relative z-10 p-6 max-w-4xl mx-auto">
                    {/* Movie Title & Rating */}
                    <h1 className="text-4xl font-bold mt-10">
                        {movie.title}
                        <span className="text-yellow-400 text-lg ml-3">
                            ⭐ {movie.vote_average.toFixed(1)}/10
                        </span>
                    </h1>

                    {/* Movie Overview */}
                    <p className="mt-2 text-lg text-gray-300">{movie.overview}</p>

                    {/* Poster */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="mt-6 rounded-lg shadow-lg"
                    />

                    {/* Director & Writers */}
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-bold text-blue-400">🎬 Director & Writers</h2>
                        {director && <p className="text-gray-300">Director: {director.name}</p>}
                        {writers.length > 0 && (
                            <p className="text-gray-300">Writers: {writers.map(w => w.name).join(", ")}</p>
                        )}
                    </div>

                    {/* Cast Section */}
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-xl font-bold text-blue-400">🎭 Main Cast</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {topCast.map(actor => (
                                <div key={actor.id} className="text-center">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                        alt={actor.name}
                                        className="rounded-full w-20 h-20 mx-auto object-cover border-2 border-gray-600"
                                    />
                                    <p className="mt-2 text-gray-300">{actor.name}</p>
                                    <p className="text-sm text-gray-400">as {actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Similar Movies Section */}
                    {similarMovies.results.length > 0 && (
                        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold text-blue-400">🎬 Similar Movies</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {similarMovies.results.slice(0, 6).map(movie => (
                                    <a
                                        key={movie.id}
                                        href={`/movie/${movie.id}`}
                                        className="text-center transition transform hover:scale-105"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                            className="rounded-lg shadow-lg"
                                        />
                                        <p className="mt-2 text-gray-300">{movie.title}</p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return <p className="text-center text-red-500">{error.message}</p>;
    }
}
