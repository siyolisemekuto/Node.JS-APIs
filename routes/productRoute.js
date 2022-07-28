const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//add a product
router.post('/', (req, res)=>{
    const {sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock}= req.body

    try{
        con.query(
        `INSERT INTO products (sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock) values ("${sku}","${name}","${price}","${weight}","${descriptions}","${thumbnail}","${image}","${category}","${create_date}","${stock}") `, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//find single product
router.get('/:id', (req, res)=>{
      
    try{
        con.query(
        `SELECT * FROM products WHERE product_id = "${req.params.id}"`, 
        (err, result) => {
            if (err) throw err;
            res.send(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 


//edit, update
router.put('/:id', (req, res)=>{
    const {sku,name,price,weight,descriptions,thumbnail,image,category,create_date,stock}= req.body

    try{
        con.query(
        `UPDATE products SET sku="${sku}",name="${name}",price="${price}",weight="${weight}",descriptions="${descriptions}",thumbnail="${thumbnail}",image="${image}",category="${category}",create_date="${create_date}",stock="${stock}" WHERE product_id="${req.params.id}"`, 
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
   const {product_id}=req.body

    try{
        con.query(
        `DELETE FROM products WHERE product_id="${product_id}"`, 
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