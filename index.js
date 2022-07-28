//import express and cors
const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

//configure the express server
const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const categoryRoute = require("./routes/categoryRoute.js")
const orderRoute = require("./routes/orderRoute.js")


//create '/' home route
app.get("/", (req, res) => {
    res.json({ msg: "Welcome" });
});

app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);



//set up app listening for API calls
app.listen(app.get("port"), () => {
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
});

