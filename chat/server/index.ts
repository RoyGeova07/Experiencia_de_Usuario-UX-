import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import {createServer}from'node:http'
//morgan es un logger
//un logger es una herramienta q guarda una trasa de algo, en este caso es un logger q funciona a nivel de request
const port=process.env.PORT??3000

const app=express()
const server=createServer(app)//aqui estariamos creando el servidor http
const io=new Server(server,{connectionStateRecovery:{}})//entrada bidireccional, entrada y salida

//cuando el io tenga una conexion, se ejecuta este collback
io.on('connection',(socket)=>
{

    console.log('El usuario esta conectado')
  
    socket.on('disconnect',()=>
    {
        
        console.log('El usuario se desconecto')
                            
    })

    //cuando se reciba el evento de 'chat message', tu haras algoooo
    socket.on('chat message',(msg)=>
    {

        //algo: 
        console.log('message: '+msg) 

    })

    //emitir un mensaje a todo el mundo
    socket.on('chat message',(msg)=>
    {

        io.emit('chat message',msg)

    })

    //el socket es una conexion en concreto y el io que sean todas las conexiones 

    //osea el usuario emita un mensaje con socket y yo con el io esparso ese mensaje para los demas usuarios 

})

app.use(logger('dev'))

//vamos a la pagina principal
app.get('/',(req,res)=>
{
//              esta es la carpeta en la q se inicializa el proceso
    res.sendFile(process.cwd()+'/client/index.html')

})

server.listen(port,()=>
{

    console.log(`Servidor corriendo en puerto ${port}`)

})