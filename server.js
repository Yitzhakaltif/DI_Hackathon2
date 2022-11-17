const express = require('express');
const path = require('path');
const knex = require('knex');
const app = express();
const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '<Your Password>',
        database: 'WeatherApp'
    }
})
app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})


let intialPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "weather.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
    
})


app.post('/register-user', async (req, res) => {
    const {name, email, password} = req.body;
    if(!name.length || !email.length || !password.length){
        res.json('Please Fill All The Required Fields');
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('Already Exists')){
                res.json('Email Already Exists');
            }
        })
    }
})

app.post('/login-user', (req, res) => {
    const {email, password} = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('You Have Entered Your Password Or Email Incorrectly. Please Check Your Password And Email And Try Again.');
        }
    })
})

