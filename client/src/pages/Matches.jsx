import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileX } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Skeleton from "../components/ui/Skeleton";

const Matches = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/api/matches");
        const data = await res.json();
        setMatches(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filtered =
    filter === "all"
      ? matches
      : matches.filter((m) => m.type === filter);

  return (
    <AppLayout>
      <div className="mb-10">
        <h1 className="text-xl font-semibold">Matches</h1>
      </div>

      {/* Filter */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
        {["all", "test", "overs"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`flex-1 py-2 text-sm rounded-lg transition ${
              filter === type
                ? "bg-white shadow text-orange-500 font-medium"
                : "text-gray-600"
            }`}
          >
            {type === "all"
              ? "All"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4"
            >
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <FileX size={36} className="mx-auto text-gray-300 mb-4" />
          <p className="text-sm text-gray-500">
            No matches found.
          </p>
        </div>
      )}

      {/* Matches List */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-6">
          {filtered.map((match) => {
            const top = match.rankings[0];

            return (
              <div
                key={match._id}
                onClick={() =>
                  navigate(`/matches/${match._id}`)
                }
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex justify-between mb-2">
                  <h2 className="text-sm font-semibold">
                    {match.name}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {new Date(
                      match.date
                    ).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4 uppercase">
                  {match.type}
                </p>

                <div className="flex justify-between text-sm">
                  <span>Top Performer</span>
                  <span className="text-orange-500 font-medium">
                    {top.name} ({top.runs}
                    {top.notOut ? "*" : ""})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppLayout>
  );
};

export default Matches;