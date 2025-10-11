const express = require('express');
const eventroutes=require("../backend/routes/eventroutes.js")
const app = express();
const cors=require('cors');
const path=require('path')
app.use(cors());
app.use(express.json());
const _dirname=path.dirname("")
const buildpath=path.join(_dirname,'../frontend/dist')


const PORT = 3000;

app.use(express.static(buildpath))
app.use("/",eventroutes);

app.listen(PORT, (error) =>{
    if(!error)
    {   
        console.log("Server is Successfully Running,and App is listening on port "+ PORT);
    }
    else 
        console.log("Error occurred, server can't start", error);
    }

);