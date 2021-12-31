const Product = require("../models/productModel");

// testa a rota
exports.testRoute = (req, res) => {
    res.status(200).json({ message: "A rota está funcionando bem" });
}

// Cria um produto -- admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
// Pega todos produtos
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
}
// Atualiza um produto -- admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Produto não encontrado"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
}
// deleta um produto
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Produto não encontrado"
        })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Produto deletado com sucesso"
    })
}
// obtem detalhes de um produto
exports.getProductDeails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Produto não encontrado"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}