const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// testa a rota
exports.testRoute = (req, res) => {
    res.status(200).json({ message: "A rota está funcionando bem" });
}

// Cria um produto -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// Pega todos produtos
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
    });
});

// Atualiza um produto -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Produto não encontrado", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product,
    });
});

// deleta um produto
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Produto não encontrado", 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Produto deletado com sucesso"
    })
});

// obtem detalhes de um produto
exports.getProductDeails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Produto não encontrado", 404));
    }
    res.status(200).json({
        success: true,
        product,
        productCount,
    });
});