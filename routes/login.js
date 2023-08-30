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
        try{
          console.log(req.body);
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt)
            const newUser = new Login({
                Username: req.body.Username,
                Password: hashedPass
            })
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    });
    
     
    
 
    router.post("/signIn", async (req, res) => {
      try{
        console.log(req.body);
          const user = await Login.findOne({ Username: req.body.username });
          console.log(user);
            if(!user)
          {
              return res.status(400).json("Wrong credentials")
          }
  
          const validated = await bcrypt.compare(req.body.password, user.Password);
          if(!validated)
          {
              return res.status(400).json("Wrong credentials");
          }
          const { password, ...others } = user._doc;
  
          res.status(200).json(others);
  
      } catch(err){
          res.status(500).json(err);
      }
  });

    module.exports = router;