const express = require("express")
const { validateToken } = require("../middleware/validateJWT")
const router = express.Router()
const {questionsets, questions} = require("../models")
const {decode} = require("jsonwebtoken")
const axios = require("axios")

router.post("/", async (req, res) => {
    const {query} = req.body
    const temp = (await axios.get(`http://40.88.46.64/solr/my_core/query?q=name%3A"${query}"~2`)).data
    if(temp.response.numFound > 0){
        res.json(temp.response.docs)
    } else {
        res.json("No results found")
    }
})

module.exports = router