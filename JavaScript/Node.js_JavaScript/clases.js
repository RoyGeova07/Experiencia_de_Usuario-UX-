class Person
{

    constructor(name,age,alias)
    {

        this.name=name;
        this.age=age;
        this.alias=alias;

    }

}

let person=new Person("Messi",36,"La Pulga");
console.log(person);

//herencia
class Animal
{

    constructor(name)
    {

        this.name=name;

    }
    sound()
    {

        console.log("Sonido generico");

    }

}

class Dog extends Animal
{

    sound()
    {

        console.log("Guau Guau");

    }

    correr()
    {

        console.log("El perro esta corriendo");

    }

}

class fish extends Animal
{

    constructor(name,size)
    {

        super(name);
        this.size=size;

    }

    swim()
    {

        console.log("El pez esta nadando");

    }

}

let dog=new Dog("Firulais");
let fish1=new fish("Nemo","Pequeño");
dog.sound();
dog.correr();