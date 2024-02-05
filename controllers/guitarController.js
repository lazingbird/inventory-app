const Guitar = require("../models/guitar");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of books, book instances, authors and genre counts (in parallel)
  const [numGuitars, numCategories] = await Promise.all([
    Guitar.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Guitar Shop",
  });
});

exports.guitar_list = asyncHandler(async (req, res, next) => {
  const allGuitars = await Guitar.find({}, "category name price")
    .sort({ price: 1 })
    .populate("category")
    .exec();

  res.render("guitar_list", { title: "Guitar List", guitar_list: allGuitars });
});
