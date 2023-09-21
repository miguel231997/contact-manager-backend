const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();

const app = express();
app.use(express.json())
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.use('/api/contacts', require("./routes/contactRoutes"));

app.listen(port,() => {
    console.log("hello world");
})