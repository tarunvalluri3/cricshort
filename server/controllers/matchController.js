const Match = require("../models/Match");
const rankPlayers = require("../utils/rankPlayers");
const generateMatchName = require("../utils/generateMatchName");
const validateMatch = require("../utils/validateMatch");
const asyncHandler = require("../middleware/asyncHandler");


// CREATE MATCH
exports.createMatch = asyncHandler(async (req, res) => {
  const { type, players } = req.body;

  validateMatch(type, players);

  const totalRuns = players.reduce((sum, p) => sum + p.runs, 0);
  const rankings = rankPlayers(players);
  const name = await generateMatchName(type);

  const newMatch = await Match.create({
    name,
    type,
    date: new Date(),
    players,
    rankings,
    totalRuns,
  });

  res.status(201).json({
    success: true,
    data: newMatch,
  });
});


// GET ALL MATCHES
exports.getMatches = asyncHandler(async (req, res) => {
  const matches = await Match.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: matches.length,
    data: matches,
  });
});


// GET SINGLE MATCH
exports.getMatchById = asyncHandler(async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match) {
    const error = new Error("Match not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: match,
  });
});


// UPDATE MATCH
exports.updateMatch = asyncHandler(async (req, res) => {
  const { players } = req.body;

  validateMatch("test", players); // type irrelevant for edit

  const match = await Match.findById(req.params.id);

  if (!match) {
    const error = new Error("Match not found");
    error.statusCode = 404;
    throw error;
  }

  const totalRuns = players.reduce((sum, p) => sum + p.runs, 0);
  const rankings = rankPlayers(players);

  match.players = players;
  match.rankings = rankings;
  match.totalRuns = totalRuns;

  await match.save();

  res.status(200).json({
    success: true,
    data: match,
  });
});