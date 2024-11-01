const express=require("express");
const mysql=require("mysql");
const cors=require("cors");

const app=express();
app.use(cors())
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'calculator'
  });
  const port = 4004;

  app.post('/history',(req,res)=>{
    const data=req.body.data;
    
    connection.query("INSERT INTO history (data) VALUES (?) ",[data],
    (err,result)=>{
      if(err)
        res.send(err);
      else{
        if(result){
          res.send(result);
        }else{
          res.send({message : 'ENTER CORRECT DETAILS!'})
        }
      }
    }
  )
  })


  app.get('/history',(req,res)=>{
    connection.query('SELECT * FROM history ORDER BY id DESC LIMIT 4',(err,rows)=>{
        if(err){
            console.error("Error fetching history:",err);
            res.status(500).send("Internal Server Error");
        }
        else{
            res.json(rows);
        }
    })
  })



  app.delete('/deleteHistory',(req,res)=>{
    connection.query('DELETE FROM history',(err,msg)=>{
        if(err){
            console.error("Error deleting history: ",err);
            res.status(500).send("Internal server error");
        }
        else{
            res.send("Rows are deleted...");
        }
    })
  })

app.get('/', (req, res) => {
  res.send('Hiii i am listening2.....')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })