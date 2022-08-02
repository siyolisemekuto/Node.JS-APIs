const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const jwt = require('jsonwebtoken');
// const middleware = require("../middleware/auth");
const LoginController = require("../Controllers/Auth/login")
const RegisterController = require("../Controllers/Auth/register")
const VerifyController = require("../Controllers/Auth/verify")
const Psw_resetController = require("../Controllers/Auth/psw_reset")
const Forgot_pswController = require("../Controllers/Auth/forgot_psw")
const UpdateController = require("../Controllers/Auth/update")
const DeleteController = require("../Controllers/Auth/delete")
const EditController = require("../Controllers/Auth/edit")
const UsersController = require("../Controllers/Admin/users")
const UserController = require("../Controllers/Admin/user")
const bcrypt = require('bcryptjs');

// Register
router.post("/register", (req, res) => {
  return RegisterController.Register(req,res) 
});

// Login
router.post("/login", (req, res) => {
  return LoginController.Login(req,res)
});

// Verify
router.get("/verify", (req, res) => {
  return VerifyController.Verify(req,res)
});

router.get("/", middleware, (req, res) => {
  try {
    let sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

//password forgot... nodemail
router.post('/forgot-psw', (req, res) =>{
  return Forgot_pswController.Forgot_psw(req,res)
});

//password reset
  router.put('reset-psw/:id', (req, res) => {
    return Psw_resetController.Psw_reset(req,res)
  })

//get all users
router.get("/", (req, res) => {
  return UsersController.Users(req,res)
});

//find single user
router.get('/:id', (req, res)=>{
  return UserController.User(req,res)
}); 

//update in
 router.patch('/', (req, res) =>{
  return UpdateController.Update(req,res)
})

//edit, update
router.put('/:id', (req, res)=>{
    return EditController.Edit(req,res)
}); 

//delete
router.delete('/:id', (req,res)=>{
  return DeleteController.Delete(req.res) 
}); 

module.exports = router;