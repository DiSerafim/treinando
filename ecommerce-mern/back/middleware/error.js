const ErrorHander = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno do servidor";

    // Erro de id do mongodb errado
    if (err.name === "CastError") {
        const message = `Recurso não encontrado. Inválido: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};