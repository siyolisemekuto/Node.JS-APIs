const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM orders", (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//add a order
router.post('/', (req, res)=>{
    const {user_id,amount,shipping_address,order_email,order_date,order_status}= req.body

    try{
        con.query(
        `INSERT INTO orders (user_id,amount,shipping_address,order_email,order_date,order_status) values ("${user_id}","${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}") `, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//find single order
router.get('/:id', (req, res)=>{
      
    try{
        con.query(
        `SELECT * FROM orders WHERE order_id = "${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 


//edit, update
router.put('/:id', (req, res)=>{
    const {user_id,amount,shipping_address,order_email,order_date,order_status}= req.body

    try{
        con.query(
        `UPDATE products SET user_id="${user_id}",amount="${amount}",shipping_address="${shipping_address}",order_email="${order_email}",order_date="${order_date}",order_status="${order_status}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//delete
router.delete('/:id', (req,res)=>{
   const {order_id}=req.body

    try{
        con.query(
        `DELETE FROM orders WHERE order_id="${order_id}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

module.exports = router;