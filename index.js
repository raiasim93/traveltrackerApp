// importing modules 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// setting port and starting express server
const port = 3000;
const app = express();

// setting up pg database 
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "2012",
    port: 5432
});

db.connect();


// setting up home route 
app.get("/", async(req, res)=> {
    const result = await db.query("SELECT country_code FROM visited_countries");
    let countries = [ ];
    result.rows.forEach((country) => {
        countries.push(country.country_code);
    });
    console.log(result.rows);
    res.render("index.ejs", {
        countries: countries,
        total: countries.length
    });
})

//using middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); 

// express server listening 
app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
})