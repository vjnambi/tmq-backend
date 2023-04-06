const express = require("express")
const router = express.Router()
const {users} = require("../models")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    const {username, password} = req.body
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            username: username,
            password: hash
        })
    })
    res.json(`Successfully created`)
});


module.exports = router
