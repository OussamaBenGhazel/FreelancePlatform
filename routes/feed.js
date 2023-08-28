const express = require("express");
const router = express.Router(); 
const Feed = require("../models/feed"); 

// *routes*
router.post("/addfeed", async (req, res) => {
  try {
    let data = req.body;
    let f = new Feed(data);
    let result = await f.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("403");
  }
});
router.get("/getfeed", async (req, res) => {
  try {
    let allfeed = await Feed.find();
    res.send(allfeed);
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    let feed_id = req.params.id; 
    let result = await Feed.findOneAndDelete({ _id: feed_id });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});



router.put("/update/:id", async (req, res) => {
  try {
    let myId = req.params.id;
    let data = req.body ;
    let updatedFeed = await Feed.findByIdAndUpdate({_id : myId} , data);
    console.log(data)
    res.send(updatedFeed);
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});


module.exports = router;
