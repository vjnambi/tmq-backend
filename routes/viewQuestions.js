const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")

router.get("/:qsId", validateToken, async (req, res) => {
    const accessToken = req.header("accessToken")
    const payload = decode(accessToken)

    const qs = JSON.parse(JSON.stringify(await questionsets.findOne({where: {id: req.params.qsId, userId: payload.id}})))
    if(qs){
        qs.questions = JSON.parse(JSON.stringify(await questions.findAll({where: {questionsetId: qs.id}})))
        res.json(JSON.stringify(qs))
    } else {
        res.json({error: "question set not found for user"})
    }
    
})

module.exports = router