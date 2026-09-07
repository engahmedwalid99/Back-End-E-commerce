const express = require("express");
const router = express.Router();
const addProductValidator = require("../../validator/products/addProduct.validator");
const validationMiddleware = require("../../middleware/validation.middleware.validator");
const checkUserLogedIn = require("../../middleware/checkUserLogedIn.middleware");
const checkIsAdmin = require("../../middleware/checkIsAdmin.middleware");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/product/product.controller");

router
  .route("/")
  .get(checkUserLogedIn, getAllProducts)
  .post(
    checkUserLogedIn,
    addProductValidator,
    validationMiddleware,
    addProduct,
  );

router
  .route("/:id")
  .put(
    checkUserLogedIn,
    checkIsAdmin,
    addProductValidator,
    validationMiddleware,
    updateProduct,
  )
  .delete(checkUserLogedIn, checkIsAdmin, deleteProduct);

module.exports = router;
