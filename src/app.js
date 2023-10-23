// Importo las librerias, tambien cambio en package.json el type de import a module para que funcione

import express from "express";

// Importo la clase con la que trabajamos

import productManager from "./productManager.js";

//Ejecuto la libreria para usarla

const app = express();

//Uso el metodo dado en clase para poner todas las funcionalidades de express en el servidor

app.use(express.urlencoded({ extended: true }));

// Creo una pantalla de bienvenida

app.get(`/`, async (req, res) => {
  res.json(`Bienvenido todo funcionando pantalla principal`);
});

//Obtengo la totalidad de productos del array pasado por el parametro desde this.path en la clase que importamos

app.get(`/products`, async (req, res) => {

  //Creo una instancia de productManager para trabajarla

  const pM1 = new productManager("./lista.json");

  //Llamo un metodo y lo guardo en una constante

  const data = await pM1.getProducts();

  //Paso los datos a una variable la cual le aplicaremos el metodo splice para recortar el array y que nos devuelva uno nuevo con los parametros dados

  let dataCargada = data;

  //Comprobamos si el usuario ingreso en la url un query , de ser asi lo pasamos a una variable para obtener su valor

  if (req.query.limit) {

    let limit = req.query.limit;

    //Usamos slice y le ponemos de parametro la variable limit

    let lista2 = dataCargada.slice(0, limit);

    //Dibujamos el resultado en pantalla

    res.json({ lista2 });
  }

  //Dibujamos el resultado en pantalla si el usuario no ingreso ningun query

  res.json({ data });
});

app.get(`/products/:pid`, async (req, res) => {

  //Guardamos en variable el id ingresado por el usuario

  let pid = parseInt(req.params.pid);

  //Creamos instancia de la clase

  const pM1 = new productManager("./lista.json");

  //Usamos el metodo que creamos de la clase y lo almacenamos para filtrar los datos por el numero de ID

  //Guardamos en data todos los productos

  let data = await pM1.getProducts();

  //Los pasamos de data a una variable 

  let dataCargada = data;

  //Filtramos los productos que coincidan de su id a la pid que almacenamos en la variable ingresada por url

  dataCargada = dataCargada.filter((r) => r.id === pid);

  //Si no se ingreso ningun pid (id en la url), nos devuelve un mensaje caso contrario del else , nos trae dataCargada que es el filtrado por ID

  if (!pid) {
    res.send(`No se ingreso ninguna ID`);
  } else {
    res.json(dataCargada);
  }
});

  //Creamos el servidor en el puerto 8080

app.listen(8080);
