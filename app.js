const express = require('express');

const dotenv = require('dotenv');

const cookieParser = require("cookie-parser");

const app = express();

//Seteamos el motor de plantillas

app.set('view engine', 'ejs');

//Seteamos la carpeta public para archivos estaticos

app.use(express.static('public'));

//Seteamos node para manipular datos

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Seteamos carpeta para variables de entorno

dotenv.config({ path: './env/.env' });

//Para poder trabajar con las cookie

app.use(cookieParser());

//Apuntamos la ruta raiz

/* app.get('/', (req, res) => {
    res.render('index');
}); */

//Llamar al router

app.use("/", require("./routes/router"));

//Para eliminar el cache y que no quede información después del logout

app.use(function(req, res, next){
    if(!req.user){
    res.header("Cache-Control", "public, no-cache, no-store, must-revalidate");
    next();
    }
})

//Levantamos el servidor en el puerto 3000

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});