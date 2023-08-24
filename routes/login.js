const router = require("express").Router();
const Login = require("../models/login");
const bcrypt = require("bcrypt");
// * CRYPTAGE PASSWORD
const hashage = async (pwd) => {
    const cryptedPwd = await bcrypt.hash(pwd,8);
    return cryptedPwd;
    
    }
    
    const dehashage = async (pwd,cryptedPwd) => {
    
      const match = await bcrypt.compare(pwd,cryptedPwd);
      if(match){console.log("matched password") ; return true}
      else { console.log("password not matching") ; return false}
      }

      router.post("/add", async (req, res) => {
      try {
        let data = req.body;
        let pwd = await hashage(data.password);
        let login = new Login({login : data.login , password : pwd});
        let result = await login.save(); // insertOne(user) , insertMany([{},{},{}])
        res.send(result);
      } catch (error) {
        console.log(error);
        res.send("403");
      }
    });
    
 
    router.get("/:email/:password", async (req, res) => {
      try {
        let email = req.params.email;
        let pwd = req.params.password;
        // 
        //  TRAITEMENT LOGIN
        let cnx = await Login.findOne({ login: email });
        if (!cnx) {
          res.send("failed");
        } else {
          const result = await dehashage(pwd,cnx.password);
           console.log("RESULTAS :",result)
          res.send(`${result}`)
        }
      } catch (error) {
        res.send(error);
      }
    });

    module.exports = router;