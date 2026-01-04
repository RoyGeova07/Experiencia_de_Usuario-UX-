import express,{Request,Response}from 'express'
import {PORT}from './config'

const app=express()

//ENDPOINTS
app.get('/',(_req:Request,res:Response)=>
{

    res.send('<h1>Hola Miguel</h1>')

});

app.post('/login',(req,res)=>
{

    

})

app.post('/registrar',(req,res)=>
{

    

})
app.post('/cerrar',(req,res)=>
{

    

})
app.post('/protected',(req,res)=>
{

    

})

app.listen(PORT,()=>{

    console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`)

});