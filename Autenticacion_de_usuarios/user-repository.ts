import DBLocal from 'db-local'
import crypto from'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config'
/**
 * 
 * 
 * 
 */

const {Schema}=new DBLocal({path:'./db'})

const User=Schema('User',{

    _id:{type:String,require:true},
    username:{type:String,require:true},
    password:{type:String,require:true}

})

interface CrearUser
{

    username:string
    password:string

}

export class UserRepository
{


    static async create({username,password}:CrearUser)
    {

        Validation.username(username)
        Validation.password(password)

        const user=User.findOne({username})
        if(user)throw new Error('El usuario ya existe');

        const id=crypto.randomUUID()
        //hashSync bloque el thread principal
        const hashedPassword=await bcrypt.hash(password,SALT_ROUNDS)//este genera el password hasheado, para codificar el password, el numero es el numero de vueltas que sera la codificacion de la password

        User.create({

            _id:id,
            username,
            password: hashedPassword
            
        }).save()

        return id

    }
    static async login({username,password}:CrearUser)
    {

        Validation.username(username)
        Validation.password(password)

        const user=User.findOne({username})
        if(!user)throw new Error('El usuario no existe')

        const esValido=await bcrypt.compare(password,user.password)
        if(!esValido)throw new Error('El password no es valido')

        const{password:_,...publicUser}=user//esta es una forma elegante de  quitarle propiedades a un objeto

        return publicUser

    }

}

class Validation
{

    static username(username:string)
    {

        if(typeof username !=='string')throw new Error('El username tiene que ser un string');
        if(username.length<3)throw new Error('El username tiene que tener mas de 3 caracteres');

    }
    static password(password:string)
    {

        if(typeof password !== 'string') throw new Error('password no es string')
        if(password.length<6)throw new Error('El password tiene que tener mas de 6 caracteres');

    }

}
