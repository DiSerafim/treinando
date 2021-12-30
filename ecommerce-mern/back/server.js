const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config
dotenv.config({ path: "back/config/config.env" });

// conecting to database
connectDatabase();


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
})