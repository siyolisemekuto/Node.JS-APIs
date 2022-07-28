const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

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

//log in
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