const express = require("express");
const router = express.Router();

const {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
} = require("../controllers/matchController");

router.post("/", createMatch);
router.get("/", getMatches);
router.get("/:id", getMatchById);
router.put("/:id", updateMatch);

module.exports = router;