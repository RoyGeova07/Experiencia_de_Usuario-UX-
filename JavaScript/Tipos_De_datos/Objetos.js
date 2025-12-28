let nombre="Mr Satan";
let anime="Dragon Ball";
let edad=25;

let personaje=
{

    nombre:"Mr Satan",
    anime:"Dragon Ball",
    edad:25,

};
console.log(personaje);
console.log(personaje.nombre);
console.log(personaje['anime']);

let llave='edad';
personaje[llave]=15;

delete personaje.anime;

console.log(personaje);