const express = require("express");
const router = express.Router(); 
const Contact = require("../models/contact"); 


router.post("/", async (req, res) => {
  try {
    let data = req.body;
    let inbox = new Contact(data);
    let result = await inbox.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("403");
  }
});
module.exports = router;
