const express = require("express")
const router = express.Router()
const {users} = require("../models")
const crypto = require("crypto")

router.post("/", async (req, res) => {
    const {username, password} = req.body
    const target = await users.findOne({where: {username: username}})

    if(!target){
        res.json("no such user found")
    } else {
        var hash = crypto.pbkdf2Sync(password, target.salt, 1000, 64, `sha512`).toString(`hex`)
        console.log(hash)
        console.log(target.password)
        if(hash === target.password){
            res.json("login successful")
        } else {
            res.json("wrong password")
        }
    }

})

module.exports = router