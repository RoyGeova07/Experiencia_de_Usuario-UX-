const punto=
{

    x:10,
    y:15,
    dibujar()
    {

        console.log('dibujando');

    }

};
//delete dibujar();
//existe la propiedad
if('dibujar'in punto)
{

    punto.dibujar();

}

//console.log(Object.keys(punto));
//estos for nos ayudan a listar las propiedades de un objeto
for(let llave of Object.keys(punto))
{

    console.log(llave,punto[llave]);

}


for(let entry of Object.entries(punto))
{

    console.log(entry);

}


for(let llave in punto)
{

    console.log(llave,punto[llave]);

}
