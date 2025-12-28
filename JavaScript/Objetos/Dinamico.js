const user={id:1};
user.nombre="Roy";
user.guardar=function()
{

    console.log("Guardando",user.nombre);

}
user.guardar();


delete user.nombre;
delete user.guardar;
console.log(user);

//este hara que el objeto no pueda ser modificado
//const user1=Object.freeze({id:1});
const user1=Object.seal({id:1});//solo permite modificar las propiedades existentes
user1.nombre="Roy";
user1.id=2;  
console.log(user1);