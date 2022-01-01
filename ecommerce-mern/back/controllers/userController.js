const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// registra um usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "Este é um exemplo de id",
            url: "urlFotoPerfil",
        },
    });
    res.status(201).json({
        success: true,
        user,
    })
});