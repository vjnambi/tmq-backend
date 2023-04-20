const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")

router.post("/", validateToken, async (req, res) => {
    const {name} = req.body
    const accessToken = req.header("accessToken")
    const payload = decode(accessToken)
    await questionsets.create({name: name, userId: payload.id})
    
    const qs = JSON.parse(JSON.stringify(await questionsets.findAll({where: {userId: payload.id}})))
    for(i = 0; i < qs.length; i++){
        qs[i].questions = JSON.parse(JSON.stringify(await questions.findAll({where: {questionsetId: qs[i].id}})))

    }
    res.json(JSON.stringify(qs))
})

module.exports = router