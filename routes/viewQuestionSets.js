const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")

router.get("/", validateToken, async (req, res) => {
    const accessToken = req.header("accessToken")
    const payload = decode(accessToken)

    const qs = JSON.parse(JSON.stringify(await questionsets.findAll({where: {userId: payload.id}})))
    for(i = 0; i < qs.length; i++){
        qs[i].questions = JSON.parse(JSON.stringify(await questions.findAll({where: {questionsetId: qs[i].id}})))
    }
    res.json(JSON.stringify(qs))
})

module.exports = router