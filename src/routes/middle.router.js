const router = require("express").Router();
const { generation } = require("../controllers/generation");
const { check } = require("../controllers/summary");

router.route("/generate").post(generation);

router.route("/check").post(check);

module.exports = router;
