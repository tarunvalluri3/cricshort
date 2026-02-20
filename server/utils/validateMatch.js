const validateMatch = (type, players) => {
  if (!type || !["test", "overs"].includes(type)) {
    const error = new Error("Invalid match type");
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(players) || players.length === 0) {
    const error = new Error("Players array is required");
    error.statusCode = 400;
    throw error;
  }

  players.forEach((p) => {
    if (
      typeof p.name !== "string" ||
      p.name.trim() === "" ||
      typeof p.runs !== "number" ||
      p.runs < 0 ||
      typeof p.battingIndex !== "number"
    ) {
      const error = new Error("Invalid player data");
      error.statusCode = 400;
      throw error;
    }
  });
};

module.exports = validateMatch;