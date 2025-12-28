//este for in nos sirve para poder iterar las propiedades de un objeto
let user=
{

    id:1,
    nombre:"Juan",
    edad:25,

};

for(let prop in user)
{
    //nos proporciona la propiedad y su valor del objeto
    console.log(prop,user[prop]);

}