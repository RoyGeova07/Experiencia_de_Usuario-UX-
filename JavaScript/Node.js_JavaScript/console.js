console.log("Hola JavaScript");

console.error("Mensaje de error");
console.error("Error al conectarse a la base de datos: ",new Error("Conexion fallida"));

console.warn("Este es un mensaje de advertencia");

console.info("Este es un mensaje informativo");

let datos=
[

    {nombre:"Messi",edad:36,pais:"Argentina"},
    {nombre:"Ronaldo",edad:39,pais:"Portugal"},
    {nombre:"Neymar",edad:31,pais:"Brasil"},

]

console.table(datos);



console.group("Usuario: ");
console.log("Nombre: Messi");
console.log("Edad: 36");
console.groupEnd();

console.time("Proceso de carga");
for(let i=0;i<10000;i++)
{



}
console.timeEnd("Proceso de carga");




//assert,muestra un mensaje de error si lo que evalua es falso
let age=18;
console.assert(age>=18,"La persona debe ser mayor de edad");//no muestra nada
console.assert(age<18,"La persona debe ser mayor de edad");//muestra el mensaje de error

//count
console.count("Click");
console.count("Click");
console.count("Click");
console.count("Click");
console.count("Click");
console.count("Click");
console.countReset("Click");
console.count("Click");




