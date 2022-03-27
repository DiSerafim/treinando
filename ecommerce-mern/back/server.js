const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config
dotenv.config({ path: "back/config/config.env" });

// conecting to database
connectDatabase();

// lidando com exceção não capturada
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Desligando o servidor devido a uma exceção não detectada`);
    process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });

// rejeição de promessa não tratada
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Desligando o servidor devido à rejeição da promessa não tratada`);
    server.close(() => {
        process.exit(1);
    });
});