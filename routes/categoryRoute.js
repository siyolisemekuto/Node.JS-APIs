const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try {
        con.query("SELECT * FROM categories", (err, result) => {
            if (err) throw err;
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

//add a category
router.post('/', (req, res)=>{
    const {name,description,thumbnail}= req.body

    try{
        con.query(
        `INSERT INTO categories (name,description,thumbnail) values ("${name}","${description}","${thumbnail}") `, 
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
    } catch(error){
        console.log(error);
    };
}); 

//find single category
router.get('/:id', (req, res)=>{
      
    try{
        con.query(
        `SELECT * FROM categories WHERE category_id = "${req.params.id}"`, 
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
    const {name,description,thumbnail}= req.body

    try{
        con.query(
        `UPDATE categories SET name="${name}",description="${description}",thumbnail="${thumbnail}" WHERE category_id="${req.params.id}"`, 
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
   const {category_id}=req.body

    try{
        con.query(
        `DELETE FROM categories WHERE category_id="${category_id}"`, 
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