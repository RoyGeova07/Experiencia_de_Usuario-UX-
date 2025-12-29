//la factory funciona como una plantilla para crear objetos
//nos sirve para crear multiples objetos con las mismas propiedades y metodos
function CrearUsuario(name,email)
{

    return{

        email:email,
        name:name,
        activo:true,
        recuperarClave:function() 
        {

            console.log('Recuperando clave');

        },


    };

}

//crear obtetos de usuario
let user1=CrearUsuario('Roy','Roy@gmail.com');
let user2=CrearUsuario('Omar','Omar@gmail.com');

console.log(user1,user2);