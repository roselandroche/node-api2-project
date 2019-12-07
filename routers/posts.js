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

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

// UPDATE WORKS BUT RETURNS A 1 INSTEAD OF UPDATED POST
router.put("/:id", (req, res) => {
    db.update(req.params.id, req.body)
        .then(data => {
            res.status(200).json(data)
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
})

// DELETE WORKING BUT NOT RETURNING WHAT I WANT
router.delete("/:id", (req, res) => {
    let user = db.findById(req.params.id)

    db.remove(user)
        .then(user => {
            if(!user) {
                res.status(204).json({ message: "Post successfully deleted."})
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

// HAVING TROUBLE FIGURING OUT HOW TO SEND THE POST_ID
router.post("/:id/comments", (req, res) => {
    db.findCommentById(req.params.id)
        .then(comment => {
            if(comment) {
                return db.insertComment(req.body)
            }
                res.status(404).json({ error: "Comment does not exist."})
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router