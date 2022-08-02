const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

//delete
async function Delete(req,res){
const {user_id}=req.body

    try{
        con.query(
        `DELETE FROM users WHERE user_id="${user_id}"`, 
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
    Delete
}