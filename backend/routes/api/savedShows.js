const express = require("express");
const router = express.Router();
const savedShowsCtrl = require("../../controllers/savedShows");

router.post("/", savedShowsCtrl.create);

router.get("/", savedShowsCtrl.index);

module.exports = router;
