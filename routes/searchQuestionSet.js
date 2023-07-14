const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")
const axios = require("axios")


router.post("/", async (req, res) => {
    const {query} = req.body
    const header = {
        "headers": {
            "Content-Type": "application/json",
            "api-key": "i0Be6ATlgGrpUt47eeYmsvp0JZZSLhraJiKu4qhpsSAzSeAnTxl1"
        }
    }
    const temp = (await axios.get(`https://thrensmusicquizsearch.search.windows.net/indexes/questionsets/docs?search=${query}&api-version=2020-06-30`,header)).data
    if(temp.value[0]){
        res.json(temp.value)
    } else {
        res.json("No results found")
    }
})

module.exports = router