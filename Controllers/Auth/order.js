//useful for cart

//dependencies
const con = require("../lib/db_connection");

//see all orders
async function All_orders(req,res) {
try {
    con.query("SELECT * FROM orders", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
} catch (error) {
    console.log(error);
    res.status(400).send(error)
}
}

//see single order
async function Single_order(req,res) {
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
}

//add order
async function Add_order(req,res) {
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
}

//update order
async function Update_order (req,res){
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
}

//delete order
async function Delete_order(req,res){
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
}

module.export={
    All_orders,
    Single_order,
    Add_order,
    Update_order,
    Delete_order
}
