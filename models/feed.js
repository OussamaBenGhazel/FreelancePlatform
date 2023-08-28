const mongoose = require("mongoose");

const Feed = mongoose.model("Feed",{
    title : {
        type : String,
    },
    imgurl : {
        type : String,
    },
    description : {
        type : String,
    }
});

module.exports = Feed;


