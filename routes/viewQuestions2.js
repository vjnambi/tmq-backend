const express = require("express")
const router = express.Router()
const {questionsets, questions} = require("../models")

router.get("/:qsId", async (req, res) => {
    const accessToken = req.header("accessToken")

    const qs = JSON.parse(JSON.stringify(await questionsets.findOne({where: {id: req.params.qsId}})))
    if(qs){
        qs.questions = JSON.parse(JSON.stringify(await questions.findAll({where: {questionsetId: qs.id}})))
        res.json(JSON.stringify(qs))
    } else {
        res.json({error: "question set not found for user"})
    }
    
})

module.exports = router