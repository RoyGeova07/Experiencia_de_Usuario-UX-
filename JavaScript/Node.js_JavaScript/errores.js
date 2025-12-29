let myObject;


try
{

    console.log(myObject);//undefined
    console.log("finaliza el try sin errores")

}catch{

    console.log("se produjo un error en el bloque try")

} 

try
{

    console.log(myObject.email);//undefined
    console.log("finaliza el try sin errores")

}catch(error){

    console.log("se produjo un error en el bloque try: ",error.message)

} 

try
{

    console.log(myObject.email);//undefined
    console.log("finaliza el try sin errores")

}catch(error){

    console.log("==se produjo un error en el bloque try: ",error.message)

}finally{//

    console.log("==Este codigo se ejecuta siempre==");

}

function suma(a,b)
{

    if(typeof a==="number")
    {

        console.log("Es instancia de number");

    }
    if(Number.isInteger(a))
    {

        console.log("Es un numero entero"); 

    }

    if(a instanceof Number ||b instanceof Number)
    {

        console.log("Los parametros debe ser numeros");

    }
    return a+b;

}
console.log(suma(5,10));

//lanzar error
//throw new Error("Este es un error personalizado");
