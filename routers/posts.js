const express = require("express");
const router = express.Router();
const db = require("../data/db")

router.get("/", (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved." })
        })
})

router.post("/", (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post."})
    } else if(req.body.title && req.body.contents) {
        db.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        })
    }  
})

router.get("/:id", (req, res) => {
    if(req.params.id) {
        db.findById(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "The post information could not be retrieved."})
        })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
})

// UPDATE WORKS BUT RETURNS A 1 INSTEAD OF UPDATED POST
router.put("/:id", (req, res) => {
    if(!res.body.title || !req.body.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post."})
    } else if(req.params.id) {
        db.update(req.params.id, req.body)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: "The post information could not be modified."})
            })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
    
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
    if(req.params.id) {
        db.findPostComments(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ message: "The comments information could not be retrieved."})
            })
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
    
})

// HAVING TROUBLE FIGURING OUT HOW TO SEND THE POST_ID
router.post("/:id/comments", (req, res) => {
    
    // const commentId = 
    // db.findPostComments(req.params.id)
    //     .then(comments => {

    //     })
    //     .catch()
    // db.findCommentById(req.params.id)
    //     .then(data => {
    //         if(data) {
    //             return db.insertComment(data)
    //         }
    //             res.status(404).json({ error: "Comment does not exist."})
    //     })
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
})

module.exports = router