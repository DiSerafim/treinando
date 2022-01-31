const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// cria novo pedido
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        success: true,
        order,
    })
});

// pega um único pedido
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new ErrorHander("Pedido não encontrado, com este ID", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

// Pega pedidos de usuários logados
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
});

// Pega todos pedidos -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})

// Atualiza status do pedido -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHander("Pedido não encontrado, com este Id", 404));
    }
    if (order.orderStatus === "Entregue") {
        return next(new ErrorHander("O pedido já foi entregue"), 400);
    }
    order.orderItems.forEach(async (o) => {
        await updateStock(o.Product, o.quantity);
    });
    order.orderStatus = req.body.status;
    if (req.body.status === "Entregue") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.satus(200).json({
        success: true,
    });
});

// atualiza o produto no estoque
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity
    await product.save({ validateBeforeSave: false });
}

// delete Pedido -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Pedido não encontrado, com este Id", 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
    });
});