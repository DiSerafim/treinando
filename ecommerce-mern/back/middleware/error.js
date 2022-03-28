const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Erro interno do servidor";

  // Erro de id do mongodb error
  if (err.name === "CastError") {
    const message = `Recurso não encontrado. Inválido: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Chave duplicada do DB error
  if (err.code === 11000) {
    const message = `Duplicado ${Object.keys(err.keyValue)} já existe`;
    err = new ErrorHandler(message, 400);
  }
  // Erro de JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `O JsonWebToken é inválido, tente novamente`;
    err = new ErrorHandler(message, 400);
  }
  // JWT expirado error
  if (err.name === "TokenExpiredError") {
    const message = `Chave JsonWebToken expirada, tente novamente`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};