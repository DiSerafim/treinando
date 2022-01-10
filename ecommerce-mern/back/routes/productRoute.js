const express = require("express");
const router = express.Router();
const {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductDeails,
    testRoute,
    updateProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/product").get(testRoute);
router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDeails);

module.exports = router;