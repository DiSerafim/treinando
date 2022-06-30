const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Lidando com exceção não capturada
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Desligando o servidor devido a uma exceção não capturada`);
  process.exit(1);
});

// configuração
dotenv.config({ path: "back/config/config.env" });

// conectando ao banco de dados
connectDatabase();

// upload de arquivo express cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor funcionando na porta http://localhost:${process.env.PORT}`);
});

// rejeição de promessa não tratada
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Desligando o servidor devido à rejeição da promessa não tratada`);
  server.close(() => {
    process.exit(1);
  });
});