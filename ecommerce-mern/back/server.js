const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config
dotenv.config({ path: "back/config/config.env" });

// conecting to database
connectDatabase();

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
});

// rejeição de promessa não tratada
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Desligando o servidor devido à rejeição da promessa não tratada`);
    server.close(() => {
        process.exit(1);
    });
});