const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")
const axios = require("axios")

router.post("/", validateToken, async (req, res) => {
    const {name} = req.body
    const accessToken = req.header("accessToken")
    const payload = decode(accessToken)
    const newqs = await questionsets.create({name: name, userId: payload.id})
    
    const qs = JSON.parse(JSON.stringify(await questionsets.findAll({where: {userId: payload.id}})))
    const body = {
        "value": [
            {
                "id": newqs.id,
                "name": newqs.name
            }
        ]
        
    }
    const header = {
        "headers": {
            "Content-Type": "application/json",
            "api-key": "i0Be6ATlgGrpUt47eeYmsvp0JZZSLhraJiKu4qhpsSAzSeAnTxl1"
        }
    }
    axios.post("https://thrensmusicquizsearch.search.windows.net/indexes/questionsets/docs/index?api-version=2020-06-30", body, header)
    for(i = 0; i < qs.length; i++){
        qs[i].questions = JSON.parse(JSON.stringify(await questions.findAll({where: {questionsetId: qs[i].id}})))

    }
    res.json(JSON.stringify(qs))
})

module.exports = router