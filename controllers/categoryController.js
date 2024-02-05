const Guitar = require("../models/guitar");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, guitarsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Guitar.find({ category: req.params.id }, "name price").exec(),
  ]);

  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: "Category name",
    category: category,
    category_guitars: guitarsInCategory,
  });
});
