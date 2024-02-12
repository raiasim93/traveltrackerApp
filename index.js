// importing modules 
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// setting port and starting express server
const port = 3000;
const app = express();

//using middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); 

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

// setting up the post route or create a new country
app.post("/add", async (req, res)=> {
    const input = req.body["country"];

    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", 
    [input]);

    if(result.rows.length !== 0){
        const data = result.rows[0];
        const country_code = data.country_code;

        await db.query("INSERT into visited_countries (country_code) VALUES ($1)", 
        [country_code]);
        res.redirect("/");
    }
    
});


// express server listening 
app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
})