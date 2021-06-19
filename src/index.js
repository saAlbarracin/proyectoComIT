// Index.js : Archivo principal para arrancar la aplicación.
// require('dotenv').config({path: 'variables.env'}); // Requiero dotenv, pero solo el metodo config. El metodo config, si existe un archivo al inicio de nuestro proyecto ".env" va a leer lo que tiene adentro y lo va a asginar en una variable de entorno.

const app = require('./server');
require('./database');

// console.log(process.env.TESTING); // Objeto que tiene acceso al sistema

app.listen(app.get('port'), () => {
    console.log('Server en puerto', app.get('port'));
});