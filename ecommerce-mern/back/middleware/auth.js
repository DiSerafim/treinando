const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors");

// Verifica se o token é um usuário autenticado
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHander("Por favor, faça o login para acessar este recurso", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

// Autorização de usuario
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Função: ${req.user.role} não tem permissão para acessar este recurso`, 403
                )
            );
        }
        next();
    };
}
