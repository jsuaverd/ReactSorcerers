const express = require('express');


const  app = express()

//db connection

app.listen(3000,() =>{
    console.log("App Listening to port 3000")
})

//routes
app.get('/users',(req,res)=>{
    res.json({msg:"Welcome to the Optics Website"})
})

