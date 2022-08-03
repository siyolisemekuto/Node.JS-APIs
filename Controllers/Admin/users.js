const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

// all users
async function All_users (req,res){
    if (req.user.user_type==="admin")
    try {
        con.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    };
}

//single user
async function Single_user (req,res){
    if (req.user.user_type==="admin")
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
    All_users,
    Single_user
 }