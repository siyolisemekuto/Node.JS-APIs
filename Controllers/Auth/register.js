// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

// register
async function Register (req, res) {
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
      res.json(`User ${(user.full_name, user.email)} created successfully`)
    });
  // } catch (error) {
  //   console.log(error);
  }

  module.export ={
    Register
  }