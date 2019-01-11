const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.get("/",(req,res)=>{res.send("Hello World");});
app.get("/test/1",(req,res)=>{res.send("test1");});

app.listen(port,()=>{
    console.log(`Express Web app available at localhost:${port}`);
})