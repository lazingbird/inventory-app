const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuitarSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  price: { type: mongoose.Types.Decimal128, required: true },
  stock: { type: Number },
});

GuitarSchema.virtual("url").get(function () {
  return `/shop/guitar/${this._id}`;
});

module.exports = mongoose.model("Guitar", GuitarSchema);
