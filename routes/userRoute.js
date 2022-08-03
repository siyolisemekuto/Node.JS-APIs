//dependencies
const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/Auth/users")
const AdminController = require("../Controllers/Admin/users")

// Login
router.post("/login", (req, res) => {
  return AuthController.Login(req,res)
});

// Register
router.post("/register", (req, res) => {
  return AuthController.Register(req,res) 
});

// Verify
router.get("/verify", (req, res) => {
  return AuthController.Verify(req,res)
});

// router.get("/", middleware, (req, res) => {
//   try {
//     let sql = "SELECT * FROM users";
//     con.query(sql, (err, result) => {
//       if (err) throw err;
//       res.json(result);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

//password forgot... nodemail
router.post('/forgot-psw', (req, res) =>{
  return AuthController.Forgot_psw(req,res)
});

//password reset
  router.put('reset-psw/:id', (req, res) => {
    return AuthController.Reset_psw(req,res)
  })

//update 
 router.patch('/', (req, res) =>{
  return AuthController.Update(req,res)
})

//edit
router.put('/:id', (req, res)=>{
    return AuthController.Edit(req,res)
}); 

//delete
router.delete('/:id', (req,res)=>{
  return AuthController.Delete(req.res) 
}); 

//get all users
router.get("/", (req, res) => {
  return AdminController.All_users(req,res)
});

//find single user
router.get('/:id', (req, res)=>{
  return AdminController.Single_user(req,res)
}); 

module.exports = router;