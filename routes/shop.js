const express = require("express");
const router = express.Router();

const guitar_controller = require("../controllers/guitarController");
const category_controller = require("../controllers/categoryController");

router.get("/", guitar_controller.index);

router.get("/guitars", guitar_controller.guitar_list);

router.get("/guitar/:id", guitar_controller.guitar_detail);

router.get("/category/:id", category_controller.category_detail);

module.exports = router;
