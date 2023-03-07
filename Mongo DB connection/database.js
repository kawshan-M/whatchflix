const express = require ("express")

const app = express()
const mongoose = require("mongoose");
//database

const database = module.exports=()=>{
    const connectionParms ={
        useNewUrlPraser: true,
        useUnfiedTopology: true,
    }
    try{
        mongoose.connect ('mongodb+srv://Watchflix:7TYVRXtcUxoESp9h@cluster0.biflqxw.mongodb.net/?retryWrites=true&w=majority')
        console.log("Database connected successfully")
        //database = result.db('')
    } catch (error){
        console.log(error)
        console.log('Database connection failed')
    }

    app.get('/', (req, resp)=>{
        resp.send('Welcome to Mongoose')
        result.db
    })
    
}

database();

app.listen(3001, ()=>{
    console.log("Server is runing in port 3001");
})