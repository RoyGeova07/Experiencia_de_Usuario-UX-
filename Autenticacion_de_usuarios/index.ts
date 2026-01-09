import express,{Request,Response}from 'express'
import {PORT}from './config'
import { UserRepository } from './user-repository';

const app=express()

//middleware: es una funciona q se ejecuta antes de que llegue a las peticiones 
app.set('view engine','ejs')
app.use(express.json())

//ENDPOINTS
app.get('/',(_req:Request,res:Response)=>
{

    res.render('index')

});

app.post('/login',async(req,res)=>
{

    const{username,password}=req.body

    try
    {

        const user=await UserRepository.login({username,password})
        res.send({user})

    }catch(error){

        if(error instanceof Error)
        {

            return res.status(401).send(error.message)

        }

        return res.status(401).send('Error desconocido')

    }

})

//el body es el cuerpo de la peticion
app.post('/registrar',async(req,res)=>
{

    const{username,password}=req.body

    try
    {

        const id=await UserRepository.create({username,password})
        res.send({id})

    }catch(error){

        if(error instanceof Error)
        {

            return res.status(400).send(error.message)

        }

        return res.status(400).send('Error desconocido')

    }

})
app.post('/cerrar',(req,res)=>
{

    

})
app.post('/protected',(req,res)=>
{

    res.render('protected',{username:'roy'})


})

app.listen(PORT,()=>
{

    console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`)

});