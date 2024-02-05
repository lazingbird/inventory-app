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
    url: guitar.url,
  });
});

exports.guitar_delete_get = asyncHandler(async (req, res, next) => {
  const guitar = await Guitar.findById(req.params.id).exec();

  if (!guitar) {
    res.redirect("/shop/guitars");
  }

  res.render("guitar_delete", {
    title: "Delete guitar",
    guitar: guitar,
  });
});

exports.guitar_delete_post = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const guitar = await Guitar.findById(req.params.id).exec();
  await Guitar.findByIdAndDelete(req.params.id).exec();
  res.redirect(`/shop/category/${guitar.category}`);
});

exports.guitar_update_get = asyncHandler(async (req, res, next) => {});

exports.guitar_create_get = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("guitar_form", {
    title: "Insert Guitar",
    categories: allCategories,
  });
});

exports.guitar_create_post = [
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "category must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "price must not be empty").trim().isLength({ min: 1 }).escape(),
  body("stock", "description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body);

    const guitar = new Guitar({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [allGuitars, allCategories] = await Promise.all([
        Guitar.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      for (const category of allCategories) {
        if (guitar.category == category._id) {
          category.checked = "true";
        }
      }
      res.render("guitar_form", {
        title: "Inser Guitar",
        guitars: allGuitars,
        categories: allCategories,
        guitar: guitar,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save guitar.
      await guitar.save();
      res.redirect(guitar.url);
    }
  }),
];
