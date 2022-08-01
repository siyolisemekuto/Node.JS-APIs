const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");
const jwt = require('jsonwebtoken');
const AuthController = require("../Controllers/Auth/index")
const AdminController = require("../Controllers/Auth/index")

const bcrypt = require('bcryptjs');
// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
  return AdminController.Register(req,res) 
});


// Login
router.post("/login", (req, res) => {
  return AuthController.Login(req,res)
});

// Verify
router.get("/verify", (req, res) => {
    const token = req.header("x-auth-token");
    jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({
          msg: "Unauthorized Access!",
        });
      } else {
        res.status(200);
        res.send(decodedToken);
      }
    });
  });


  router.get("/", (req, res) => {
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
// Importing the dependencies
const nodemailer = require('nodemailer');


//nodemail and reset password
router.post('/forgot-psw', (req, res) => {
    try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      if(result === 0) {
        res.status(400), res.send("Email not found")
      }
      else {

        // Allows me to connect to the given email account || Your Email
        const transporter = nodemailer.createTransport({
          host: process.env.MAILERHOST,
          port: process.env.MAILERPORT,
          auth: {
            user: process.env.MAILERUSER,
            pass: process.env.MAILERPASS,
          },
        });

        // How the email should be sent out
      var mailData = {
        from: process.env.MAILERUSER,
        // Sending to the person who requested
        to: result[0].email,

        subject: 'Password Reset',
        html:
          `<div>
            <h3>Hi ${result[0].full_name},</h3>
            <br>
            <h4>Click link below to reset your password</h4>

            <a href="https://user-images.githubusercontent.com/4998145/52377595-605e4400-2a33-11e9-80f1-c9f61b163c6a.png">
              Click Here to Reset Password
              user_id = ${result[0].user_id}
            </a>

            <br>
            <p>For any queries feel free to contact us...</p>
            <div>
              Email: ${process.env.MAILERUSER}
              <br>
              Tel: If needed you can add this
            <div>
          </div>`
      };

      // Check if email can be sent
      // Check password and email given in .env file
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email valid! ', success)
        }
      });

      transporter.sendMail(mailData,  (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.send('Please Check your email', result[0].user_id)
        }
      });

      }
    });
  } catch (error) {
    console.log(error);
  }
})


// Reset Password Route

router.put('reset-psw/:id', (req, res) => {
  let sql = "SELECT * FROM users WHERE ?";
  let user = {
    user_id: req.params.id,
  };
  con.query(sql, user, (err, result) => {
    if (err) throw err;
    if (result === 0) {
      res.status(400), res.send("User not found");
    } else {
      let newPassword = `UPDATE users SET ? WHERE user_id = ${req.params.id}`;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const updatedPassword = {
        full_name: result[0].full_name,
        email: result[0].email,
        user_type: result[0].user_type,
        phone: result[0].phone,
        country: result[0].country,
        billing_address: result[0].billing_address,
        default_shipping_address: result[0].default_shipping_address,

        // Only thing im changing in table
        password: hash,
      };

      con.query(newPassword, updatedPassword, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Password Updated please login");
      });
    }
  });
})


//get all users
router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//add a user
router.post('/', (req, res)=>{
    const {email,password, full_name, billing_address, default_shipping_address, country, phone, user_type}= req.body

    try{
        con.query(
        `INSERT INTO users (email,password,full_name,billing_address,default_shipping_address,country,phone,user_type) values ("${email}","${password}","${full_name}","${billing_address}","${default_shipping_address}","${country}","${phone}","${user_type}") `, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//find single user
router.get('/:id', (req, res)=>{
      
    try{
        con.query(
        `SELECT * FROM users WHERE user_id = "${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//update in
 router.patch('/', (req, res) =>{
    const {email, password} = req.body

 try{
    con.query(
        `SELECT * FROM users WHERE email="${email}" and password="${password}"`,
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    )
 }catch(error) {
    console.log(error);
    res.status(400).send(error)
}
})

//edit, update
router.put('/:id', (req, res)=>{
    const {email,password,full_name,billing_address,default_shipping_address,country,phone,user_type}= req.body

    try{
        con.query(
        `UPDATE users SET email="${email}",password="${password}",full_name="${full_name}",billing_address="${billing_address}",default_shipping_address="${default_shipping_address}",country="${country}",phone="${phone}",user_type="${user_type}" WHERE user_id="${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//delete
router.delete('/:id', (req,res)=>{
   const {user_id}=req.body

    try{
        con.query(
        `DELETE FROM users WHERE user_id="${user_id}"`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

module.exports = router;