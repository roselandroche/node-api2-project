const express = require("express");
const router = express.Router();
const db = require("../data/db")

router.get("/", (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/", (req, res) => {
    db.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router