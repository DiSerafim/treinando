const app = require("./app");
const dotenv = require("dotenv");

// config dotenv
dotenv.config({ path: "back/config/config.env" });

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor na porta: ${port}`);
})