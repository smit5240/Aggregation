require("dotenv").config();
const bodyParser = require('body-parser'); 
const Connect = require("./conection");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use("/api" , urlencodedParser , require('./router/index'))


const port = process.env.PORT
app.listen(port , () => {
    Connect()
})