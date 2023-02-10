const express = require('express');
const cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser');


const app = express ();

app.use(cors());
const connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "todo_schema",
  });
app.use(bodyParser.json());
app.use(express.json());

connection.connect((err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log(" Database connected successfully");
});


app.post("/add", (req, res)=>{
    const {todo_task} = req.body;
    
    const sql = `INSERT INTO tasks(todo_task) VALUES (?)`;

    connection.query(sql,[todo_task], (err, results)=>{
        if(err){
            return res.status(500).json({err});
        }
        res.json(results);
    });

});

app.get("/add/get", (req, res)=>{
    connection.query("SELECT * FROM tasks", (err, results, fields)=>{
        console.log ("data recorded");
        return res.json({data : results});
    });
});


app.delete("/:id", (req, res)=>{
    const todo_id = req.params.id;

    connection.query(`DELETE FROM tasks WHERE id= ${todo_id};`, (err, results, fields)=>{
        console.log("data deleted");
        return res.json({data : results});
    }
    );
})



app.listen (8000, ()=>{
    console.log("Server running on port 8000");
})