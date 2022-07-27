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

router.post('/', (req, res)=>{
    const {email,password, full_name, billing_address, default_shipping_address, country, phone}= req.body

    try{
        con.query(
        `INSERT INTO users ('${email}','${password}','${full_name}','${billing_address}','${default_shipping_address}','${country}','${phone}') `, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 


//find, log in
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
// router.put('/', (req, res)=>{
//     const {email,password, full_name, billing_address, default_shipping_address, country, phone}= req.body

//     try{
//         con.query(
//         `UPDATE users ('${email}','${password}','${full_name}','${billing_address}','${default_shipping_address}','${country}','${phone}') `, 
//         (err, result) => {
//             if (err) throw err;
//             res.send(result);
//         }
//     );
//     } catch(error){
//         console.log(error);
//     };
// }); 

module.exports = router;