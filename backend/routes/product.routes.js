const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controllers");

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
