const Match = require("../models/Match");

const generateMatchName = async (type) => {
  const today = new Date();

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0, 0
  );

  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23, 59, 59, 999
  );

  const count = await Match.countDocuments({
    type,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const dayName = today.toLocaleString("en-US", {
    weekday: "long",
  });

  return `${dayName} - ${type.toUpperCase()} - ${count + 1}`;
};

module.exports = generateMatchName;