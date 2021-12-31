const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error")

app.use(express.json());

// rota de importações
const product = require("./routes/productRoute");

app.use("/api/v1", product);

// midleware para erros
app.use(errorMiddleware);

module.exports = app;
