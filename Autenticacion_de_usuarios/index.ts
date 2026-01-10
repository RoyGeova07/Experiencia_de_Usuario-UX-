import express,{Request,Response}from 'express'
import {PORT, SECRET_JWT_KEY}from './config'
import { UserRepository } from './user-repository';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'//me sirve para modificar las cookies 

const app=express()

//middleware: es una funciona q se ejecuta antes de que llegue a las peticiones 
app.set('view engine','ejs')

/*
estos son los middlewares: son funciones por las que pasa la peticion, osea modificamos,
ya puede ser la peticion o la respuesta y dejamos q pase la peticion a la siguiente funcion a la que le toca
*/
app.use(express.json())
app.use(cookieParser())

//ENDPOINTS
app.get('/',(_req:Request,res:Response)=>
{

    const token=_req.cookies.acceso_token

    if(!token)
    {

        return res.render('index')//no logueado

    }

    try
    {

        const datos=jwt.verify(token,SECRET_JWT_KEY)
        if(typeof datos==='string')
        {

            return res.render('index')//token raro

        }
        return res.render('index',{username: datos.username})


    }catch(error){

        return res.render('index')//token invalido/expirado

    }

});

app.post('/login',async(req,res)=>
{

    const{username,password}=req.body

    try
    {

        const user=await UserRepository.login({username,password})
        const token=jwt.sign({id: user._id,username: user.username},
            SECRET_JWT_KEY,
        {
            expiresIn:'1h'
        })
        res
            .cookie('acceso_token',token,{
                httpOnly: true,//la cookie solo se puede acceder en el servidor
                secure: process.env.NODE_ENV==='production',//la cookie solo se puede acceder en https
                sameSite: 'strict',//la cookie solo se puede acceder en el mismo dominiio
                maxAge: 1000*60*60//la cookie tiene un tiempo de validez de 1 hora 
            })
            .send({user,token})

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

    res
        .clearCookie('acceso_token')//se limpia la cookie para cerrar sesion
        .json({message: 'Cerrado de sesion exitosoo!!'})

})
//1-25-09
app.get('/protected',(req,res)=>
{

    const token=req.cookies.acceso_token
    if(!token)//si no tengo token
    {

        return res.status(403).send('Acceso no autorizado')//ruta protegida

    }
    try
    {

        const datos=jwt.verify(token,SECRET_JWT_KEY)//de este token va a extraer los datos, y estos datos vamos a tenerlos que 
        if(typeof datos==='string')
        {

            return res.status(401).send('Token invalido')

        }
        //datos ya es jwtPayload (objeto)
        return res.render('protected',{username: datos.username})//datos tendra el id del username y poder acceder a el y poder verlo en la pagina 

    }catch(error){

        res.status(401).send('Acceso no autorizado')

    }
    

})

app.listen(PORT,()=>
{

    console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`)

});