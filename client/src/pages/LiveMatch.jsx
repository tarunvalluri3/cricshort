import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "../components/layout/AppLayout";
import Button from "../components/ui/Button";

const LiveMatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { players = [], matchType = "test" } =
    location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [runsInput, setRunsInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [scores, setScores] = useState(
    players.map((name, index) => ({
      name,
      battingIndex: index,
      runs: 0,
      notOut: false,
      finished: false,
    }))
  );

  if (!players.length) {
    navigate("/");
    return null;
  }

  const validateRuns = (value) => {
    const runs = parseInt(value);

    if (isNaN(runs)) {
      toast.error("Please enter runs.");
      return null;
    }

    if (runs < 0) {
      toast.error("Runs cannot be negative.");
      return null;
    }

    if (runs > 500) {
      toast.error("Runs too high.");
      return null;
    }

    return runs;
  };

  const handleSubmit = (isNotOut) => {
    const runs = validateRuns(runsInput);
    if (runs === null) return;

    const updated = [...scores];
    updated[currentIndex] = {
      ...updated[currentIndex],
      runs,
      notOut: isNotOut,
      finished: true,
    };

    setScores(updated);
    setRunsInput("");

    if (currentIndex < players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleEditChange = (index, value) => {
    const runs = parseInt(value);
    if (runs >= 0 && runs <= 500) {
      const updated = [...scores];
      updated[index].runs = runs;
      setScores(updated);
    }
  };

  const allFinished = scores.every((p) => p.finished);

  const handleEndMatch = async () => {
    try {
      setLoading(true);

      const payload = {
        type: matchType,
        players: scores.map((p) => ({
          name: p.name,
          battingIndex: p.battingIndex,
          runs: p.runs,
          notOut: p.notOut,
        })),
      };

      const res = await fetch(
        "http://localhost:5000/api/matches",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Match saved successfully!");
      navigate("/");
    } catch {
      toast.error("Failed to save match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-xl font-semibold">
          Live Match
        </h1>
      </div>

      {!allFinished && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500">
              Now Batting
            </p>
            <h2 className="text-lg font-semibold mt-2">
              {scores[currentIndex].name}
            </h2>
          </div>

          <input
            type="number"
            value={runsInput}
            onChange={(e) =>
              setRunsInput(e.target.value)
            }
            placeholder="Enter runs"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
          />

          <div className="flex gap-4">
            <Button onClick={() => handleSubmit(false)}>
              Out
            </Button>
            <Button onClick={() => handleSubmit(true)}>
              End Innings
            </Button>
          </div>
        </div>
      )}

      {allFinished && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">
                Review Scores
              </h2>
              <button
                onClick={() =>
                  setEditMode(!editMode)
                }
                className="text-orange-500 text-sm"
              >
                {editMode
                  ? "Done Editing"
                  : "Edit Scores"}
              </button>
            </div>

            {scores.map((player, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span>
                  {index + 1}. {player.name}
                </span>

                {editMode ? (
                  <input
                    type="number"
                    value={player.runs}
                    onChange={(e) =>
                      handleEditChange(
                        index,
                        e.target.value
                      )
                    }
                    className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                ) : (
                  <span>
                    {player.runs}
                    {player.notOut ? "*" : ""}
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button
            onClick={handleEndMatch}
            disabled={loading}
          >
            {loading ? "Saving..." : "End Match"}
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default LiveMatch;