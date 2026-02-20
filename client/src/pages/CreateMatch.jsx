import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";

const CreateMatch = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [shuffledPlayers, setShuffledPlayers] = useState([]);
  const [matchType, setMatchType] = useState("test");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // --------------------------
  // Add Player (Validated)
  // --------------------------
  const addPlayer = () => {
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("Player name cannot be empty.");
      return;
    }

    if (trimmed.length > 30) {
      toast.error("Player name too long.");
      return;
    }

    const exists = players.some(
      (p) => p.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      toast.error("Duplicate player name.");
      return;
    }

    setPlayers([...players, trimmed]);
    setName("");
  };

  const removePlayer = (index) => {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
    setShuffledPlayers([]);
    setOrderConfirmed(false);
  };

  // --------------------------
  // Shuffle Logic
  // --------------------------
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleShuffle = () => {
    if (players.length < 2) {
      toast.error("Minimum 2 players required.");
      return;
    }

    const shuffled = shuffleArray(players);
    setShuffledPlayers(shuffled);
    setOrderConfirmed(false);
  };

  const handleConfirm = () => {
    if (shuffledPlayers.length === 0) {
      toast.error("Please shuffle players first.");
      return;
    }

    setOrderConfirmed(true);
    toast.success("Batting order confirmed.");
  };

  const startMatch = () => {
    if (!orderConfirmed) {
      toast.error("Please confirm batting order.");
      return;
    }

    navigate("/match/live", {
      state: { players: shuffledPlayers, matchType },
    });
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-xl font-semibold">Create Match</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">

        {/* Player Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
          />
          <Button onClick={addPlayer} className="w-auto px-6">
            Add
          </Button>
        </div>

        {/* Player List */}
        {players.length > 0 && (
          <div className="space-y-2">
            {players.map((player, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg text-sm"
              >
                <span>{player}</span>
                <button
                  onClick={() => removePlayer(index)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Match Type */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {["test", "overs"].map((type) => (
            <button
              key={type}
              onClick={() => setMatchType(type)}
              className={`flex-1 py-2 text-sm rounded-lg transition ${
                matchType === type
                  ? "bg-white shadow text-orange-500 font-medium"
                  : "text-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Shuffle Section */}
        {players.length >= 2 && (
          <div className="space-y-4">
            <Button onClick={handleShuffle}>
              {shuffledPlayers.length === 0
                ? "Shuffle Players"
                : "Reshuffle"}
            </Button>

            {/* Shuffled Order */}
            {shuffledPlayers.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  Batting Order
                </p>

                {shuffledPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {index + 1}. {player}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Confirm Button */}
            {shuffledPlayers.length > 0 && !orderConfirmed && (
              <Button onClick={handleConfirm}>
                Confirm Order
              </Button>
            )}

            {/* Start Match */}
            {orderConfirmed && (
              <Button onClick={startMatch}>
                Start Match
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CreateMatch;