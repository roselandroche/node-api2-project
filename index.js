const express = require("express");

const server = express();

server.listen(5000, () => {
    console.log(`Server running on https://localhost:5000`)
})