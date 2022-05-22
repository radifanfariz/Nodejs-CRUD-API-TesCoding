const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");

let corsOptions = {
    origin:"*"
};

app.use(cors(corsOptions));

app.use(express.json());

require("./app/routes/routes.js")(app);

server.listen(3000,() => {
    console.log("Server is Running");
});
