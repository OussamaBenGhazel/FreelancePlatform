const mongoose = require("mongoose");

const Feed = mongoose.model("Feed",{
    title : {
        type : String,
    },
    feedOwner : {
        type : String,
    },
    description : {
        type : String,
    },
    message : {
        type : String,
    },

});

module.exports = Feed;


