require("dotenv").config();

const { startServer } = require("./server.js");

const PORT = process.env.PORT || 4000;

startServer(PORT);
