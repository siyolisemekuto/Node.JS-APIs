const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");



router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//add a product
router.post('/', middleware, (req, res)=>{
    const {sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock}= req.body
    if (req.user.user_type==="admin")

    try{
        con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) values ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}") `, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    }else{
        res.json("Access denied!")
    }
}); 

//find single product
router.get('/:id', (req, res)=>{
      
    try{
        con.query(
        `SELECT * FROM products WHERE product_id = "${req.params.id}"`, 
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
router.put('/:id', middleware, (req, res)=>{
    const {sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock}= req.body
    if (req.user.user_type==="admin")
   {try{
        con.query(
        `UPDATE products SET sku="${sku}",name="${name}",price="${price}",weight="${weight}",descriptions="${descriptions}",thumbnail="${thumbnail}",image="${image}",category="${category}",create_date="${create_date}",stock="${stock}" WHERE product_id="${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    }
    }else{
        res.json("Access denied!")
    }
}); 

//delete
router.delete('/:id', middleware, (req,res)=>{
    if (req.user.user_type==="admin")
   {
    try{
        con.query(
        `DELETE FROM products WHERE product_id="${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}else{
    res.json("Access denied!")
}
}); 

module.exports = router;