const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Login = require("./models/login");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

// * DB CONNECTION
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected succeffully");
});

app.get("/", async (req, res) => {
  try {
    let allUsers = await User.find();
    res.send(allUsers);
    // console.log("get all users api");
    // res.send("get all users api")
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});

app.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let user = new User(data);
    let result = await user.save(); // insertOne(user) , insertMany([{},{},{}])
    res.send(result);
    //     console.log("add new user api")
    // res.send("add new user api")
  } catch (error) {
    console.log(error);
    res.send("403");
  }
});

app.post("/login/add", async (req, res) => {
  try {
    let data = req.body;
    let login = new Login(data);
    let result = await login.save(); // insertOne(user) , insertMany([{},{},{}])
    res.send(result);
    //     console.log("add new user api")
    // res.send("add new user api")
  } catch (error) {
    console.log(error);
    res.send("403");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let user_id = req.params.id;
    let result = await User.findOneAndDelete({ _id: user_id });
    // find({}) findOne({age : 20}) , findOneAndX({}), find({age : 20}).count()
    // find({}).limit(15); , find({}).sort({});

    res.send(result);
    //     console.log("delete user api ")
    // res.send("delete user api")
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    let myId = req.params.id;
    let data = req.body ;
    let updatedUser = await User.findByIdAndUpdate({_id : myId} , data);
    res.send(updatedUser);
    // console.log("update user api ");
    // res.send("update user api");
  } catch (error) {
    console.log(error);
    res.send("404");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    myId = req.params.id;
    currentUser = await User.findOne({ _id: myId });
    res.send(currentUser);
  } catch (error) {
    res.send(error);
  }
});

app.get("/login/:email/:password", async (req, res) => {
  try {
    let email = req.params.email;
    let pwd = req.params.password;
    //  TRAITEMENT LOGIN
    let cnx = await Login.findOne({ login: email, password: pwd });
    if (!cnx) {
      res.send("failed");
    } else {
      res.send("success");
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(4000, () => {
  console.log("Server works on port 4000 ...");
});
