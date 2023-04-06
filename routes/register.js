const express = require("express")
const router = express.Router()
const {users} = require("../models")
const crypto = require("crypto")

router.post("/", async (req, res) => {
    const {username, password} = req.body
    salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
     
    hash = crypto.pbkdf2Sync(password, salt,  
    1000, 64, `sha512`).toString(`hex`); 
    console.log(typeof(hash))
    

    users.create({
        username: username,
        password: hash,
        salt: salt
    })
   
    res.json(`Successfully created`)
});


module.exports = router
