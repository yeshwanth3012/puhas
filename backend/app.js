const express = require("express");
const app = express();
const authJwt = require("./helpers/jwt");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const API = process.env.API_URL;
const errorHandler = require("./helpers/error-handler");
app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const categoryRoutes = require("./routes/category");
const cropRoutes = require("./routes/crop");
const facilityRoutes = require("./routes/facility");
const farmRoutes = require("./routes/farm");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/product");
const ticketRoutes = require("./routes/ticket");
const transactionRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");
const vehicleRoutes = require("./routes/vehicle");
const vendorRoutes = require("./routes/vendor");

//Routes
app.use(`${API}/category`, categoryRoutes);
app.use(`${API}/crop`, cropRoutes);
app.use(`${API}/facility`, facilityRoutes);
app.use(`${API}/farm`, farmRoutes);
app.use(`${API}/order`, orderRoutes);
app.use(`${API}/product`, productRoutes);
app.use(`${API}/ticket`, ticketRoutes);
app.use(`${API}/transaction`, transactionRoutes);
app.use(`${API}/user`, userRoutes);
app.use(`${API}/vehicle`, vehicleRoutes);
app.use(`${API}/vendor`, vendorRoutes);

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DBName,
    })
    .then(() => {
        console.log("Database connection is ready...");
    })
    .catch((err) => {
        console.log(err);
    });

// Development
app.listen(3000, () => {
    console.log(API);
    console.log("server running on 3000 port");
});

//Production
// var server = app.listen(process.env.PORT || 3000, function () {
//     var port = server.address().port;
//     console.log("Express is working on port " + port);
// });
