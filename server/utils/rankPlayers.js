const rankPlayers = (players) => {
  return [...players].sort((a, b) => {
    if (b.runs !== a.runs) {
      return b.runs - a.runs;
    }
    return a.battingIndex - b.battingIndex;
  });
};

module.exports = rankPlayers;