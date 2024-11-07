//instantiation
const express = require("express")
const app=express()
const mysql = require("mysql")
const moment =require("moment")

const PORT = process.env.PORT || 5000

//const logger = (req, res, next) => {
//    console.log(`http://localhost:5000${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
//    next();
//}

const connection = mysql.createConnection({
    host: "blymgvx3ambhgmsmin1o-mysql.services.clever-cloud.com",
    user: "u1uox9zloqyqba2v",
    password: "443WlJ9iRcGLbDAWKTKi",
    database: "blymgvx3ambhgmsmin1o",
});
connection.connect();

app.listen(5000, () => {
console.log(`Server is running in port ${PORT}`)
})

//REPORT - CRUD
app.get("/api/members", (req, res) =>{
    connection.query("SELECT * FROM userdata", (err, row, fields) => {
        if(err) throw err;
        res.json(rows)
    })
})

//REPORT - CRUD - SEARCH
app.get("/api/members/:id", (req, res) =>{
    const id=req.params.id
    //res.send(id)
    connection.query(`SELECT * FROM userdata WHERE id=${id}`, (err, row, fields) =>{
        if(err) throw err
        if(rows.lenght > 0){
            res.json(rows)
        }else{
            res.status(400).json({msg:`${id} id not found`})
        }
        
    })
})

//POST
//CREATE - CRUD
app.post("/api/members", (rew, res) =>{
    const fname = req.body.fname; //Juan
    const lname = req.body.lname; //Dela Cruz
    const email = req.body.email; //juan@gmail.com
    const gender =req.body.gender; //male
    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender) VALUES ('${fname}','${lname}','${email}','${gender}'),`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg: `Successfully inserted`})
    })
})

//PUT
//UPDATE - CRUD
app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req, res) =>{
    const fname = req.body.fname; //Juan
    const lname = req.body.lname; //Dela Cruz
    const email = req.body.email; //juan@gmail.com
    const gender =req.body.gender; //male
    connection.query(`UPDATE userdata SET first_name='${fname}', last_name='${lname}', email='${email}', gender='${gender}' WHERE id='${id}'`, (err, rows, fields) =>{
        if(err) throw err
        res.json({msg: `Successfully updated!`})
    })
})

//DELETE
app.use(express.urlencoded({extended: false}))
app.put("/api/members",(req, res) =>{
    const id= req.nody.id;
    connection.query(`DELETE FROM userdata WHERE id='${id}'`, (err, rows, fields) =>{
        if(err) throw err;
        res.json({msg:`Successfully deleted`})
    })
})


