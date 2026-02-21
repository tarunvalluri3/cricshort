import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  Trophy,
  History,
  ArrowRight,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";

const Home = () => {
  const navigate = useNavigate();
  const [lastMatch, setLastMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastMatch = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/matches"
        );
        const data = await res.json();

        if (data.data.length > 0) {
          setLastMatch(data.data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastMatch();
  }, []);

  return (
    <AppLayout>

      {/* HERO SECTION */}
      <div className="mb-14">
        <h1 className="text-2xl font-semibold mb-3">
          Manage Your Matches.
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Create, track and analyze cricket matches
          effortlessly with CricShort.
        </p>

        <Button onClick={() => navigate("/create")}>
          <div className="flex items-center justify-center gap-2">
            <PlusCircle size={18} />
            Create Match
          </div>
        </Button>
      </div>

      {/* LAST MATCH PREVIEW */}
      {!loading && lastMatch && (
        <div
          onClick={() =>
            navigate(`/matches/${lastMatch._id}`)
          }
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-12 cursor-pointer hover:shadow-lg transition"
        >
          <div className="flex items-center gap-2 mb-4">
            <History size={18} className="text-orange-500" />
            <h2 className="font-semibold text-sm">
              Last Match
            </h2>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              {lastMatch.name}
            </span>
            <span className="text-xs text-gray-500 uppercase">
              {lastMatch.type}
            </span>
          </div>

          <p className="text-xs text-gray-500 mb-4">
            {new Date(
              lastMatch.date
            ).toLocaleString()}
          </p>

          <div className="flex justify-between text-sm">
            <span>Top Performer</span>
            <span className="text-orange-500 font-medium">
              {lastMatch.rankings[0].name} (
              {lastMatch.rankings[0].runs}
              {lastMatch.rankings[0].notOut
                ? "*"
                : ""}
              )
            </span>
          </div>

          <div className="flex justify-end mt-4 text-xs text-gray-500 items-center gap-1">
            View Details
            <ArrowRight size={14} />
          </div>
        </div>
      )}

      {/* QUICK ACTIONS */}
      <div className="space-y-6">

        <div
          onClick={() => navigate("/matches")}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <History size={18} className="text-orange-500" />
            <span className="text-sm font-medium">
              View Matches
            </span>
          </div>

          <ArrowRight size={16} />
        </div>

        <div
          onClick={() => navigate("/leaderboard")}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 cursor-pointer hover:shadow-lg transition flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <Trophy size={18} className="text-orange-500" />
            <span className="text-sm font-medium">
              Leaderboard
            </span>
          </div>

          <ArrowRight size={16} />
        </div>

      </div>

    </AppLayout>
  );
};

export default Home;