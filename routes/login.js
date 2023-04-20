const express = require("express")
const router = express.Router()
const {users} = require("../models")
const crypto = require("crypto")
const {sign} = require("jsonwebtoken")

router.post("/", async (req, res) => {
    const {username, password} = req.body
    const target = await users.findOne({where: {username: username}})

    if(!target){
        res.json({error: "username not found"})
    } else {
        var hash = crypto.pbkdf2Sync(password, target.salt, 1000, 64, `sha512`).toString(`hex`)
        if(hash === target.password){
            const accessToken = sign({username: target.username, id: target.id}, "importantsecret")
            res.json(accessToken)
        } else {
            res.json({error: "username and password do not match"})
        }
    }

})

module.exports = router