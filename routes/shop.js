const express = require("express");
const router = express.Router();

const guitar_controller = require("../controllers/guitarController");
const category = require("../controllers/categoryController");

router.get("/", guitar_controller.index);

router.get("/guitars", guitar_controller.guitar_list);

module.exports = router;
