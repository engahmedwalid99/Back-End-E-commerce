const Product = require("../../models/product");
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const allProducts = await Product.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  if (allProducts.length === 0) {
    return res.status(404).json({
      status: "failed",
      message: "Products Not Found 🚫",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Products Found",
    products: allProducts,
  });
});

const addProduct = asyncHandler(async (req, res) => {
  let { name, description, price, old_price, image } = req.body;

  if (!name || !description || !price || !image || !old_price) {
    return res.status(400).json({
      status: "failed",
      message: "All fields is required.",
    });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    old_price,
    image,
  });

  await newProduct.save();
  return res.status(201).json({
    status: "success",
    product: newProduct,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, old_price, image } = req.body;

  if (!name || !description || !price || !old_price || !image) {
    return res.status(400).json({
      status: "failed",
      message: "All fields are required.",
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      old_price,
      image,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!product) {
    return res.status(404).json({
      status: "failed",
      message: "Product not found.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Product updated successfully.",
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productDelete = await Product.findByIdAndDelete(req.params.id);
  if (productDelete) {
    return res.status(200).json({
      status: "success",
      message: "product deleted succesffully",
    });
  }
  return res.status(200).json({
    status: "falied",
    message: "product not deleted",
  });
});

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
