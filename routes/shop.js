const express = require("express");
const router = express.Router();

const guitar_controller = require("../controllers/guitarController");
const category_controller = require("../controllers/categoryController");

router.get("/", guitar_controller.index);

router.get("/guitars", guitar_controller.guitar_list);

router.get("/guitar/create", guitar_controller.guitar_create_get);
router.post("/guitar/create", guitar_controller.guitar_create_post);

router.get("/guitar/:id/update", guitar_controller.guitar_update_get);
router.post("/guitar/:id/update", guitar_controller.guitar_update_post);

router.get("/guitar/:id/delete", guitar_controller.guitar_delete_get);
router.post("/guitar/:id/delete", guitar_controller.guitar_delete_post);

router.get("/guitar/:id", guitar_controller.guitar_detail);

router.get("/category/:id", category_controller.category_detail);

module.exports = router;
