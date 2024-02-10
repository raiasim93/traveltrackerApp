// importing modules 
import express from "express";
import bodyParser from "bodyParser";
import pg from "pg";

// setting port and starting express server
const port = 3000;
const app = express();




//using middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); 

// express server listening 
app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
})