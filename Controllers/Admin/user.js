const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

//single user
   async function User (req,res){
    try{
        con.query(
        `SELECT * FROM users WHERE user_id = "${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}

module.export={
    User
}