const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

const bcrypt = require('bcryptjs');
// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";

    //the body requested
    const {
      full_name,
      email,
      password,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    } = req.body;

    // The start of hashing / encryption
    //bcrypt is being used
    //salr is the legnth of the character ie. a=10charachters
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

//database terms
    let user = {
      full_name,
      email,
      // We sending the hash value to be stored within the table
      password:hash,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    };

    //SQL Query
    //connection to database made here
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});


// Login
// The Route where Decryption happens
const jwt = require('jsonwebtoken');

// Login
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // The information the should be stored inside token
          const payload = {
            user: {
              user_id: result[0].user_id,
              full_name: result[0].full_name,
              email: result[0].email,
              user_type: result[0].user_type,
              phone: result[0].phone,
              country: result[0].country,
              billing_address: result[0].billing_address,
              default_shipping_address: result[0].default_shipping_address,
            },
          };
          // Creating a token and setting expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
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

  const middleware = require("../middleware/auth");

  router.get("/", middleware, (req, res) => {
    try {
      let sql = "SELECT * FROM users";
      con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  });

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