console.log("Hola TypeScript!!!");






//variables
var cadena_de_texto:string="HOLA CHELE, SOY UNA CADENA DE TEXTO";
console.log(cadena_de_texto);
//cadena_de_texto=5; 

let numero:number=7;
console.log(numero);

const booleano:boolean=true;
console.log(booleano);

let inde:undefined
console.log(inde);


let n:number=10;
if(n===10)
{

    console.log("El valor de n es 10");

}else{

    console.log("El valor de n no es 10");

}

function saludar():string
{

    return "Hola desde una funcion en TypeScript";

}

console.log(saludar());

//lista
let myList:Array<string>=["rojo","verde","azul"];
console.log(myList);


//mapas 
let mapa:Map<string,number>=new Map([["Mesi",10],["Ronaldo",7]]);
mapa.set("uno",1);
mapa.set("dos",2);
mapa.set("tres",3);
console.log(mapa);


class Persona
{

    nombre:string
    edad:number

    constructor(nombre:string,edad:number)
    {

        this.nombre=nombre;
        this.edad=edad;

    }

}
let Persona1=new Persona("Juan",30);
console.log(Persona1);


//enums
enum Lenguajes
{

    Dart="dart",
    TypeScript="typescript",
    JavaScript="javascript",
    Java="java"

}
const miEnum=Lenguajes.TypeScript;
console.log(miEnum);