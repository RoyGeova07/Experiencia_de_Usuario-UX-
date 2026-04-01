import express from 'express'
import logger from 'morgan'
import { Server,Socket } from 'socket.io'
import {createServer}from'node:http'
import{createClient}from'@libsql/client'
import dotenv from 'dotenv'
dotenv.config()
//morgan es un logger
//un logger es una herramienta q guarda una trasa de algo, en este caso es un logger q funciona a nivel de request
const port=process.env.PORT??3000

const app=express()
const server=createServer(app)//aqui estariamos creando el servidor http
const io=new Server(server,{connectionStateRecovery:{}})//entrada bidireccional, entrada y salida

if(!process.env.DB_TOKEN)
{

    throw new Error('DB_TOKEN no esta definido en las variables de entorno')

}

const db=createClient({

    url:"libsql://shining-warbound-roygeova07.aws-us-east-2.turso.io",
    authToken:process.env.DB_TOKEN!

})

await db.execute(`
    create table if not exists messages( id integer primary key autoincrement, content text)`)

//cuando el io tenga una conexion, se ejecuta este collback
io.on('connection',async(socket:Socket)=>
{

    console.log('El usuario esta conectado')
  
    socket.on('disconnect',()=>
    {
        
        console.log('El usuario se desconecto')
                            
    })

    //cuando se reciba el evento de 'chat message', tu haras algoooo
    socket.on('chat message',async(msg:string)=>
    {

        //algo: 
        console.log('message: '+msg) 
        let resultado_query
        try
        {

            resultado_query=await db.execute({
                sql:'insert into messages(content) values (:msg)',
                args:{msg}
            })

        }catch(e){

            console.error(e);
            return

        }

        //emitir un mensaje a todo el mundo
        //el mensaje que se va a emitir es el mismo que se recibio, 
        // pero ahora se lo mando a todo el mundo, no solo al usuario que lo envio
        io.emit('chat message',msg,resultado_query.lastInsertRowid?.toString())

    })

    if(!socket.recovered)
    {

        try
        {

            const resutado_todos_los_mensajes=await db.execute
            ({

                sql:'select id,content from messages where id>?',
                args:[socket.handshake.auth.serverOffset??0]

            })
            resutado_todos_los_mensajes.rows?.forEach((row)=>
            {

                socket.emit('chat message',row.content,row.id?.toString())

            })

        }catch(e){

            console.error(e);
            return

        }

    }

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