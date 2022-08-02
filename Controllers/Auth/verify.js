const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;
const middleware = require("../middleware/auth");

//verify
async function Verify (req, res){
const token = req.header("x-auth-token");
    jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({
          msg: "Unauthorized Access!",
        });
      } else {
        res.status(200);
        res.json(decodedToken);
      }
    });
  
  router.get("/", middleware, ( res) => {
    return AccessMiddleware.Access(req,res)
  });
}
  



module.export ={
    Verify
}