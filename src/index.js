const express = require('express');//para crear nuestro servidor 
const morgan = require('morgan');
const app = express();
const tasksRouter = require('./routes/tasksRouter');
const taskPosgrestRouter = require('./routes/taskPostgresRouter');

//settings
app.set('port', process.env.PORT || 3000);//creo el puerto, process.env.PORT se usa con el ánimo de que cuando este nuestra aplicación en un servidor real esta pueda tomar el puerto definido por el servidor de lo contrario tomara por defecto el puerto 3000


//Middlewares, son funciones
app.use(morgan('dev'));//se muestra un mensaje corto por consola con relación a las peticiones que hacemos ya sean get, post, put y delete 
app.use(express.json());//cada vez que se reciba información json desde el navegador nuestro servidor lo puede interpretar 


//Routes
app.use('/api/tasks' , tasksRouter);
app.use('/api/postgres' , taskPosgrestRouter);


//statics files css, html, img etc; __dirname constante que nos da la ruta del proyecto, esta vieje por defecto en nodejs 
app.use(express.static(__dirname + '/public/'));//en este caso lee el index.html de public


//server is listening, app.get('port') obtengo el puerto creado
app.listen(app.get('port'), () =>{
	console.log('Server on port ' + app.get('port'));
});//escucha al puerto en donde se ejecuta nuestra aplicación 