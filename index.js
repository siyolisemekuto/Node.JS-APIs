//import express and cors
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

//configure the express server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port

let bodyParser = require("body-parser")
app.use(express.static("public")); // Enable the server to handle JSON requests
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors()); // Dont let local development give errors

const con = require ("./lib/db_connection")
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const categoryRoute = require("./routes/categoryRoute.js")
const orderRoute = require("./routes/orderRoute.js")



//create '/' home route
app.get("/", (req, res) => {
    res.sendFile(_dirname + "/" +"index.html");
});

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);



//set up app listening for API calls
app.listen(app.get("port"), () => {
    console.log(`http://localhost:${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});

