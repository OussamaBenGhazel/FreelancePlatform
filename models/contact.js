const mongoose = require("mongoose");

const Contact = mongoose.model("Contact",{
    FullName : {
        type : String,
    },
    Email : {
        type : String,
    },
    CompanyName : {
        type : String,
    },
    ContactNumber :{
        type : Number,
    },
    Message : {
        type : String,
    },
});

module.exports = Contact;



    