import { useEffect, useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Skeleton from "../components/ui/Skeleton";

const Leaderboard = () => {
  const [matches, setMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/matches"
        );
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

  const leaderboard = useMemo(() => {
    const playerMap = {};

    matches.forEach((match) => {
      if (filter !== "all" && match.type !== filter) return;

      match.players.forEach((player) => {
        if (!playerMap[player.name]) {
          playerMap[player.name] = {
            name: player.name,
            totalRuns: 0,
            matchesPlayed: 0,
            testMatches: 0,
            oversMatches: 0,
          };
        }

        playerMap[player.name].totalRuns += player.runs;
        playerMap[player.name].matchesPlayed += 1;

        if (match.type === "test")
          playerMap[player.name].testMatches += 1;

        if (match.type === "overs")
          playerMap[player.name].oversMatches += 1;
      });
    });

    return Object.values(playerMap)
      .filter((player) =>
        player.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => b.totalRuns - a.totalRuns);
  }, [matches, filter, search]);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-xl font-semibold">
          Leaderboard
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Filter */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
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

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gray-100 border border-gray-100 rounded-t-xl px-4 py-3 text-xs font-medium text-gray-600 grid grid-cols-4">
        <span>Player</span>
        <span className="text-right">Runs</span>
        <span className="text-right">Matches</span>
        <span className="text-right">Type</span>
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 px-4 py-3"
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-10 ml-auto" />
              <Skeleton className="h-4 w-10 ml-auto" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && leaderboard.length === 0 && (
        <div className="text-center py-16">
          <SearchX
            size={36}
            className="mx-auto text-gray-300 mb-4"
          />
          <p className="text-sm text-gray-500">
            No players found.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && leaderboard.length > 0 && (
        <div className="border border-gray-100 rounded-b-xl divide-y divide-gray-100">
          {leaderboard.map((player, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 px-4 py-3 text-sm ${
                index % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50"
              }`}
            >
              <span className="font-medium truncate">
                {player.name}
              </span>

              <span className="text-right text-orange-500 font-medium">
                {player.totalRuns}
              </span>

              <span className="text-right text-gray-600">
                {player.matchesPlayed}
              </span>

              <span className="text-right text-gray-500 text-xs">
                T:{player.testMatches} | O:
                {player.oversMatches}
              </span>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Leaderboard;