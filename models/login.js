const mongoose = require("mongoose");

const Login = mongoose.model("Login",{
    Username : {
        type : String,
    },
    Password : {
        type : String,
    }
});

module.exports = Login;
