const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userdata = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be more than 3 char"],
    maxLength: [20, "Name must be less than 3 char"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "description can't less than 10"],
    maxLength: [255, "description can't mare than 11"],
  },
  price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", userdata);

module.exports = Product;
