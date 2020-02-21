const express = require("express");
const postsRouter = require("./routers/posts")

const server = express();

server.use(express.json())
server.use("/api/posts", postsRouter)

server.get("/", (req, res) => {
    res.json({ message: "Welcome to Node: Project 2!"})
})

server.listen(5000, () => {
    console.log(`Server running on https://localhost:5000`)
})