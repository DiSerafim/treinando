const express = require("express");
const router = express.Router();
const {
    testRoute,
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductDeails,
} = require("../controllers/productController");

router.route("/product").get(testRoute);
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getProductDeails);

module.exports = router;