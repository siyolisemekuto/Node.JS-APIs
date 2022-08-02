// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

//update user
async function Update (req, res) {
const {email, password} = req.body

 try{
    con.query(
        `SELECT * FROM users WHERE email="${email}" and password="${password}"`,
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    )
 }catch(error) {
    console.log(error);
    res.status(400).send(error)
}
}

module.export={
    Update
}