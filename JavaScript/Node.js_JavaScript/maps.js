let myMap=new Map();

console.log(myMap);

//inicializacion
myMap=new Map
([

    ["nombre","Messi"],
    ["edad",36],
    ["pais","Argentina"],
])

console.log(myMap);

myMap.set("club","PSG");
myMap.set("nombre","Lionel Messi");//actualiza el valor

console.log(myMap);

//get
console.log(myMap.get("nombre"));
console.log(myMap.get("posicion"));//undefined

//has
console.log(myMap.has("edad"));//true, contiene la clave edad? true
console.log("Tamaño del mapa: "+myMap.size);
console.log(myMap.keys());
console.log(myMap.values());


//delete
myMap.delete("pais");
console.log(myMap);


//clear
myMap.clear();
console.log(myMap);
