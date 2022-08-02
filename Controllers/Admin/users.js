const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const con = require("../../lib/db_connection");
require ('dotenv').config;

// all users
async function Users (req,res){
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
 module.export={
    Users
 }