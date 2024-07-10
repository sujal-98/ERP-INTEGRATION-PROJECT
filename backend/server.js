const express=require('express');
const sequelize=require('sequelize');
const app=express();
const cors=require('cors')
const routes = require('./routes/fetcher');

//middlewares
app.use(cors())
app.use(express.json());

//Routes
app.use('/api', routes);


//port setup
app.listen(1000,()=>{
    console.log('Server listening on port 1000')
})
