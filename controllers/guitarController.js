const Guitar = require("../models/guitar");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
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

exports.guitar_detail = asyncHandler(async (req, res, next) => {
  const guitar = await Guitar.findById(req.params.id)
    .populate("category")
    .exec();

  if (guitar === null) {
    const err = new Error("Guitar not found");
    console.log(err);
    err.status = 404;
    return next(err);
  }

  res.render("guitar_detail", {
    name: guitar.name,
    description: guitar.description,
    category: guitar.category,
    price: guitar.price,
    stock: guitar.stock,
  });
});

exports.guitar_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("guitar_form", {
    title: "Insert Guitar",
    categories: allCategories,
  });
});
