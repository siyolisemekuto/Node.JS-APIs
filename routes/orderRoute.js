const express = require("express");
const router = express.Router();
// const con = require("../lib/db_connection");
const AuthController = require("../Controllers/Auth/order")
const AdminController = require("../Controllers/Admin/order")

//see all orders
router.get("/", (req, res) => {
    return AuthController.All_orders(req.res)
});

//find single order
router.get('/:id', (req, res)=>{
    return AuthController.Single_order(req.res)
}); 

//add a order
router.post('/', (req, res)=>{
    return AuthController.Add_order(req,res)
}); 

//update
router.put('/:id', (req, res)=>{
    return AuthController.Update_order(req.res)
}); 

//delete
router.delete('/:id', (req,res)=>{
    return AuthController.Delete_order(req.res)
}); 

//Requested orders
router.get("/",(req,res) => {
    return AdminController.Requested_orders(req,res)
})

module.exports = router;