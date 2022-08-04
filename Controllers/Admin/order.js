//dependencies
const con = require("../../lib/db_connection");


//see orders from users
async function Requested_orders(req,res) {
    const{user_id}=req.body
    if (req.user.user_type==="admin")
    try{
        con.query(
        `SELECT * FROM orders WHERE user_id = "${user_id}"`, 
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
    Requested_orders
 }

