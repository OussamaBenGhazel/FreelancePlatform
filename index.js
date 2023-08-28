const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const feedRouter = require("./routes/feed");

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

app.use('/user',userRouter);
app.use('/login',loginRouter);
app.use('/feed', feedRouter);

app.listen(4000, () => {
  console.log("Server works on port 4000 ...");
});
