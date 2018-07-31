# Aplicación Tablero de Tareas

La aplicación permite crear una tarea que desees, puedes modificarla, eliminar y leerla.

## Tecnologías 

	* Vue.js
	* Webpack
	* Bootstrap 4
	* Mysql
	* Postgres
	* Express
	* Morgan
	* Babel
	* Nodemon

## Como ejecutar el proyecto

1. Una vez clonado el proyecto en su equipo debe ingresar a la carpeta del proyecto y ejecutar el comando `npm install`.

2. Ingresar al archivo `package.json` y editar el script "start", este debe quedar de la siguiente forma: `"start": "nodemon src/index.js",` .

3. Configurar la base de datos Postgres de acuerdo a la estructura del archivo `mevn.sql`, es de anotar que el archivo `mevn.sql` es un archivo que puede ser importado si desea utilizar una base de datos MySql.

4. Ingresar a la carpeta config y ajustar los datos de conexión a su base de datos ya sea Postgres o MySql.

5. Si utiliza una base de datos Postgres, entonces puede ejecutar el comando `npm run start` e ingresar a su navegador web favorito e ingresar la siguiente url: http://localhost:3000.

6. Si utiliza una base de datos MySql, deberá realizar los siguientes pasos: 

	A. Ajustar el componente de Vue denominado `App.vue` para que todas las rutas que tengan el código `fetch('/api/postgres')` quede de la siguiente forma `fetch('/api/tasks')`.

	B. Ejecutar el comando `npm run build` esperar a que se cree el nuevo archivo bundle.js

	C. Finalmente ejecutar el comando `npm run start` e ingresar a su navegador web favorito y digitar la siguiente url: http://localhost:3000.

## Licencia

[ISC license](https://opensource.org/licenses/ISC).

