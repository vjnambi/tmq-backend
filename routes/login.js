const express = require("express")
const router = express.Router()
const {users} = require("../models")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    const {username, password} = req.body
    const target = await users.findOne({where: {username: username}})

    if(!target){
        res.json("no such user found")
    } else {
        if(await bcrypt.compare(password, target.password)){
            res.json("login successful")
        } else {
            res.json("wrong password")
        }
    }

})

module.exports = router