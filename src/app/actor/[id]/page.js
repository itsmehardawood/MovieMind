export default async function ActorDetail({ params }) {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${params.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const actor = await res.json();
  
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold">{actor.name}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} className="rounded-lg mt-4" />
        <p className="mt-4 text-lg">{actor.biography}</p>
      </div>
    );
  }
  