const express=require('express')

const{PORT}=require('./config/environment')
const conn=require('./config/connection')
const exphbs=require('express-handlebars')
const session=require('express-session')



const app=express()
const sess ={}










app.listen(PORT, ()=>{
  console.log(`express server listening on ${PORT}`)  
})