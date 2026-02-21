import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const MatchDetail = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/matches/${id}`
        );
        const data = await res.json();
        setMatch(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <p className="text-sm text-gray-500">Loading...</p>
      </AppLayout>
    );
  }

  if (!match) {
    return (
      <AppLayout>
        <p className="text-sm text-gray-500">Match not found</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-10">
        <h1 className="text-xl font-semibold">
          {match.name}
        </h1>

        <p className="text-sm text-gray-500 mt-2 uppercase">
          {match.type}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {new Date(match.date).toLocaleString()}
        </p>
      </div>

      {/* Rankings */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mb-8">
        <h2 className="font-semibold mb-6">Rankings</h2>

        <div className="space-y-4">
          {match.rankings.map((player, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 pb-2"
            >
              <span>
                {index + 1}. {player.name}
              </span>
              <span className="text-orange-500 font-medium">
                {player.runs}
                {player.notOut && "*"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Batting Order */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <h2 className="font-semibold mb-6">Batting Order</h2>

        <div className="space-y-3">
          {match.players.map((player, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 pb-2"
            >
              <span>
                {index + 1}. {player.name}
              </span>
              <span>
                {player.runs}
                {player.notOut && "*"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default MatchDetail;